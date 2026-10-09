/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { useGetMollieSettingsQuery, useUpdateMollieSettingsMutation } from "@/src/redux/api/paymentGatewayApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import Can from "../shared/Can";
import { usePermissions } from "@/src/hooks/usePermissions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Label } from "@/src/elements/ui/label";

const MollieSettings = () => {
  const { t } = useTranslation();
  const { hasPermission } = usePermissions();
  const { data, isLoading } = useGetMollieSettingsQuery();
  const [updateMollieSettings, { isLoading: isUpdating }] = useUpdateMollieSettingsMutation();

  const mollieData = data?.data;

  const [settings, setSettings] = useState({
    is_mollie_active: false,
    mollie_api_key: "",
    mollie_mode: "sandbox" as "sandbox" | "live",
  });

  const [showSk, setShowSk] = useState(false);

  useEffect(() => {
    if (mollieData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings({
        is_mollie_active: mollieData.is_mollie_active || false,
        mollie_api_key: (mollieData as any).mollie_api_key_set ? "********" : "",
        mollie_mode: (mollieData.mollie_mode as "sandbox" | "live") || "sandbox",
      });
    }
  }, [mollieData]);

  const handleToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, is_mollie_active: enabled }));
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload: any = {};

      if (settings.is_mollie_active !== mollieData?.is_mollie_active) {
        payload.is_mollie_active = settings.is_mollie_active;
      }

      if (settings.mollie_api_key !== "********" && settings.mollie_api_key !== "" && !settings.mollie_api_key.includes("****")) {
        payload.mollie_api_key = settings.mollie_api_key;
      }

      if (settings.mollie_mode !== (mollieData as any)?.mollie_mode) {
        payload.mollie_mode = settings.mollie_mode;
      }

      if (Object.keys(payload).length === 0) {
        toast.info(t("common_no_changes"));
        return;
      }

      await updateMollieSettings(payload).unwrap();
      toast.success(t("gateway_mollie_updated", "Mollie Settings Updated"));
    } catch (error: any) {
      toast.error(error?.data?.message || t("gateway_mollie_update_error", "Failed to update Mollie settings"));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
          <span className="text-sm">{t("settings_loading")}</span>
        </div>
      </div>
    );
  }

  const canUpdate = hasPermission("update.payment_gateways") || hasPermission("update.settings");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t("gateway_api_key", "API Key")} <span className="text-red-400">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showSk ? "text" : "password"}
              value={settings.mollie_api_key}
              onChange={(e) => handleInputChange("mollie_api_key", e.target.value)}
              placeholder={t("gateway_api_key_placeholder", "Enter Mollie API Key")}
              disabled={!canUpdate}
              className="h-11 pr-10 font-mono text-sm bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button
              type="button"
              tabIndex={-1}
              onClick={() => setShowSk(!showSk)}
              className="absolute bg-[unset]! h-[unset]! p-0! right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showSk ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t("gateway_mode", "Environment Mode")} <span className="text-red-400">*</span>
          </Label>
          <Select
            value={settings.mollie_mode}
            onValueChange={(value) => handleInputChange("mollie_mode", value)}
            disabled={!canUpdate}
          >
            <SelectTrigger className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus:ring-1 focus:ring-primary">
              <SelectValue placeholder={t("gateway_mode_select", "Select Mode")} />
            </SelectTrigger>
            <SelectContent className="dark:bg-(--card-color) dark:border-(--card-border-color)">
              <SelectItem value="sandbox">{t("gateway_mode_sandbox", "Sandbox (Testing)")}</SelectItem>
              <SelectItem value="live">{t("gateway_mode_live", "Live (Production)")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-start justify-between py-4 px-5 border border-(--input-border-color) dark:bg-page-body dark:border-none rounded-lg bg-slate-50/50">
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("gateway_enable_gateway")}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t("gateway_enable_gateway_desc")}</p>
        </div>
        <div className="relative flex items-center shrink-0 ml-4">
          <Input
            id="mollie-enable"
            type="checkbox"
            checked={settings.is_mollie_active}
            onChange={(e) => handleToggle(e.target.checked)}
            disabled={!canUpdate}
            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-(--text-green-primary) cursor-pointer disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {mollieData?.webhook_url && (
        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t("webhook_url", "Webhook URL")}
          </Label>
          <div className="p-3 bg-slate-50 dark:bg-page-body rounded-md border border-(--input-border-color) dark:border-none">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              {t("mollie_webhook_desc", "This URL is automatically passed to Mollie during payments.")}
            </p>
            <code className="text-sm font-mono text-slate-800 dark:text-slate-200 break-all select-all">
              {mollieData.webhook_url}
            </code>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 px-5 py-4 space-y-2">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 32 22" className="w-6 h-4 shrink-0" fill="none">
            <rect width="32" height="22" rx="3" fill="#023047" />
            <circle cx="16" cy="11" r="5" fill="#FF9F1C" />
          </svg>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Mollie Configuration</p>
        </div>
        <p className="text-xs text-blue-600/80 dark:text-blue-400/70">
          {t("mollie_help_text", "You can find your API keys in the Developer section of your Mollie Dashboard.")}
        </p>
        <ul className="space-y-0.5">
          <li className="text-xs text-slate-600 dark:text-slate-400">
            • Use <span className="font-semibold">Sandbox</span> mode for testing transactions without real money.
          </li>
          <li className="text-xs text-slate-600 dark:text-slate-400">
            • Switch to <span className="font-semibold">Live</span> mode when you are ready to accept real payments.
          </li>
          <li className="text-xs text-slate-600 dark:text-slate-400">
            • Find your API keys under <span className="font-semibold">Developers &gt; API keys</span> in your Mollie Dashboard.
          </li>
        </ul>
        <a
          href="https://my.mollie.com/dashboard/developers/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline mt-1"
        >
          Get Mollie API Keys <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="flex justify-end">
        <Can anyPermission={["update.payment_gateways", "update.settings"]}>
          <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="h-11 px-4.5 py-5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-60"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("common_saving", "Saving...")}
              </span>
            ) : (
              t("common_save_changes", "Save Changes")
            )}
          </Button>
        </Can>
      </div>
    </div>
  );
};

export default MollieSettings;
