/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Button } from "@/src/elements/ui/button";
import { Textarea } from "@/src/elements/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/types/setting";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "@/src/components/setting/shared/SettingCard";
import SettingToggle from "@/src/components/setting/shared/SettingToggle";
import ImageUrlField from "@/src/components/setting/shared/ImageUrlField";
import { usePendingFiles } from "@/src/components/setting/shared/SettingsFilesContext";
import { Plus, Trash, Check, X, Sparkles, MessageCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import Images from "@/src/shared/Image";

const PopupSettings = ({ isLoading }: { isLoading?: boolean }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);
  const pendingFiles = usePendingFiles();

  const onChange = (key: keyof AppSettings, value: any) => {
    dispatch(updateSettingField({ key, value }));
  };

  const onFileChange = (fieldKey: keyof AppSettings, file: File | null) => {
    if (file) {
      pendingFiles.current.set(fieldKey as string, file);
    } else {
      pendingFiles.current.delete(fieldKey as string);
    }
  };

  // Safe defaults
  const isPopup = settings.is_popup ?? false;
  const popupTitle = settings.popup_title ?? "";
  const popupDescription = settings.popup_description ?? "";
  const popupImageUrl = settings.popup_image_url ?? "";
  const popupBullets = settings.popup_bullets ?? [];
  const popupButtonText = settings.popup_button_text ?? "";
  const popupButtonUrl = settings.popup_button_url ?? "";

  const [newBullet, setNewBullet] = useState("");

  const handleAddBullet = () => {
    if (!newBullet.trim()) return;
    onChange("popup_bullets", [...popupBullets, newBullet.trim()]);
    setNewBullet("");
  };

  const handleRemoveBullet = (index: number) => {
    const updated = popupBullets.filter((_, i) => i !== index);
    onChange("popup_bullets", updated);
  };

  const handleBulletChange = (index: number, val: string) => {
    const updated = [...popupBullets];
    updated[index] = val;
    onChange("popup_bullets", updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Configuration Form */}
      <div className="lg:col-span-7 space-y-6">
        <SettingCard
          title="Popup Availability"
          description="Enable or disable the popup modal that users see immediately upon logging into the platform."
        >
          <SettingToggle
            label="Enable Popup Announcement"
            description="Activate to show a premium popup modal with custom offers or notifications to front-end users."
            checked={isPopup}
            onCheckedChange={(v) => onChange("is_popup", v)}
            disabled={isLoading}
          />
        </SettingCard>

        {isPopup && (
          <SettingCard
            title="Popup Content Builder"
            description="Customize the visuals, headlines, bullet highlights, and primary actions for your announcement popup."
          >
            <div className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Popup Headline Title</Label>
                <Input
                  value={popupTitle}
                  onChange={(e) => onChange("popup_title", e.target.value)}
                  placeholder="e.g. 🎉 Special Offer Just For You!"
                  className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description Message</Label>
                <Textarea
                  value={popupDescription}
                  onChange={(e) => onChange("popup_description", e.target.value)}
                  placeholder="e.g. Upgrade your account today and unlock premium automated chat pipelines."
                  className="min-h-[90px] bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-1.5 flex flex-col">
                <ImageUrlField
                  label="Popup Cover Image"
                  value={popupImageUrl}
                  onChange={(v) => onChange("popup_image_url", v)}
                  onFileChange={(file) => onFileChange("popup_image_url", file)}
                  placeholder="https://example.com/announcement-banner.png"
                />
                <p className="text-xs text-gray-400 dark:text-gray-500">Recommended size: 800x400px (2:1 aspect ratio).</p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  Dynamic Bullet Highlights
                </Label>
                
                <div className="space-y-2.5">
                  {popupBullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <Input
                        value={bullet}
                        onChange={(e) => handleBulletChange(idx, e.target.value)}
                        placeholder="Bullet highlight..."
                        className="h-10 flex-1 bg-(--input-color) dark:bg-page-body border-(--input-border-color) px-3"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveBullet(idx)}
                        className="h-10 w-10 shrink-0 p-0 border-red-200/50 hover:bg-red-50 hover:text-red-500 dark:bg-red-900/10 dark:border-red-900/30 dark:hover:bg-red-900/20 text-gray-400"
                      >
                        <Trash size={15} />
                      </Button>
                    </div>
                  ))}

                  <div className="flex gap-2 items-center pt-1">
                    <Input
                      value={newBullet}
                      onChange={(e) => setNewBullet(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddBullet())}
                      placeholder="Add an key highlight or bullet point..."
                      className="h-10 flex-1 bg-(--input-color) dark:bg-page-body border-(--input-border-color) px-3"
                    />
                    <Button
                      type="button"
                      onClick={handleAddBullet}
                      className="h-10 px-4 bg-primary text-white shrink-0 hover:bg-primary/95 flex items-center gap-1 text-sm font-medium"
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Button Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-(--card-border-color)">
                <div className="space-y-1.5 flex flex-col">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Action Button Text</Label>
                  <Input
                    value={popupButtonText}
                    onChange={(e) => onChange("popup_button_text", e.target.value)}
                    placeholder="e.g. Learn More"
                    className="h-10 bg-(--input-color) dark:bg-page-body border-(--input-border-color) px-3"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Redirect Link URL</Label>
                  <Input
                    value={popupButtonUrl}
                    onChange={(e) => onChange("popup_button_url", e.target.value)}
                    placeholder="e.g. /billing"
                    className="h-10 bg-(--input-color) dark:bg-page-body border-(--input-border-color) px-3"
                  />
                </div>
              </div>
            </div>
          </SettingCard>
        )}
      </div>

      {/* Live Preview Mock Window */}
      <div className="lg:col-span-5 flex flex-col">
        <div className="sticky top-35 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles size={15} className="text-primary" /> Live Premium Preview
            </h3>
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
              Real-time
            </span>
          </div>

          <div className="border border-gray-100 dark:border-(--card-border-color) rounded-xl overflow-hidden shadow-lg bg-gray-50 dark:bg-(--dark-body) flex flex-col">
            {/* Mock browser header */}
            <div className="bg-white dark:bg-(--card-color) border-b border-gray-100 dark:border-(--card-border-color) px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 block" />
                <span className="w-3 h-3 rounded-full bg-green-400 block" />
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500 ml-2">client-viewport.local</span>
              </div>
              <div className="w-24 h-4 bg-gray-100 dark:bg-(--dark-body) rounded-md" />
            </div>

            {/* Mock website viewport */}
            <div className="relative min-h-[460px] p-6 flex items-center justify-center bg-gray-200/50 dark:bg-zinc-950 overflow-hidden">
              {/* Blur background content to simulate a background page */}
              <div className="w-full space-y-4 opacity-15 filter blur-xs select-none">
                <div className="flex justify-between items-center">
                  <div className="w-24 h-6 bg-gray-700 rounded" />
                  <div className="flex gap-2">
                    <div className="w-12 h-6 bg-gray-700 rounded" />
                    <div className="w-12 h-6 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="h-28 bg-gray-700 rounded-lg" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 bg-gray-700 rounded-lg" />
                  <div className="h-20 bg-gray-700 rounded-lg" />
                  <div className="h-20 bg-gray-700 rounded-lg" />
                </div>
              </div>

              {/* Overlay Modal */}
              {isPopup ? (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4 transition-all duration-300">
                  <div className="bg-white dark:bg-(--card-color) w-full max-w-[340px] max-h-full rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-(--card-border-color) flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
                    
                    {/* Close Icon */}
                    <Button variant="unstyled" type="button" className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-300 transition-colors z-10">
                      <X size={14} className="stroke-[2.5]" />
                    </Button>

                    {/* Banner Image */}
                    {popupImageUrl ? (
                      <div className="relative w-full h-[130px] bg-slate-100 dark:bg-(--page-body-bg) overflow-hidden shrink-0">
                        <Images
                          src={popupImageUrl}
                          alt="Announcement Banner"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-[100px] bg-gradient-to-br from-primary/10 to-primary/20 flex flex-col items-center justify-center text-primary/70 shrink-0 border-b border-dashed border-primary/20">
                        <MessageCircle size={28} className="animate-bounce" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col text-left overflow-y-auto no-scrollbar">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 break-words">
                        {popupTitle || "Your Title Here"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed break-words">
                        {popupDescription || "Provide an engaging description here of what is new, special, or critical."}
                      </p>

                      {/* Bullets */}
                      {popupBullets.length > 0 && (
                        <ul className="space-y-1.5 mb-4">
                          {popupBullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-sm text-gray-700 dark:text-gray-300">
                              <span className="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center mt-0.5 shrink-0">
                                <Check size={9} className="stroke-[3]" />
                              </span>
                              <span className="flex-1 break-all whitespace-noraml line-clamp-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Button */}
                      {popupButtonText && (
                        <div className="mt-auto">
                          <Button type="button" className="w-full bg-primary hover:bg-primary/95 text-white h-9.5 text-xs font-semibold rounded-lg shadow-sm shadow-primary/20">
                            {popupButtonText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gray-100/80 dark:bg-zinc-950/80">
                  <AlertCircle size={32} className="text-gray-400 dark:text-gray-500 mb-2" />
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Popup Modal is Disabled</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[200px]">
                    Turn on the switch to activate and preview the popup announcement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSettings;
