import { FileText, ImageIcon, Layout, MapPin, MessageSquare, Shield, Video } from 'lucide-react';

export const LANGUAGES = [
  { label: 'English (US)', value: 'en_US' },
  { label: 'English (UK)', value: 'en_GB' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Gujarati', value: 'gu' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Portuguese (Brazil)', value: 'pt_BR' },
  { label: 'Portuguese (Portugal)', value: 'pt_PT' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Bengali', value: 'bn' },
  { label: 'Marathi', value: 'mr' },
  { label: 'Telugu', value: 'te' },
  { label: 'Tamil', value: 'ta' },
  { label: 'Urdu', value: 'ur' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Chinese', value: 'zh_CN' },
];

export const CATEGORIES = [
  { label: 'Utility', value: 'UTILITY', icon: <MessageSquare size={18} /> },
  { label: 'Marketing', value: 'MARKETING', icon: <Layout size={18} /> },
  { label: 'Authentication', value: 'AUTHENTICATION', icon: <Shield size={18} /> },
];

export const TEMPLATE_TYPES = [
  { label: 'Image', value: 'image', icon: <ImageIcon size={20} /> },
  { label: 'Video', value: 'video', icon: <Video size={20} /> },
  { label: 'Document', value: 'document', icon: <FileText size={20} /> },
  { label: 'Location', value: 'location', icon: <MapPin size={20} /> },
];

export const INTERACTIVE_ACTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Call to Action', value: 'cta' },
  { label: 'Quick Replies', value: 'quick_reply' },
  { label: 'All', value: 'all' },
];


export const CATEGORY_COLORS: Record<string, string> = {
  UTILITY: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  MARKETING:
    "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  AUTHENTICATION:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
};

export const PLATFORM_COLORS: Record<string, string> = {
  whatsapp: "bg-primary/20 text-primary-dark dark:bg-primary/20 dark:text-primary",
  telegram: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400",
  facebook: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  instagram: "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400",
  twitter: "bg-gray-100 text-slate-800 dark:bg-white/10 dark:text-neutral-300",
};

export const SECTORS_LIST = ["healthcare", "ecommerce", "fashion", "financial_service", "general"] as const;