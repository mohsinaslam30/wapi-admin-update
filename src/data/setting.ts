import { BarChart2, Cloud, Facebook, FileCheck, Globe, Instagram, Mail, Megaphone, MessageCircle, MessageSquare, Palette, Send, Share2, ShieldCheck, Wrench } from "lucide-react";
import { AppSettings } from "../types/setting";

export const COMMON_FILE_TYPES = ["png", "jpg", "jpeg", "gif", "webp", "svg", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "mp3", "wav", "ogg", "mp4", "mov", "avi", "webm", "zip", "rar", "7z", "txt", "csv"];

export const logoFields: { key: keyof AppSettings; label: string }[] = [
  { key: "favicon_url", label: "Favicon" },
  { key: "logo_light_url", label: "Logo (Light Mode)" },
  { key: "logo_dark_url", label: "Logo (Dark Mode)" },
  { key: "sidebar_light_logo_url", label: "Sidebar Favicon (Light)" },
  { key: "sidebar_dark_logo_url", label: "Sidebar Favicon (Dark)" },
];

export 
const CHANNELS = [
  {
    id: "telegram",
    name: "Telegram Bot",
    description: "Enable Telegram integration to allow customer support, broadcast messages, and automated chatbots.",
    icon: Send,
    colorClass: "border-sky-200/60 dark:border-sky-900/30 hover:border-sky-500/50 dark:hover:border-sky-500/40 hover:shadow-sky-500/8 bg-gradient-to-br from-sky-50/40 via-white to-sky-50/20 dark:from-sky-900/20 dark:via-(--card-color) dark:to-sky-900/10",
    activeColorClass: "border-sky-500 ring-2 ring-sky-500/20 bg-sky-500/5 dark:bg-sky-500/10",
    iconColorClass: "bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
    activeIconColorClass: "bg-sky-500 text-white dark:bg-sky-500 dark:text-white"
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    description: "Enable Facebook integration to interact directly with clients via pages, comments, and automated workflows.",
    icon: Facebook,
    colorClass: "border-blue-200/60 dark:border-blue-900/30 hover:border-blue-600/50 dark:hover:border-blue-600/40 hover:shadow-blue-600/8 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/20 dark:from-blue-900/20 dark:via-(--card-color) dark:to-blue-900/10",
    activeColorClass: "border-blue-600 ring-2 ring-blue-600/20 bg-blue-600/5 dark:bg-blue-600/10",
    iconColorClass: "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    activeIconColorClass: "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    description: "Enable Instagram integration to receive customer DMs, track media shares, and run promotional customer campaigns.",
    icon: Instagram,
    colorClass: "border-pink-200/60 dark:border-pink-900/30 hover:border-pink-500/50 dark:hover:border-pink-500/40 hover:shadow-pink-500/8 bg-gradient-to-br from-pink-50/40 via-white to-pink-50/20 dark:from-pink-900/20 dark:via-(--card-color) dark:to-pink-900/10",
    activeColorClass: "border-pink-500 ring-2 ring-pink-500/20 bg-pink-500/5 dark:bg-pink-500/10",
    iconColorClass: "bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
    activeIconColorClass: "bg-pink-500 text-white dark:bg-pink-500 dark:text-white"
  },
  // {
  //   id: "twitter",
  //   name: "Twitter / X",
  //   description: "Enable Twitter / X integration to interact with users via DMs, campaigns, and automated replies.",
  //   icon: TwitterIcon,
  //   colorClass: "border-gray-200/60 dark:border-gray-800/30 hover:border-black/50 dark:hover:border-white/40 hover:shadow-black/8 bg-gradient-to-br from-gray-50/40 via-white to-gray-50/20 dark:from-gray-800/20 dark:via-(--card-color) dark:to-gray-800/10",
  //   activeColorClass: "border-black dark:border-white ring-2 ring-black/20 dark:ring-white/20 bg-gray-50/5 dark:bg-gray-900/10",
  //   iconColorClass: "bg-gray-100 text-black dark:bg-gray-950/40 dark:text-white",
  //   activeIconColorClass: "bg-black text-white dark:bg-white dark:text-black"
  // }
];

export const fileLimits: { key: keyof AppSettings; label: string }[] = [
    { key: "document_file_limit", label: "Document Limit (MB)" },
    { key: "audio_file_limit", label: "Audio Limit (MB)" },
    { key: "video_file_limit", label: "Video Limit (MB)" },
    { key: "image_file_limit", label: "Image Limit (MB)" },
    { key: "multiple_file_share_limit", label: "Multi-file Share Limit" },
  ];

  export 
const deliveryMethods = [
  { id: "email", label: "settings_otp_email_label", description: "settings_otp_email_desc", icon: Mail },
  { id: "whatsapp", label: "settings_otp_whatsapp_label", description: "settings_otp_whatsapp_desc", icon: MessageSquare },
];

export const mappingOptions = [
  { label: "OTP Code", value: "otp_code" },
  { label: "Admin Email", value: "email" },
  { label: "Admin Name", value: "name" },
];

export const connectionMethods = [
  { id: "manual", label: "Manual", description: "Direct number entry" },
  { id: "qr_scan", label: "QR Scan", description: "Scan to connect" },
  { id: "embedded_signup", label: "Embedded Signup", description: "Meta onboarding flow" },
];

export const settingTabs = [
  { id: "general", label: "General", icon: Globe, description: "App info & preferences" },
  { id: "branding", label: "Branding", icon: Palette, description: "Logos & icons" },
  { id: "channels", label: "Channel Platforms", icon: Share2, description: "Enable omnichannel platforms" },
  { id: "whatsapp", label: "Meta Configuration", icon: MessageSquare, description: "API credentials" },
  { id: "facebook_lead", label: "Facebook & Instagram", icon: Facebook, description: "Lead webhook configuration" },
  { id: "email", label: "Email", icon: Mail, description: "SMTP configuration" },
  { id: "google", label: "Google", icon: Globe, description: "Google API credentials" },
  { id: "aws", label: "AWS", icon: Cloud, description: "AWS S3 configuration" },
  { id: "limits", label: "Limits", icon: BarChart2, description: "File & group limits" },
  { id: "otp", label: "OTP Delivery", icon: ShieldCheck, description: "OTP delivery methods" },
  { id: "banner", label: "Header Banner", icon: Megaphone, description: "Manage announcement banner" },
  { id: "widget", label: "Landing Widget", icon: MessageCircle, description: "Configure dynamic landing widgets & redirects" },
  { id: "maintenance", label: "Maintenance", icon: Wrench, description: "Maintenance & error pages" },
  { id: "social_media", label: "Social Media Settings", icon: Share2, description: "Configure social media publishing credentials" },
  { id: "signup_agreement", label: "Signup Customization", icon: FileCheck, description: "Signup agree line customization" },
] as const;