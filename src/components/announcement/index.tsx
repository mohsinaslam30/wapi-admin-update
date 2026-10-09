/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/src/redux/api/settingApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { resetDirty, setSettings } from "@/src/redux/reducers/settingsSlice";
import CommonHeader from "@/src/shared/CommonHeader";
import Can from "@/src/components/shared/Can";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SettingsFilesProvider, usePendingFiles } from "@/src/components/setting/shared/SettingsFilesContext";
import BannerSettings from "@/src/components/setting/tabs/BannerSettings";
import PopupSettings from "./tabs/PopupSettings";
import { RefreshCw, Save, Megaphone, Layout } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";

const AnnouncementInner = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pendingFiles = usePendingFiles();
  const { data, isLoading, refetch } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();
  const settingsData = useAppSelector((state) => state.settings.data);
  const isDirty = useAppSelector((state) => state.settings.isDirty);
  const errors = useAppSelector((state) => state.settings.errors);
  const hasErrors = Object.keys(errors).length > 0;
  
  const [activeMode, setActiveMode] = useState<"banner" | "popup">("popup");

  useEffect(() => {
    if (data) {
      dispatch(setSettings(data));
    }
  }, [data, dispatch]);

  const handleSave = async () => {
    if (hasErrors) {
      toast.error(t("settings_fix_errors") || "Please fix validation errors before saving.");
      return;
    }
    try {
      const hasPendingFiles = pendingFiles.current.size > 0;

      // Identify changed fields by comparing with initial data
      const changedFields: Partial<typeof settingsData> = {};
      Object.entries(settingsData).forEach(([key, value]) => {
        const originalValue = (data as any)?.[key];
        const isFilePending = pendingFiles.current.has(key);

        if (isFilePending || JSON.stringify(value) !== JSON.stringify(originalValue)) {
          (changedFields as any)[key] = value;
        }
      });

      if (Object.keys(changedFields).length === 0 && !hasPendingFiles) {
        dispatch(resetDirty());
        toast.info(t("common_no_changes") || "No changes to save.");
        return;
      }

      let payload: FormData | Partial<typeof settingsData>;

      if (hasPendingFiles) {
        const formData = new FormData();

        Object.entries(changedFields).forEach(([key, value]) => {
          if (value === null || value === undefined) return;
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === "boolean" || typeof value === "number") {
            formData.append(key, String(value));
          } else if (typeof value === "string") {
            if (!value.startsWith("blob:")) {
              formData.append(key, value);
            }
          }
        });

        pendingFiles.current.forEach((file, fieldKey) => {
          formData.append(fieldKey, file, file.name);
        });

        payload = formData;
      } else {
        payload = changedFields;
      }

      await updateSettings(payload).unwrap();
      pendingFiles.current.clear();
      dispatch(resetDirty());
      toast.success(t("settings_save_success") || "Announcement settings saved successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || t("settings_save_error") || "Failed to save settings.");
    }
  };

  const handleRefresh = () => {
    refetch();
    pendingFiles.current.clear();
    toast.info(t("settings_refreshed") || "Settings refreshed.");
  };

  return (
    <div className="flex flex-col min-h-full">
      <CommonHeader 
        title={t("announcement_title") || "Announcements"} 
        description={t("announcement_description") || "Configure dynamic announcement popup modals and header banners for your platform users."} 
        onRefresh={handleRefresh} 
        isLoading={isLoading} 
      />

      <div className="flex flex-col gap-6 flex-1 min-w-0">
        {/* Content Header Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-(--card-color) p-4 sm:p-5 rounded-lg shadow-sm dark:border dark:border-(--card-border-color)">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              {activeMode === "banner" ? (
                <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              ) : (
                <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                {activeMode === "banner" ? "Announcement Banner" : "Announcement Popup Modal"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activeMode === "banner" 
                  ? "Configure banner content, alignment, and display colors" 
                  : "Configure image, title, description, highlights, and action buttons"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mode Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">Mode:</span>
              <Select value={activeMode} onValueChange={(val: any) => setActiveMode(val)}>
                <SelectTrigger className="w-[180px] h-9 dark:bg-page-body dark:border-none">
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent className="dark:bg-page-body">
                  <SelectItem value="banner">Header Banner</SelectItem>
                  <SelectItem value="popup">Popup Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isDirty && (
              <span className="text-xs text-amber-500 dark:text-amber-400 font-medium px-2 py-1.5 bg-amber-50 dark:bg-transparent rounded-lg border border-amber-200 dark:border-amber-600">
                Unsaved changes
              </span>
            )}

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              className="h-9 px-3 sm:px-4 gap-1.5 border-(--input-border-color) dark:border-none dark:bg-page-body text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-(--table-hover)"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline text-sm">{t("common_refresh") || "Refresh"}</span>
            </Button>
            
            <Can permission="update.settings">
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={isUpdating || hasErrors} 
                className="h-9 px-3 sm:px-4 gap-1.5 bg-primary rounded-lg hover:bg-primary/90 text-white shadow-sm shadow-primary/20"
              >
                {isUpdating ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span className="text-sm">{isUpdating ? t("common_saving") || "Saving..." : t("common_save_changes") || "Save Changes"}</span>
              </Button>
            </Can>
          </div>
        </div>

        {/* Tab/Content Area */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64 bg-white dark:bg-(--card-color) rounded-xl border border-gray-100 dark:border-(--card-border-color)">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-gray-200 dark:border-zinc-700 border-t-(--text-green-primary) rounded-full animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("settings_loading") || "Loading settings..."}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {activeMode === "banner" ? (
              <BannerSettings isLoading={isUpdating} />
            ) : (
              <PopupSettings isLoading={isUpdating} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Announcement = () => (
  <SettingsFilesProvider>
    <AnnouncementInner />
  </SettingsFilesProvider>
);

export default Announcement;
