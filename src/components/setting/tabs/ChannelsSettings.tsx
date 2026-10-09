"use client";

import { CHANNELS } from "@/src/data/setting";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import { Check } from "lucide-react";
import SettingCard from "../shared/SettingCard";
import { AppSettings } from "@/src/types/setting";

const ChannelsSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const omnichannelPlatforms = Array.isArray(settings.omnichannel_platforms)
    ? settings.omnichannel_platforms
    : ["facebook", "instagram", "telegram"];

  const onChange = (
    key: keyof AppSettings,
    value: AppSettings[keyof AppSettings],
  ) => {
    dispatch(updateSettingField({ key, value }));
  };

  const togglePlatform = (platformId: string) => {
    let updated: string[];
    if (omnichannelPlatforms.includes(platformId)) {
      updated = omnichannelPlatforms.filter((p) => p !== platformId);
    } else {
      updated = [...omnichannelPlatforms, platformId];
    }
    onChange("omnichannel_platforms", updated);
  };

  return (
    <div className="space-y-5">
      <SettingCard
        title="Omnichannel Platforms"
        description="Choose which communication channels are enabled globally across the system. Disabled channels will not be accessible to workspaces, regardless of their subscription plan."
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 pt-2">
          {CHANNELS.map((ch) => {
            const isActive = omnichannelPlatforms.includes(ch.id);
            const IconComponent = ch.icon;

            return (
              <div
                key={ch.id}
                onClick={() => togglePlatform(ch.id)}
                className={`relative flex flex-col justify-between sm:p-6 p-4 rounded-lg border cursor-pointer hover:shadow-lg transition-all duration-300 group ${
                  isActive ? ch.activeColorClass : ch.colorClass
                }`}
              >
                {/* Active Indicator Check */}
                <div
                  className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary text-white scale-100"
                      : "border-gray-200 dark:border-slate-800 text-transparent scale-90"
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </div>

                <div className="space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? ch.activeIconColorClass : ch.iconColorClass
                    }`}
                  >
                    <IconComponent size={22} />
                  </div>

                  {/* Header & Details */}
                  <div className="space-y-1.5 pr-6">
                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                      {ch.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {ch.description}
                    </p>
                  </div>
                </div>

                {/* Status indicator pill at bottom */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-(--card-border-color) flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                    Status
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border ${
                      isActive
                        ? "bg-primary/10 text-primary dark:text-primary border-primary/20"
                        : "bg-gray-100 text-gray-400 dark:bg-(--page-body-bg) dark:text-gray-500 border-gray-200 dark:border-slate-800"
                    }`}
                  >
                    {isActive ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SettingCard>
    </div>
  );
};

export default ChannelsSettings;
