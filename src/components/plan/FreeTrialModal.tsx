"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { useGetAllPlansQuery } from "@/src/redux/api/planApi";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/src/redux/api/settingApi";
import FormDialog from "@/src/shared/FormDialog";
import { FreeTrialModalProps } from "@/src/types/plan";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import SettingToggle from "../setting/shared/SettingToggle";

const FreeTrialModal = ({ isOpen, onClose }: FreeTrialModalProps) => {
  const { t } = useTranslation();
  const { data: settings, isFetching } = useGetSettingsQuery();
  const { data: plansData } = useGetAllPlansQuery({ limit: 100, is_active: true });
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const [formData, setFormData] = useState({
    free_trial_enabled: false,
    free_trial_days: 1,
    free_trial_plan_id: "",
  });

  const [errors, setErrors] = useState<{
    free_trial_days?: string;
    free_trial_plan_id?: string;
  }>({});

  useEffect(() => {
    if (settings && isOpen) {
      setFormData({
        free_trial_enabled: settings.free_trial_enabled ?? false,
        free_trial_days: settings.free_trial_days ?? 1,
        free_trial_plan_id: settings.free_trial_plan_id?._id || settings.free_trial_plan_id || "",
      });
    }
  }, [settings, isOpen]);

  const validationSchema = yup.object().shape({
    free_trial_days: yup
      .number()
      .typeError(t("validation_number"))
      .min(1, t("validation_min_days", { min: 1 }))
      .max(364, t("validation_max_days", { max: 364 }))
      .required(t("validation_required")),
    free_trial_plan_id: yup
      .string()
      .required("Please select a free trial plan"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.free_trial_enabled) {
        await validationSchema.validate({
          free_trial_days: formData.free_trial_days,
          free_trial_plan_id: formData.free_trial_plan_id,
        });
      }
      setErrors({});

      await updateSettings(formData).unwrap();
      toast.success(t("settings_save_success"));
      onClose();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        setErrors({ [err.path]: err.message });
      } else {
        toast.error(err?.data?.message || t("settings_save_error"));
      }
    }
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Free Trial Configuration"
      isLoading={isUpdating || isFetching}
      submitLabel={t("common_save_changes")}
    >
      <div className="space-y-6">
        <SettingToggle
          label="Enable Free Trial"
          description="Let new users begin with a free trial."
          checked={formData.free_trial_enabled}
          onCheckedChange={(v) =>
            setFormData((prev) => ({ ...prev, free_trial_enabled: v }))
          }
        />

        {formData.free_trial_enabled && (
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col dark:border-(--card-border-color)">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Free Trial Plan
              </Label>
              <select
                value={formData.free_trial_plan_id}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    free_trial_plan_id: e.target.value,
                  }))
                }
                className={`flex h-11 w-full bg-(--input-color) dark:bg-page-body border border-(--input-border-color) rounded-md p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white ${
                  errors.free_trial_plan_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
              >
                <option value="">Select Free Trial Plan</option>
                {plansData?.data?.plans
                  ?.filter((plan) => plan.billing_cycle === "free Trial")
                  ?.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name} ({plan.billing_cycle})
                    </option>
                  ))}
              </select>
              {errors.free_trial_plan_id && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.free_trial_plan_id}
                </p>
              )}
            </div>

            <div className="space-y-2 flex flex-col dark:border-(--card-border-color)">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trial Duration (days)
              </Label>
              <Input
                type="number"
                value={formData.free_trial_days || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    free_trial_days:
                      e.target.value === "" ? 0 : Number(e.target.value),
                  }))
                }
                min={1}
                className={`flex-1 h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 ${
                  errors.free_trial_days
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {errors.free_trial_days && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.free_trial_days}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </FormDialog>
  );
};

export default FreeTrialModal;
