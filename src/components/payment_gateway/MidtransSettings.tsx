/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { useGetMidtransSettingsQuery, useUpdateMidtransSettingsMutation } from "@/src/redux/api/paymentGatewayApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import Can from "../shared/Can";
import { usePermissions } from "@/src/hooks/usePermissions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Label } from "@/src/elements/ui/label";

const MidtransSettings = () => {
  const { t } = useTranslation();
  const { hasPermission } = usePermissions();
  const { data, isLoading } = useGetMidtransSettingsQuery();
  const [updateMidtransSettings, { isLoading: isUpdating }] = useUpdateMidtransSettingsMutation();

  const midtransData = data?.data;

  const [settings, setSettings] = useState({
    is_midtrans_active: false,
    midtrans_merchant_id: "",
    midtrans_client_key: "",
    midtrans_server_key: "",
    midtrans_mode: "sandbox" as "sandbox" | "live",
  });

  const [showSk, setShowSk] = useState(false);

  useEffect(() => {
    if (midtransData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings({
        is_midtrans_active: midtransData.is_midtrans_active || false,
        midtrans_merchant_id: midtransData.midtrans_merchant_id || "",
        midtrans_client_key: midtransData.midtrans_client_key || "",
        midtrans_server_key: (midtransData as any).midtrans_server_key_set ? "********" : "",
        midtrans_mode: (midtransData.midtrans_mode as "sandbox" | "live") || "sandbox",
      });
    }
  }, [midtransData]);

  const handleToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, is_midtrans_active: enabled }));
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload: any = {};

      if (settings.is_midtrans_active !== midtransData?.is_midtrans_active) {
        payload.is_midtrans_active = settings.is_midtrans_active;
      }

      if (settings.midtrans_merchant_id !== midtransData?.midtrans_merchant_id && !settings.midtrans_merchant_id.includes("****")) {
        payload.midtrans_merchant_id = settings.midtrans_merchant_id;
      }

      if (settings.midtrans_client_key !== midtransData?.midtrans_client_key && !settings.midtrans_client_key.includes("****")) {
        payload.midtrans_client_key = settings.midtrans_client_key;
      }

      if (settings.midtrans_server_key !== "********" && settings.midtrans_server_key !== "" && !settings.midtrans_server_key.includes("****")) {
        payload.midtrans_server_key = settings.midtrans_server_key;
      }

      if (settings.midtrans_mode !== (midtransData as any)?.midtrans_mode) {
        payload.midtrans_mode = settings.midtrans_mode;
      }

      if (Object.keys(payload).length === 0) {
        toast.info(t("common_no_changes"));
        return;
      }

      await updateMidtransSettings(payload).unwrap();
      toast.success(t("gateway_midtrans_updated", "Midtrans Settings Updated"));
    } catch (error: any) {
      toast.error(error?.data?.message || t("gateway_midtrans_update_error", "Failed to update Midtrans settings"));
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
            {t("gateway_merchant_id", "Merchant ID")} <span className="text-red-400">*</span>
          </Label>
          <Input 
            value={settings.midtrans_merchant_id} 
            onChange={(e) => handleInputChange("midtrans_merchant_id", e.target.value)} 
            placeholder={t("gateway_merchant_id_placeholder", "Enter Merchant ID")} 
            className="h-11 font-mono text-sm bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus-visible:ring-1 focus-visible:ring-primary" 
            disabled={!canUpdate} 
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t("gateway_client_key", "Client Key")} <span className="text-red-400">*</span>
          </Label>
          <Input 
            value={settings.midtrans_client_key} 
            onChange={(e) => handleInputChange("midtrans_client_key", e.target.value)} 
            placeholder={t("gateway_client_key_placeholder", "Enter Client Key")} 
            className="h-11 font-mono text-sm bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus-visible:ring-1 focus-visible:ring-primary" 
            disabled={!canUpdate} 
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t("gateway_server_key", "Server Key")} <span className="text-red-400">*</span>
          </Label>
          <div className="relative">
            <Input 
              type={showSk ? "text" : "password"} 
              value={settings.midtrans_server_key} 
              onChange={(e) => handleInputChange("midtrans_server_key", e.target.value)} 
              placeholder={t("gateway_server_key_placeholder", "Enter Server Key")} 
              className="h-11 pr-10 font-mono text-sm bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus-visible:ring-1 focus-visible:ring-primary" 
              disabled={!canUpdate} 
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
            value={settings.midtrans_mode} 
            onValueChange={(value) => handleInputChange("midtrans_mode", value)}
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
            id="midtrans-enable" 
            type="checkbox" 
            checked={settings.is_midtrans_active} 
            onChange={(e) => handleToggle(e.target.checked)} 
            disabled={!canUpdate} 
            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-(--text-green-primary) cursor-pointer disabled:cursor-not-allowed" 
          />
        </div>
      </div>

      <div className="rounded-lg border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 px-5 py-4 space-y-2">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 46 22" className="w-8 h-4 shrink-0" fill="none">
            <rect width="46" height="22" rx="3" fill="#002D5B" />
            <text x="4" y="15" fontSize="8.5" fontWeight="bold" fill="#00ADEF" fontFamily="sans-serif">
              mid<tspan fill="#FCA311">trans</tspan>
            </text>
          </svg>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Midtrans Configuration</p>
        </div>
        <p className="text-xs text-blue-600/80 dark:text-blue-400/70">
          Get your Midtrans credentials from the Midtrans Account Portal (MAP). You&apos;ll need your Merchant ID, Client Key, and Server Key.
        </p>
        <ul className="space-y-0.5">
          <li className="text-xs text-slate-600 dark:text-slate-400">
            • Use <span className="font-semibold">Sandbox</span> mode for testing transactions without real money.
          </li>
          <li className="text-xs text-slate-600 dark:text-slate-400">
            • Switch to <span className="font-semibold">Live</span> mode when you are ready to accept real payments.
          </li>
          <li className="text-xs text-slate-600 dark:text-slate-400">
            • Find your API keys in the Midtrans dashboard under <span className="font-semibold">Settings &gt; Access Keys</span>.
          </li>
        </ul>
        <a 
          href={settings.midtrans_mode === "live" ? "https://dashboard.midtrans.com/settings/access_keys" : "https://dashboard.sandbox.midtrans.com/settings/access_keys"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline mt-1"
        >
          Get Midtrans API Keys <ExternalLink className="w-3 h-3" />
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
                {t("common_saving")}
              </span>
            ) : (
              t("common_save_changes")
            )}
          </Button>
        </Can>
      </div>
    </div>
  );
};

export default MidtransSettings;
