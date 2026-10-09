"use client";

import { useState } from "react";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Button } from "@/src/elements/ui/button";
import { AppSettings } from "@/src/types/setting";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import { useTranslation } from "react-i18next";
import SettingCard from "../shared/SettingCard";
import InfoModal from "@/src/components/shared/InfoModal";
import { Check, Youtube, Linkedin, Twitter, MessageSquare, Eye, EyeOff } from "lucide-react";

interface SecretInputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

const SecretInputField: React.FC<SecretInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className = "space-y-1.5 flex flex-col md:col-span-2",
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 pr-10"
        />
        <Button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="bg-[unset]! h-[unset]! shadow-[unset]! p-0! absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>
    </div>
  );
};

const PLATFORMS = [
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-500 text-white" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-600 text-white" },
  { id: "twitter", name: "Twitter / X", icon: Twitter, color: "bg-black text-white" },
  { id: "threads", name: "Threads", icon: MessageSquare, color: "bg-purple-600 text-white" },
];

const SocialMediaSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const activePlatforms = Array.isArray(settings.social_publishing_platforms)
    ? settings.social_publishing_platforms
    : ["youtube", "linkedin"];

  const onChange = (key: keyof AppSettings, value: AppSettings[keyof AppSettings]) => {
    dispatch(updateSettingField({ key, value }));
  };

  const togglePlatform = (platformId: string) => {
    let updated: string[];
    if (activePlatforms.includes(platformId)) {
      updated = activePlatforms.filter((p) => p !== platformId);
    } else {
      updated = [...activePlatforms, platformId];
    }
    onChange("social_publishing_platforms", updated);
  };

  return (
    <div className="space-y-6">
      {/* Active Platforms Toggler */}
      <SettingCard
        title="Social Publishing Platforms"
        description="Choose which social media publishing platforms are enabled globally. Workspaces will only be able to connect platforms checked here."
        rightElement={<InfoModal infoKey="social_platforms" />}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
          {PLATFORMS.map((platform) => {
            const isActive = activePlatforms.includes(platform.id);
            const Icon = platform.icon;
            return (
              <div
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all duration-300 ${
                  isActive
                    ? "border-primary ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-(--card-color)"
                }`}
              >
                <div
                  className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary text-white scale-100"
                      : "border-gray-200 dark:border-slate-800 text-transparent scale-90"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.color} mb-2`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{platform.name}</span>
              </div>
            );
          })}
        </div>
      </SettingCard>

      {/* YouTube Configuration */}
      <SettingCard
        title="YouTube Publish Credentials"
        description="Configure YouTube OAuth settings for publishing videos and shorts."
        rightElement={<InfoModal infoKey="youtube" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 flex flex-col md:col-span-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">YouTube Client ID</Label>
            <Input
              type="text"
              value={settings.youtube_client_id ?? ""}
              onChange={(e) => onChange("youtube_client_id", e.target.value)}
              placeholder="Your Google/YouTube OAuth Client ID"
              className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
            />
          </div>
          <SecretInputField
            label="YouTube Client Secret"
            value={settings.youtube_client_secret ?? ""}
            onChange={(val) => onChange("youtube_client_secret", val)}
            placeholder="Your Google/YouTube OAuth Client Secret"
          />
        </div>
      </SettingCard>

      {/* LinkedIn Configuration */}
      <SettingCard
        title="LinkedIn Publish Credentials"
        description="Configure LinkedIn Sign-In with OpenID Connect credentials for sharing posts."
        rightElement={<InfoModal infoKey="linkedin" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 flex flex-col md:col-span-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Client ID</Label>
            <Input
              type="text"
              value={settings.linkedin_client_id ?? ""}
              onChange={(e) => onChange("linkedin_client_id", e.target.value)}
              placeholder="Your LinkedIn Client ID"
              className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
            />
          </div>
          <SecretInputField
            label="LinkedIn Client Secret"
            value={settings.linkedin_client_secret ?? ""}
            onChange={(val) => onChange("linkedin_client_secret", val)}
            placeholder="Your LinkedIn Client Secret"
          />
        </div>
      </SettingCard>

      {/* Twitter Configuration */}
      <SettingCard
        title="Twitter (X) Publish Credentials"
        description="Configure Twitter OAuth 2.0 (for authentication) and OAuth 1.0a (for media/image uploads)."
        rightElement={<InfoModal infoKey="twitter" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 flex flex-col md:col-span-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter Client ID (OAuth 2.0)</Label>
            <Input
              type="text"
              value={settings.twitter_client_id ?? ""}
              onChange={(e) => onChange("twitter_client_id", e.target.value)}
              placeholder="Your Twitter Client ID"
              className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
            />
          </div>
          <SecretInputField
            label="Twitter Client Secret (OAuth 2.0)"
            value={settings.twitter_client_secret ?? ""}
            onChange={(val) => onChange("twitter_client_secret", val)}
            placeholder="Your Twitter Client Secret"
          />
          <SecretInputField
            label="API Key / Consumer Key (OAuth 1.0a - for Media Uploads)"
            value={settings.twitter_consumer_key ?? ""}
            onChange={(val) => onChange("twitter_consumer_key", val)}
            placeholder="Your Twitter Consumer / API Key"
          />
          <SecretInputField
            label="API Key Secret / Consumer Secret (OAuth 1.0a)"
            value={settings.twitter_consumer_secret ?? ""}
            onChange={(val) => onChange("twitter_consumer_secret", val)}
            placeholder="Your Twitter Consumer / API Secret"
          />
          <SecretInputField
            label="Access Token (OAuth 1.0a)"
            value={settings.twitter_oauth_token ?? ""}
            onChange={(val) => onChange("twitter_oauth_token", val)}
            placeholder="Your Twitter OAuth 1.0a Access Token"
          />
          <SecretInputField
            label="Access Token Secret (OAuth 1.0a)"
            value={settings.twitter_oauth_token_secret ?? ""}
            onChange={(val) => onChange("twitter_oauth_token_secret", val)}
            placeholder="Your Twitter OAuth 1.0a Access Token Secret"
          />
        </div>
      </SettingCard>

      {/* Threads Configuration */}
      <SettingCard
        title="Threads Publish Credentials"
        description="Configure Threads API App credentials for posting threads."
        rightElement={<InfoModal infoKey="threads" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 flex flex-col md:col-span-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Threads App ID</Label>
            <Input
              type="text"
              value={settings.threads_app_id ?? ""}
              onChange={(e) => onChange("threads_app_id", e.target.value)}
              placeholder="Your Threads App ID"
              className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
            />
          </div>
          <SecretInputField
            label="Threads App Secret"
            value={settings.threads_app_secret ?? ""}
            onChange={(val) => onChange("threads_app_secret", val)}
            placeholder="Your Threads App Secret"
          />
        </div>
      </SettingCard>
    </div>
  );
};

export default SocialMediaSettings;
