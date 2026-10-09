"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/elements/ui/dialog";
import { Button } from "@/src/elements/ui/button";
import { Badge } from "@/src/elements/ui/badge";
import { Calendar, Mail, User, BookOpen, Clock, FileText, CheckCircle2, XCircle, Copy } from "lucide-react";
import { format } from "date-fns";
import { Inquiry } from "@/src/types/store";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface InquiryDetailModalProps {
  inquiry: Inquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, isRead: boolean) => void;
}

const InquiryDetailModal = ({
  inquiry,
  isOpen,
  onClose,
}: InquiryDetailModalProps) => {
  const { t } = useTranslation();

  if (!inquiry) return null;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(inquiry.email);
    toast.success(t("common_success") + ": Email copied to clipboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl! w-[calc(100%-2rem)]! rounded-xl p-0 dark:bg-(--dark-body) border border-gray-150 dark:border-slate-800 shadow-2xl transition-all overflow-hidden">
        
        {/* Modal Header */}
        <DialogHeader className="p-5 flex flex-row items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 pr-6">
          <div className="space-y-1 text-left">
            <DialogTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {t("inquiry_add_title")}
            </DialogTitle>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              {t("inquiry_add_subtitle")}
            </p>
          </div>
        </DialogHeader>

        {/* Sender Info Card */}
        <div className="p-4 mx-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 dark:bg-slate-900/40 rounded-xl border border-gray-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t("inquiry_labels_name")}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">{inquiry.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t("inquiry_labels_email")}</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">{inquiry.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyEmail}
              className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md shrink-0 transition-colors"
              title="Copy Email"
            >
              <Copy className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-3 md:col-span-2 border-t border-gray-100 dark:border-slate-800/60 pt-3 mt-1">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t("common_created_at")}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                {inquiry.created_at
                  ? format(new Date(inquiry.created_at), "MMMM d, yyyy 'at' h:mm a")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Inquiry Content: Subject & Message */}
        <div className="space-y-4 mx-5">
          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {t("inquiry_labels_subject")}
            </label>
            <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800/80 px-4 py-3 rounded-lg">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-relaxed break-all whitespace-normal">
                {inquiry.subject}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {t("inquiry_labels_message")}
            </label>
            <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800/80 px-4 py-4 rounded-lg max-h-48 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-700 dark:text-slate-350 leading-relaxed whitespace-pre-wrap break-all">
                {inquiry.message}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <DialogFooter className="p-2 flex sm:flex-row items-center justify-between gap-3 border-t border-gray-100 dark:border-slate-800">
          <Button
            onClick={onClose}
            className="text-white text-xs py-2 px-4 h-9"
          >
            {t("common_close")}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default InquiryDetailModal;
