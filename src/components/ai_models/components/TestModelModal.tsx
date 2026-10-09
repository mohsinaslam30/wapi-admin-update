/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Textarea } from "@/src/elements/ui/textarea";
import { useTestModelMutation } from "@/src/redux/api/aiModelApi";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TestModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: string;
  modelConfig?: any;
}

const TestModelModal = ({ isOpen, onClose, modelId, modelConfig }: TestModelModalProps) => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [testModel, { isLoading }] = useTestModelMutation();

  const handleTest = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API Key");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      const result = await testModel({ modelId, prompt, apiKey, modelConfig }).unwrap();
      if (result.success) {
        setResponse(result.data?.response || (typeof result.data === "string" ? result.data : JSON.stringify(result.data, null, 2)));
        toast.success("Test successful!");
      } else {
        const errorMsg = (result as any).error || result.message || "Test failed";
        setResponse(errorMsg);
        toast.error(errorMsg);
      }
       
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      if (error.data) {
        const detailedError = error.data.error;
        const genericMessage = error.data.message;
        
        if (detailedError && genericMessage) {
          if (genericMessage.includes("Failed to test")) {
            errorMessage = detailedError;
          } else if (detailedError.includes("Failed to test")) {
            errorMessage = genericMessage;
          } else {
            errorMessage = `${genericMessage}: ${detailedError}`;
          }
        } else {
          errorMessage = detailedError || genericMessage || errorMessage;
        }
      } else {
        errorMessage = error.message || errorMessage;
      }
      setResponse(errorMessage);
      toast.error(errorMessage);
    }
  };

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard!");
  };

  const handleClose = () => {
    onClose();
    setApiKey("");
    setPrompt("");
    setResponse("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl! max-w-[calc(100%-2rem)]! bg-white dark:bg-(--dark-body) border-none rounded-lg p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-(--light-primary) dark:bg-primary-dark/30 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            Test AI Model
          </DialogTitle>
        </DialogHeader>

        <div className="sm:p-6 p-4 space-y-6 pt-0! max-h-[250px] overflow-auto custom-scrollbar">
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="test-apiKey" className="text-sm font-semibold text-slate-700 dark:text-gray-400">
              API Key
            </Label>
            <Input id="test-apiKey" type="password" placeholder="Enter your API key..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="h-12 px-4 rounded-lg bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-(--card-border-color) focus:bg-(--input-color) dark:focus:bg-page-body transition-all" />
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="test-prompt" className="text-sm font-semibold text-slate-700 dark:text-gray-400">
              Test Prompt
            </Label>
            <Textarea id="test-prompt" placeholder="Enter a prompt to test the model..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-30 p-4 rounded-lg bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-(--card-border-color) focus:bg-(--input-color) dark:focus:bg-page-body transition-all resize-none custom-scrollbar" />
          </div>

          <div className="space-y-2 flex flex-col relative">
            <Label htmlFor="test-response" className="text-sm font-semibold text-slate-700 dark:text-gray-400">
              Model Response
            </Label>
            <div className="relative group">
              <Textarea id="test-response" readOnly placeholder="Model response will appear here..." value={response} className="min-h-37.5 p-4 pr-12 rounded-lg bg-(--input-color) dark:bg-page-body border-(--input-border-color) text-slate-600 dark:text-gray-300 font-mono text-sm resize-none cursor-default custom-scrollbar" />
              {response && (
                <Button type="button" size="icon" variant="ghost" onClick={copyToClipboard} className="absolute right-3 top-3 h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-all opacity-0 group-hover:opacity-100">
                  <Copy className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:p-6 p-4 pt-0 flex gap-3">
          <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 h-12 rounded-lg dark:bg-(--dark-sidebar) dark:text-amber-50 text-slate-600 bg-gray-100 font-bold hover:bg-slate-100 dark:hover:bg-(--dark-sidebar) transition-all">
            Cancel
          </Button>
          <Button type="button" disabled={isLoading || !apiKey || !prompt} onClick={handleTest} className="flex-1 h-11 bg-primary hover:bg-primary text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all dark:shadow-none active:scale-95 disabled:opacity-50 disabled:active:scale-100">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Test Model
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestModelModal;
