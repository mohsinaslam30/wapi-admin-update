"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Button } from "@/src/elements/ui/button";
import SettingCard from "../shared/SettingCard";
import { AppSettings } from "@/src/types/setting";
import { Palette, RotateCcw, Check, Sparkles } from "lucide-react";

const PRESETS = [
  {
    name: "Emerald (Default)",
    primary: "#059669",
    lightBg: "#f1f5f9",
    colorClass: "bg-[#059669]",
  },
  {
    name: "Indigo Breeze",
    primary: "#4f46e5",
    lightBg: "#f5f3ff",
    colorClass: "bg-[#4f46e5]",
  },
  {
    name: "Ocean Sky",
    primary: "#0284c7",
    lightBg: "#f0f9ff",
    colorClass: "bg-[#0284c7]",
  },
  {
    name: "Rose Quartz",
    primary: "#e11d48",
    lightBg: "#fff1f2",
    colorClass: "bg-[#e11d48]",
  },
  {
    name: "Golden Amber",
    primary: "#d97706",
    lightBg: "#fef3c7",
    colorClass: "bg-[#d97706]",
  },
  {
    name: "Royal Violet",
    primary: "#7c3aed",
    lightBg: "#faf5ff",
    colorClass: "bg-[#7c3aed]",
  },
];

const ThemeColorSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const primaryColor = settings.theme_primary_color ?? "#059669";
  const lightBgColor = settings.theme_light_background_color ?? "#f1f5f9";

  const onChange = (key: keyof AppSettings, value: string) => {
    dispatch(updateSettingField({ key, value }));
  };

  const handleApplyPreset = (primary: string, lightBg: string) => {
    dispatch(updateSettingField({ key: "theme_primary_color", value: primary }));
    dispatch(updateSettingField({ key: "theme_light_background_color", value: lightBg }));
  };

  const handleReset = () => {
    handleApplyPreset("#059669", "#f1f5f9");
  };

  return (
    <div className="space-y-6">
      <SettingCard
        title="Theme Customization"
        description="Personalize your admin dashboard and user frontend interfaces with your brand's colors."
      >
        {/* Preset Selection */}
        <div className="mb-8">
          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 block flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Preset Brand Colors
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {PRESETS.map((preset) => {
              const isSelected =
                primaryColor.toLowerCase() === preset.primary.toLowerCase() &&
                lightBgColor.toLowerCase() === preset.lightBg.toLowerCase();

              return (
                <Button 
                  variant="unstyled"
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset.primary, preset.lightBg)}
                  className={`flex flex-col items-center justify-between p-3.5 rounded-lg border text-center transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10/10 shadow-sm"
                      : "border-gray-200 dark:border-(--card-border-color) dark:hover:bg-(--table-hover) hover:border-gray-300 hover:bg-gray-50/30"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-2 relative">
                    <span className={`w-6 h-6 rounded-full block shadow-sm ${preset.colorClass}`} />
                    <span
                      className="w-6 h-6 rounded-full block shadow-sm"
                      style={{ backgroundColor: preset.lightBg }}
                    />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {preset.name}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Custom Color Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 flex flex-col">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Primary Brand Color
            </Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  value={primaryColor}
                  onChange={(e) => onChange("theme_primary_color", e.target.value)}
                  placeholder="#059669"
                  className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) pl-12 pr-3"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => onChange("theme_primary_color", e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border border-gray-200 p-0 overflow-hidden bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Used for main action buttons, active navigation, links, and accents.
            </p>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Light Background Color
            </Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  value={lightBgColor}
                  onChange={(e) => onChange("theme_light_background_color", e.target.value)}
                  placeholder="#f1f5f9"
                  className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) pl-12 pr-3"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                  <input
                    type="color"
                    value={lightBgColor}
                    onChange={(e) => onChange("theme_light_background_color", e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border border-gray-200 p-0 overflow-hidden bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Used for content section background highlights and light status banners.
            </p>
          </div>
        </div>
      </SettingCard>

      {/* Real-time Interactive Preview */}
      <SettingCard
        title="Live Preview"
        description="See how your selected colors display on various interface elements in real time."
        rightElement={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1.5 border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Button Preview */}
          <div className="p-4 border border-gray-200 dark:border-(--card-border-color) rounded-lg space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Buttons & Actions
            </h4>
            <div className="space-y-2">
              <Button
              variant="unstyled"
                type="button"
                className="w-full h-10 text-sm font-medium rounded-lg text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
                style={{ backgroundColor: primaryColor }}
              >
                <Palette className="w-4 h-4" />
                Primary Button
              </Button>
              <Button
              variant="unstyled"
                type="button"
                className="w-full h-10 text-sm font-medium rounded-lg border transition-all flex items-center justify-center"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor,
                }}
              >
                Outline Button
              </Button>
            </div>
          </div>

          {/* Badges & Accents */}
          <div className="p-4 border border-gray-200 dark:border-(--card-border-color) rounded-lg space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Badges & Statuses
            </h4>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                style={{
                  backgroundColor: lightBgColor,
                  color: primaryColor,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: primaryColor }}
                />
                Active Status
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: primaryColor, color: "#fff" }}
              >
                New Feature
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Interactive tags and badges will use this scheme for highlights.
            </p>
          </div>

          {/* Container Preview */}
          <div className="p-4 border border-gray-200 dark:border-(--card-border-color) rounded-lg space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Highlighted Areas
            </h4>
            <div
              className="p-3 rounded-lg border text-sm transition-all"
              style={{
                backgroundColor: lightBgColor,
                borderColor: `${primaryColor}20`,
                color: primaryColor,
              }}
            >
              <div className="font-semibold mb-1">Attention Required</div>
              <div className="text-xs opacity-90">
                This is a mock call-out component using the dynamic branding accent and background colors.
              </div>
            </div>
          </div>
        </div>
      </SettingCard>
    </div>
  );
};

export default ThemeColorSettings;
