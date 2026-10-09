export interface InfoStepItem {
  label: string;
  value: string;
}

export interface InfoModalData {
  title: string;
  description: string;
  steps: InfoStepItem[];
  externalLink?: {
    label: string;
    url: string;
    description: string;
  };
}

export const SOCIAL_MEDIA_INFO: Record<string, InfoModalData> = {
  social_platforms: {
    title: "Social Publishing Platforms",
    description: "Understand global platform availability for social media publishing.",
    steps: [
      {
        label: "Global Enable/Disable",
        value: "Check or uncheck platform cards to enable or disable social media publishing features across all workspaces globally.",
      },
      {
        label: "Workspace Access",
        value: "Individual workspaces will only be allowed to connect and publish to the platforms enabled in this setting.",
      },
    ],
  },
  youtube: {
    title: "YouTube OAuth Credentials Setup Guide",
    description: "Follow these step-by-step instructions to get your YouTube Client ID and Client Secret from the Google Cloud Console.",
    steps: [
      {
        label: "Step 1: Open Google Cloud Console",
        value: "Go to the Google Cloud Console (console.cloud.google.com) and log in with your Google account.",
      },
      {
        label: "Step 2: Create or Select a Project",
        value: "Click the project selector dropdown at the top navigation bar and select an existing project or click 'New Project'.",
      },
      {
        label: "Step 3: Enable YouTube Data API v3",
        value: "Navigate to 'APIs & Services' > 'Library', search for 'YouTube Data API v3', and click 'Enable'.",
      },
      {
        label: "Step 4: Configure OAuth Consent Screen",
        value: "Go to 'APIs & Services' > 'OAuth consent screen'. Choose 'External' user type, fill in required App details (App Name, User support email, Developer email), and save.",
      },
      {
        label: "Step 5: Create OAuth 2.0 Credentials",
        value: "Go to 'APIs & Services' > 'Credentials', click '+ Create Credentials' > 'OAuth client ID'. Select Application Type as 'Web application', set your Authorized Redirect URIs (e.g. https://your-domain.com/api/social-connections/callback/youtube), and click 'Create'.",
      },
      {
        label: "Step 6: Copy Client ID & Client Secret",
        value: "Copy the generated Client ID and Client Secret from the popup modal and paste them into the YouTube credentials fields here.",
      },
    ],
    externalLink: {
      label: "Google Cloud Console Credentials",
      url: "https://console.cloud.google.com/apis/credentials",
      description: "Manage your Google Cloud projects, OAuth consent settings, and API credentials.",
    },
  },
  linkedin: {
    title: "LinkedIn OAuth Credentials Setup Guide",
    description: "Follow these step-by-step instructions to obtain your LinkedIn Client ID and Client Secret from the LinkedIn Developer Portal.",
    steps: [
      {
        label: "Step 1: Sign in to LinkedIn Developers",
        value: "Visit the LinkedIn Developer Portal (linkedin.com/developers) and log in with your LinkedIn account.",
      },
      {
        label: "Step 2: Create a Developer Application",
        value: "Click 'Create app'. Fill in your App Name, link your LinkedIn Company Page, and upload an app logo.",
      },
      {
        label: "Step 3: Add Required Products",
        value: "Navigate to the 'Products' tab of your app. Request access to 'Share on LinkedIn' and 'Sign-In with OpenID Connect'.",
      },
      {
        label: "Step 4: Configure Authorized Redirect URLs",
        value: "Go to the 'Auth' tab. Scroll down to 'Authorized redirect URLs for your app' and add your callback URL (e.g. https://your-domain.com/api/social-connections/callback/linkedin).",
      },
      {
        label: "Step 5: Copy Client ID & Client Secret",
        value: "Under the 'Auth' tab, locate 'Application credentials'. Copy your Client ID and Client Secret (click the eye icon to reveal the secret) and paste them here.",
      },
    ],
    externalLink: {
      label: "LinkedIn Developer Portal",
      url: "https://www.linkedin.com/developers/apps",
      description: "Manage your LinkedIn applications, OAuth settings, and product permissions.",
    },
  },
  twitter: {
    title: "Twitter (X) Credentials Setup Guide",
    description: "Follow these step-by-step instructions to get your Twitter (X) OAuth 2.0 and OAuth 1.0a credentials from the X Developer Portal.",
    steps: [
      {
        label: "Step 1: Log in to X Developer Portal",
        value: "Visit the X Developer Portal (developer.x.com) and log in with your developer account.",
      },
      {
        label: "Step 2: Create a Project & App",
        value: "In the dashboard, click '+ Add App' under your Project (or select your existing App).",
      },
      {
        label: "Step 3: Configure User Authentication Settings",
        value: "Go to your App's 'Settings' tab and click 'Edit' under 'User authentication settings'. Set permissions to 'Read and Write' (or 'Read and Write and Direct message'). Choose App type as 'Web App, Automated App or Bot'. Enter your Callback URL (e.g. https://your-domain.com/api/social-connections/callback/twitter) and Website URL, then save.",
      },
      {
        label: "Step 4: Get OAuth 2.0 Client ID & Secret",
        value: "Navigate to the 'Keys and Tokens' tab. Under 'OAuth 2.0 Client ID and Client Secret', click 'Regenerate' or copy your Client ID and Client Secret.",
      },
      {
        label: "Step 5: Generate Consumer Keys (OAuth 1.0a - for Media Uploads)",
        value: "Under the same 'Keys and Tokens' tab, find 'Consumer Keys'. Click 'Generate' or 'Regenerate'. Copy both the API Key (Consumer Key) and API Key Secret (Consumer Secret) immediately.",
      },
      {
        label: "Step 6: Generate Access Token & Secret (OAuth 1.0a)",
        value: "Under the 'Keys and Tokens' tab, find 'Authentication Tokens' -> 'Access Token and Secret'. Click 'Generate'. Ensure your app permissions were set to 'Read and Write' before generating so that tokens have write permissions. Copy the Access Token and Access Token Secret immediately.",
      },
      {
        label: "Step 7: Paste Credentials into Settings",
        value: "Paste all 6 credentials into the respective fields here (OAuth 2.0 Client ID/Secret, OAuth 1.0a Consumer Key/Secret, and Access Token/Secret) and click Save Settings.",
      },
    ],
    externalLink: {
      label: "X (Twitter) Developer Portal",
      url: "https://developer.x.com/en/portal/dashboard",
      description: "Manage your X apps, OAuth 2.0 credentials, and OAuth 1.0a API keys & tokens.",
    },
  },
  threads: {
    title: "Threads API Credentials Setup Guide",
    description: "Follow these step-by-step instructions to get your Threads App ID and App Secret from Meta for Developers.",
    steps: [
      {
        label: "Step 1: Log in to Meta for Developers",
        value: "Visit Meta for Developers (developers.facebook.com) and log in with your Facebook / Meta account.",
      },
      {
        label: "Step 2: Create a Meta Application",
        value: "Click 'My Apps' > 'Create App'. Select 'Other' as the use case and choose 'Business' app type.",
      },
      {
        label: "Step 3: Add Threads API Product",
        value: "In your App Dashboard, scroll down to 'Add a product', locate 'Threads', and click 'Set Up'.",
      },
      {
        label: "Step 4: Configure Threads Settings",
        value: "Go to 'Threads' > 'Settings' in the left menu. Enter your Redirect URI (e.g. https://your-domain.com/api/social-connections/callback/threads) and save.",
      },
      {
        label: "Step 5: Copy App ID & App Secret",
        value: "Navigate to 'App Settings' > 'Basic' in the sidebar menu. Copy your App ID, click 'Show' to copy your App Secret, and paste them here.",
      },
    ],
    externalLink: {
      label: "Meta for Developers Portal",
      url: "https://developers.facebook.com/apps/",
      description: "Manage your Meta developer apps, App IDs, and Threads API credentials.",
    },
  },
};
