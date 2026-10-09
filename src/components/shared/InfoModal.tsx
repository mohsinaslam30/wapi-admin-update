"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/src/elements/ui/dialog";
import { Info, ExternalLink } from "lucide-react";
import { SOCIAL_MEDIA_INFO } from "@/src/data/socialMediaInfo";
import { cn } from "@/lib/utils";

interface InfoModalProps {
  infoKey: string;
  className?: string;
  iconSize?: number;
}

const InfoModal: React.FC<InfoModalProps> = ({ infoKey, className, iconSize = 18 }) => {
  const data = SOCIAL_MEDIA_INFO[infoKey];

  if (!data) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer outline-none",
            className
          )}
          aria-label={`View info guide for ${data.title}`}
          title={`View guide for ${data.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Info size={iconSize} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden border-none bg-white dark:bg-(--card-color) rounded-xl shadow-2xl">
        {/* Header */}
        <div className="bg-primary/5 sm:p-6 p-4 border-b border-primary/10">
          <DialogHeader className="space-y-1.5 text-left rtl:text-right">
            <div className="flex items-center gap-2.5 text-primary">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Info size={20} />
              </div>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
                {data.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {data.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Steps Content */}
        <div className="sm:p-6 p-4 space-y-3 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {data.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-(--page-body-bg) border border-slate-100 dark:border-(--card-border-color) hover:border-primary/20 transition-all duration-200"
            >
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-1 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                {step.label}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pl-7">
                {step.value}
              </p>
            </div>
          ))}

          {/* External Developer Portal Link */}
          {data.externalLink && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <ExternalLink size={14} />
                    {data.externalLink.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {data.externalLink.description}
                  </p>
                </div>
                <a
                  href={data.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Visit Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sm:px-6 px-4 py-3.5 bg-slate-50/50 dark:bg-(--page-body-bg)/50 border-t border-slate-100 dark:border-(--card-border-color) flex justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm cursor-pointer border-none"
            >
              Got it
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
