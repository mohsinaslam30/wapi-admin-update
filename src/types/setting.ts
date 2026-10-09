import { MutableRefObject } from 'react';
import { settingTabs } from '../data/setting';

export interface ImageUrlFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Called when user selects a file from device. Pass null to clear. */
  onFileChange?: (file: File | null) => void;
  placeholder?: string;
  accept?: string;
}

export interface SettingCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}

export interface SettingToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
} 

export interface TestMailModalProps {
  isOpen: boolean;
  onClose: () => void;
  smtpSettings: Partial<AppSettings>;
}

export type Mode = "idle" | "url";

export type PendingFilesMap = MutableRefObject<Map<string, File>>;

export type TabId = (typeof settingTabs)[number]["id"];


export interface AppSettings {
  _id?: string;
  // General
  app_name: string;
  app_loader: string;
  app_description: string;
  app_email: string;
  support_email: string;
  default_theme_mode: string;
  display_customizer: boolean;
  allow_user_signup: boolean;
  is_demo_mode: boolean;
  cookie_enabled?: boolean;
  demo_user_email?: string;
  demo_user_password?: string;
  demo_agent_email?: string;
  demo_agent_password?: string;
  session_expiration_days: number;
  // Branding
  favicon_url: string;
  logo_light_url: string;
  logo_dark_url: string;
  sidebar_logo_url: string;
  mobile_logo_url: string;
  landing_logo_url: string;
  favicon_notification_logo_url: string;
  onboarding_logo_url: string;
  // WhatsApp
  app_id: string | null;
  app_secret: string | null;
  configuration_id: string | null;

  ig_app_id?: string;
  ig_app_secret?: string;
  // Twitter
  twitter_client_id?: string;
  twitter_client_secret?: string;
  twitter_redirect_uri?: string;
  show_twitter_config?: boolean;
  twitter_consumer_key?: string;
  twitter_consumer_secret?: string;
  twitter_oauth_token?: string;
  twitter_oauth_token_secret?: string;
  whatsapp_webhook_url: string | null;
  webhook_verification_token: string | null;
  // Email
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_pass: string;
  mail_from_name: string;
  mail_from_email: string;
  // Features
  free_trial_enabled: boolean;
  free_trial_days: number;
  free_trial_plan_id?: string | any;
  audio_calls_enabled: boolean;
  video_calls_enabled: boolean;
  allow_voice_message: boolean;
  allow_archive_chat: boolean;
  allow_media_send: boolean;
  allow_user_block: boolean;
  call_timeout_seconds: number;
  // Limits
  document_file_limit: number;
  audio_file_limit: number;
  video_file_limit: number;
  image_file_limit: number;
  multiple_file_share_limit: number;
  maximum_message_length: number;
  max_groups_per_user: number;
  max_group_members: number;
  allowed_file_upload_types: string[];
  storage_limit: number;
  restore_storage_on_delete: boolean;
  // Maintenance
  maintenance_mode: boolean;
  maintenance_title: string;
  maintenance_message: string;
  maintenance_image_url: string;
  maintenance_allowed_ips: string[];
  client_ip?: string;
  page_404_title: string;
  page_404_content: string;
  page_404_image_url: string;
  no_internet_title: string;
  no_internet_content: string;
  no_internet_image_url: string;
  sidebar_light_logo_url: string;
  sidebar_dark_logo_url: string;
  // Config Visibility
  show_email_config: boolean;
  show_whatsapp_config: boolean;
  show_instagram_config?: boolean;
  default_currency?: any;
  // Google
  google_client_id: string | null;
  google_client_secret: string | null;
  google_redirect_uri: string | null;
  // AWS
  aws_access_key_id: string | null;
  aws_secret_access_key: string | null;
  aws_secret_access_key_set?: boolean;
  aws_region: string | null;
  aws_s3_bucket: string | null;
  is_aws_s3_enabled: boolean;
  connection_method: string[];
  otp_delivery_method: string;
  whatsapp_otp_template_id: string | null;
  whatsapp_otp_variable_mapping: Record<string, string>;
  is_waba_connected?: boolean;
  admin_waba_id?: string;
  admin_waba_mongodb_id?: string;
  // Facebook Lead Webhook
  facebook_lead_webhook_url: string | null;
  facebook_lead_webhook_verify_token: string | null;
  instagram_webhook_url: string | null;
  instagram_webhook_verify_token: string | null;
  // Header Banner
  is_banner: boolean;
  banner_text: string;
  banner_possion: "left" | "center" | "right";
  banner_bg_color: string;
  banner_text_color: string;
  is_popup?: boolean;
  popup_image_url?: string;
  popup_title?: string;
  popup_description?: string;
  popup_bullets?: string[];
  popup_button_text?: string;
  popup_button_url?: string;
  omnichannel_platforms?: string[];
  signup_agree_enable: boolean;
  signup_agree_prefix: string;
  signup_agree_link_text: string;
  signup_agree_page: any;
  pages?: { _id: string; title: string; slug: string; system_reserved?: boolean }[];
  widget_enabled: boolean;
  widget_whatsapp_url: string;
  widget_telegram_url: string;
  widget_instagram_url: string;
  widget_facebook_url: string;
  widget_sms_url: string;
  theme_primary_color?: string;
  theme_light_background_color?: string;
  youtube_client_id?: string | null;
  youtube_client_secret?: string | null;
  linkedin_client_id?: string | null;
  linkedin_client_secret?: string | null;
  threads_app_id?: string | null;
  threads_app_secret?: string | null;
  social_publishing_platforms?: string[];
}

export interface TestMailPayload {
  to: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_pass: string;
  mail_from_name: string;
  mail_from_email: string;
}

export interface TestMailResponse {
  success: boolean;
  message: string;
  data?: { to: string };
}

export interface SettingsState {
  data: Partial<AppSettings>;
  errors: Record<string, string>;
  isDirty: boolean;
  pageTitle: string;
  isSettingsLoaded: boolean;
}
