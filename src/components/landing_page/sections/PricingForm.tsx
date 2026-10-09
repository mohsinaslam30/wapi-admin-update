/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn, getObjId } from "@/lib/utils";
import { Badge } from "@/src/elements/ui/badge";
import { Button } from "@/src/elements/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/elements/ui/command";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/elements/ui/popover";
import { Textarea } from "@/src/elements/ui/textarea";
import { useGetAllPlansQuery } from "@/src/redux/api/planApi";
import { PricingFormProps } from "@/src/types/landingPage";
import { Check, ChevronsUpDown, CreditCard, Tag, X, Plus, Trash2, Layers } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";

const PricingForm = ({ data, onChange }: PricingFormProps) => {
  const { data: plansData } = useGetAllPlansQuery({});
  const [open, setOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const selectedPlans = data.plans || [];
  const tabsList = data.tabs || [];

  const handleTabChange = (index: number, field: "key" | "value" | "badge", val: string) => {
    const newTabs = [...tabsList];
    newTabs[index] = { ...newTabs[index], [field]: val };
    handleChange("tabs", newTabs);
  };

  const addTab = () => {
    handleChange("tabs", [...tabsList, { key: "monthly", value: "Monthly", badge: "" }]);
  };

  const removeTab = (index: number) => {
    handleChange("tabs", tabsList.filter((_: any, i: number) => i !== index));
  };

  const togglePlan = (planId: string) => {
    const isSelected = selectedPlans.some((p: any) => getObjId(p) === planId);
    if (isSelected) {
      handleChange(
        "plans",
        selectedPlans.filter((p: any) => getObjId(p) !== planId),
      );
    } else {
      handleChange("plans", [...selectedPlans, planId]);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 [@media(min-width:1421px)]:grid-cols-12 gap-10">
        <div className="[@media(min-width:1421px)]:col-span-6 space-y-6">
          <div className="space-y-2.5 flex flex-col">
            <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">
              Section Badge
            </Label>
            <Input
              value={data.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              placeholder="e.g. FLEXIBLE PLANS"
              className="bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-(--card-border-color) h-12 text-[15px]"
            />
          </div>
          <div className="space-y-2.5 flex flex-col">
            <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">
              Section Title
            </Label>
            <Input
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter pricing headline"
              className="bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-(--card-border-color) h-12 text-[15px] font-medium"
            />
          </div>
        </div>

        <div className="[@media(min-width:1421px)]:col-span-6">
          <div className="space-y-2.5 flex flex-col">
            <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">
              Brief Description
            </Label>
            <Textarea
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter pricing narrative"
              rows={5}
              className="bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-(--card-border-color) resize-none text-[15px] leading-relaxed p-4"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100">
                Dynamic Pricing Tabs
              </h3>
              <p className="text-[12px] text-gray-400">
                Configure billing cycle tabs (e.g. Monthly, Yearly) to group plans on the landing page
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addTab}
            className="flex items-center gap-2 h-10 px-4 rounded-xl border-dashed border-primary/30 hover:border-primary text-primary bg-primary/5 font-bold transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Tab
          </Button>
        </div>

        {tabsList.length > 0 ? (
          <div className="space-y-4 max-w-3xl animate-in fade-in duration-300">
            {tabsList.map((tab: any, index: number) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-(--card-border-color) bg-gray-50/30 dark:bg-(--dark-body) animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                      Billing Cycle
                    </Label>
                    <Select
                      value={tab.key}
                      onValueChange={(val) => handleTabChange(index, "key", val)}
                    >
                      <SelectTrigger className="h-10 bg-white dark:bg-page-body border-gray-200 dark:border-(--card-border-color) rounded-lg text-sm font-medium">
                        <SelectValue placeholder="Select Cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="lifetime">Lifetime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                      Tab Label
                    </Label>
                    <Input
                      value={tab.value}
                      onChange={(e) => handleTabChange(index, "value", e.target.value)}
                      placeholder="e.g. Monthly"
                      className="h-10 bg-white dark:bg-page-body border-gray-200 dark:border-(--card-border-color) rounded-lg text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                      Promo Badge (Optional)
                    </Label>
                    <Input
                      value={tab.badge}
                      onChange={(e) => handleTabChange(index, "badge", e.target.value)}
                      placeholder="e.g. Save 20%"
                      className="h-10 bg-white dark:bg-page-body border-gray-200 dark:border-(--card-border-color) rounded-lg text-sm font-medium text-emerald-600 dark:text-emerald-400 placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-end sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeTab(index)}
                    className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all border-none"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full p-8 border dark:bg-(--page-body-bg) border-dashed border-gray-200 dark:border-(--card-border-color) rounded-xl flex items-center justify-center bg-gray-50/20 text-gray-400 max-w-3xl">
            <p className="text-[12px] italic">
              No pricing tabs configured. Users will see all plans grouped under default tabs.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6 pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100">
                Plan Catalog Integration
              </h3>
              <p className="text-[12px] text-gray-400">
                Select the specific plans you want to expose on your landing
                page
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-white dark:bg-(--page-body-bg) border-gray-200 dark:border-(--card-border-color) h-14 rounded-lg px-6 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-(--table-hover) transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 opacity-40 dark:hover:bg-(--table-hover)" />
                  <span>
                    {selectedPlans.length > 0
                      ? `${selectedPlans.length} plans selected for display`
                      : "Choose subscription plans..."}
                  </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0 rounded-lg border-gray-100 dark:border-(--card-border-color) shadow-2xl overflow-hidden"
              align="start"
            >
              <Command className="dark:bg-page-body">
                <CommandInput
                  placeholder="Search catalog..."
                  className="h-12 border-none ring-0"
                />
                <CommandList className="p-1">
                  <CommandEmpty className="py-6 text-center text-xs text-gray-400">
                    No matching plans found in system.
                  </CommandEmpty>
                  <CommandGroup>
                    {plansData?.data?.plans.map((plan) => {
                      const isSelected = selectedPlans.some((p: any) =>
                        typeof p === "string"
                          ? p === plan._id
                          : p._id === plan._id,
                      );
                      return (
                        <CommandItem
                          key={plan._id}
                          onSelect={() => togglePlan(plan._id)}
                          className="rounded-xl flex items-center justify-between p-3 cursor-pointer mb-1 hover:bg-gray-50 dark:hover:bg-(--table-hover)"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-[14px]">
                              {plan.name}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">
                              {typeof plan.currency === "string"
                                ? plan.currency
                                : plan.currency?.code}{" "}
                              {plan.price} billed {plan.billing_cycle}
                            </span>
                          </div>
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                              isSelected
                                ? "bg-primary text-white scale-110"
                                : "bg-gray-100 dark:bg-(--table-hover)",
                            )}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1421px)]:grid-cols-3 gap-3">
            {plansData?.data?.plans
              .filter((p) =>
                selectedPlans.some((sp: any) => getObjId(sp) === p._id),
              )
              .map((plan) => (
                <Badge
                  key={plan._id}
                  variant="secondary"
                  className="pl-4 pr-1.5 py-3 gap-2.5 bg-white dark:hover:bg-(--table-hover) dark:bg-(--dark-body) border border-gray-100 dark:border-none shadow-sm rounded-lg transition-all hover:border-primary/20 flex justify-between items-center h-auto"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300 truncate">
                      {plan.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase mt-0.5">
                      {typeof plan.currency === "string"
                        ? plan.currency
                        : plan.currency?.symbol}
                      {plan.price}
                    </span>
                  </div>
                  <Button
                    onClick={() => togglePlan(plan._id)}
                    className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 dark:hover:bg-red-900/20 hover:text-white flex items-center justify-center transition-all shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </Badge>
              ))}
            {selectedPlans.length === 0 && (
              <div className="w-full p-8 border dark:bg-(--page-body-bg) border-dashed border-gray-100 dark:border-(--card-border-color) rounded-lg flex items-center justify-center bg-gray-50/20 text-gray-400">
                <p className="text-[12px] italic">
                  No active plans targeted for this section
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
