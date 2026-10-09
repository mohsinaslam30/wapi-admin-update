/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Textarea } from "@/src/elements/ui/textarea";
import { Input } from "@/src/elements/ui/input";





export const WhatsAppFormsForm: React.FC<SharedFormProps> = ({
  data,
  updateField,
  renderHeader,
  renderTextInput,
  renderMediaUploadInput,
  renderStringArrayInput,
  activeSection,
  labelClass,
  inputClass,
}) => {
  const isOpenHero = activeSection === "hero";
  const isOpenWorkflow = activeSection === "workflow";
  const isOpenCapabilities = activeSection === "capabilities";
  const isOpenComponents = activeSection === "components_section";
  const isOpenFaq = activeSection === "faqs";

  // Workflow Steps List
  const workflowSteps = Array.isArray(data.workflow?.steps) ? data.workflow.steps : [];
  const handleWorkflowStepChange = (idx: number, field: string, val: string) => {
    const updated = [...workflowSteps];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["workflow", "steps"], updated);
  };
  const handleAddWorkflowStep = () => {
    updateField(["workflow", "steps"], [...workflowSteps, { title: "", description: "", image: "" }]);
  };
  const handleRemoveWorkflowStep = (idx: number) => {
    const updated = [...workflowSteps];
    updated.splice(idx, 1);
    updateField(["workflow", "steps"], updated);
  };

  // Capabilities List
  const capabilitiesItems = Array.isArray(data.capabilities?.items) ? data.capabilities.items : [];
  const handleCapabilityChange = (idx: number, field: string, val: string) => {
    const updated = [...capabilitiesItems];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["capabilities", "items"], updated);
  };
  const handleAddCapability = () => {
    updateField(["capabilities", "items"], [...capabilitiesItems, { icon: "Layout", title: "", description: "" }]);
  };
  const handleRemoveCapability = (idx: number) => {
    const updated = [...capabilitiesItems];
    updated.splice(idx, 1);
    updateField(["capabilities", "items"], updated);
  };

  // Field Palette Components List
  const componentsList = Array.isArray(data.components_section?.components) ? data.components_section.components : [];
  const handleComponentChange = (idx: number, field: string, val: string) => {
    const updated = [...componentsList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["components_section", "components"], updated);
  };
  const handleAddComponent = () => {
    updateField(["components_section", "components"], [...componentsList, { icon: "AlignLeft", label: "", desc: "" }]);
  };
  const handleRemoveComponent = (idx: number) => {
    const updated = [...componentsList];
    updated.splice(idx, 1);
    updateField(["components_section", "components"], updated);
  };

  // FAQs List
  const faqList = Array.isArray(data.faqs?.items) ? data.faqs.items : [];
  const handleFaqChange = (idx: number, field: string, val: string) => {
    const updated = [...faqList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["faqs", "items"], updated);
  };
  const handleAddFaq = () => {
    updateField(["faqs", "items"], [...faqList, { question: "", answer: "" }]);
  };
  const handleRemoveFaq = (idx: number) => {
    const updated = [...faqList];
    updated.splice(idx, 1);
    updateField(["faqs", "items"], updated);
  };

  return (
    <div className="bg-white dark:bg-(--card-color) rounded-2xl border border-gray-100 dark:border-(--card-border-color) shadow-sm divide-y divide-gray-100 dark:divide-(--card-border-color)">
      {/* 1. Hero Section */}
      <div className="rounded-t-2xl overflow-hidden">
        {renderHeader("hero", "Hero Section Layout")}
        {isOpenHero && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "badge"], "Hero Badge Text", "e.g. WhatsApp Forms")}
              {renderTextInput(["hero", "title"], "Hero Title", "e.g. Interactive forms that live inside WhatsApp chats")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Hero Subtitle</Label>
              <Textarea unstyled
                value={data?.hero?.subtitle || ""}
                onChange={(e) => updateField(["hero", "subtitle"], e.target.value)}
                placeholder="Sub-headline explaining the value proposition..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Start Building Free")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["hero", "image"], "Side Graphic / Flow Mockup Image")}
            </div>
            {renderStringArrayInput(["hero", "bullets"], "Hero Trust Indicators (Bullet Points)")}
          </div>
        )}
      </div>

      {/* 2. Workflow Steps Section */}
      <div>
        {renderHeader("workflow", "Workflow Steps Section")}
        {isOpenWorkflow && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["workflow", "badge"], "Section Badge", "Workflow")}
              {renderTextInput(["workflow", "title"], "Section Title", "From design to delivery in three steps")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Section Description</Label>
              <Textarea unstyled
                value={data?.workflow?.description || ""}
                onChange={(e) => updateField(["workflow", "description"], e.target.value)}
                placeholder="Workflow overview details..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-4 mt-4">
              <Label className={labelClass}>Workflow Steps</Label>
              {workflowSteps.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <Button variant="unstyled"
                    type="button"
                    onClick={() => handleRemoveWorkflowStep(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">STEP #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Step Title</Label>
                      <Input unstyled
                        type="text"
                        value={step?.title || ""}
                        onChange={(e) => handleWorkflowStepChange(idx, "title", e.target.value)}
                        placeholder="e.g. Design with drag & drop"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="block text-xs font-bold text-slate-650 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Step Preview Image</Label>
                      <PageMediaUploadField
                        value={step?.image || ""}
                        onChange={(uploadedUrl) => handleWorkflowStepChange(idx, "image", uploadedUrl)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-[10px] font-bold text-gray-400">Step Description</Label>
                    <Textarea unstyled
                      value={step?.description || ""}
                      onChange={(e) => handleWorkflowStepChange(idx, "description", e.target.value)}
                      placeholder="Brief details about what to do in this step..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="unstyled"
              type="button"
              onClick={handleAddWorkflowStep}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Step
            </Button>
          </div>
        )}
      </div>

      {/* 3. Capabilities Section */}
      <div>
        {renderHeader("capabilities", "Capabilities / Features List")}
        {isOpenCapabilities && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["capabilities", "badge"], "Section Badge", "Capabilities")}
              {renderTextInput(["capabilities", "title"], "Section Title", "Everything you need to build powerful forms")}
            </div>

            <div className="space-y-4 mt-4">
              <Label className={labelClass}>Capabilities Items</Label>
              {capabilitiesItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <Button variant="unstyled"
                    type="button"
                    onClick={() => handleRemoveCapability(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">CAPABILITY #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Title</Label>
                      <Input unstyled
                        type="text"
                        value={item?.title || ""}
                        onChange={(e) => handleCapabilityChange(idx, "title", e.target.value)}
                        placeholder="e.g. Drag & Drop Builder"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Icon Name (lucide-react)</Label>
                      <Input unstyled
                        type="text"
                        value={item?.icon || ""}
                        onChange={(e) => handleCapabilityChange(idx, "icon", e.target.value)}
                        placeholder="e.g. Layout, Grid3X3, Fingerprint, Keyboard..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-[10px] font-bold text-gray-400">Description</Label>
                    <Textarea unstyled
                      value={item?.description || ""}
                      onChange={(e) => handleCapabilityChange(idx, "description", e.target.value)}
                      placeholder="Brief details about this capability..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="unstyled"
              type="button"
              onClick={handleAddCapability}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Capability
            </Button>
          </div>
        )}
      </div>

      {/* 4. Field Palette Section */}
      <div>
        {renderHeader("components_section", "Field Palette (Available Form Components)")}
        {isOpenComponents && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["components_section", "badge"], "Section Badge", "Field Palette")}
              {renderTextInput(["components_section", "title"], "Section Title", "Available form components")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Section Description</Label>
              <Textarea unstyled
                value={data?.components_section?.description || ""}
                onChange={(e) => updateField(["components_section", "description"], e.target.value)}
                placeholder="Overview of form components..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-4 mt-4">
              <Label className={labelClass}>Components List</Label>
              {componentsList.map((comp: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-2 relative"
                >
                  <Button variant="unstyled"
                    type="button"
                    onClick={() => handleRemoveComponent(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">FIELD COMPONENT #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Label</Label>
                      <Input unstyled
                        type="text"
                        value={comp?.label || ""}
                        onChange={(e) => handleComponentChange(idx, "label", e.target.value)}
                        placeholder="e.g. Text & Text Area"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Description</Label>
                      <Input unstyled
                        type="text"
                        value={comp?.desc || ""}
                        onChange={(e) => handleComponentChange(idx, "desc", e.target.value)}
                        placeholder="e.g. Single & multi-line inputs"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Icon Name (lucide-react)</Label>
                      <Input unstyled
                        type="text"
                        value={comp?.icon || ""}
                        onChange={(e) => handleComponentChange(idx, "icon", e.target.value)}
                        placeholder="e.g. AlignLeft, Mail, Phone, List..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="unstyled"
              type="button"
              onClick={handleAddComponent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Component
            </Button>
          </div>
        )}
      </div>

      {/* 5. FAQs Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions")}
        {isOpenFaq && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Questions about WhatsApp Forms?")}
            </div>
            <div className="space-y-4 mt-4">
              <Label className={labelClass}>FAQ Items</Label>
              {faqList.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <Button variant="unstyled"
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold mb-2">FAQ ITEM #{idx + 1}</div>
                  <div className="grid grid-cols-1 gap-3 max-w-[90%]">
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Question</Label>
                      <Input unstyled
                        type="text"
                        value={faq?.question || ""}
                        onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                        placeholder="e.g. Can I trigger forms automatically?"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold text-gray-400">Answer</Label>
                      <Textarea unstyled
                        value={faq?.answer || ""}
                        onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                        placeholder="FAQ answer text..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="unstyled"
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add FAQ Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
