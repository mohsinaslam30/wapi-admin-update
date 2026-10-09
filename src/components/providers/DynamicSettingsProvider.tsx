/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSettingsQuery } from "@/src/redux/api/settingApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setSettings } from "@/src/redux/reducers/settingsSlice";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";

import { DynamicSettingsProviderProps } from "@/src/types/layout";
import { getUrlWithBasePath } from "@/src/utils";

const resolveUrl = (url?: string): string => {
  if (!url) return "";
  if (
    url.startsWith("http") ||
    url.startsWith("https") ||
    url.startsWith("data:")
  )
    return url;

  const baseUrl = (STORAGE_URL || "").endsWith("/")
    ? STORAGE_URL.slice(0, -1)
    : STORAGE_URL;

  if (url.startsWith("/uploads/")) {
    return `${baseUrl}${url}`;
  }
  if (url.startsWith("uploads/")) {
    return `${baseUrl}/${url}`;
  }
  if (url.startsWith("/")) {
    return getUrlWithBasePath(url);
  }
  return getUrlWithBasePath(`/${url}`);
};

const DEFAULT_FAVICON = getUrlWithBasePath("/assets/logos/sidebarLogo.png");

function applyFavicon(href: string) {
  if (typeof window === "undefined") return;
  const links = document.querySelectorAll("link[rel*='icon']");
  if (links.length > 0) {
    links.forEach((link: any) => {
      if (link.href !== href) link.href = href;
    });
  } else {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = href;
    document.head.appendChild(link);
  }
}

const DynamicSettingsProvider = ({
  children,
}: DynamicSettingsProviderProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data: settingsData, isSuccess, isLoading, isError } = useGetSettingsQuery();
  const { data: settings, pageTitle, isSettingsLoaded } = useAppSelector(
    (state) => state.settings,
  );
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (settingsData) {
      dispatch(setSettings(settingsData));
    }
  }, [settingsData, dispatch]);

  useEffect(() => {
    if (mounted && settingsData?.default_theme_mode) {
      const saved = localStorage.getItem("theme");
      if (!saved || saved === "system") {
        setTheme(settingsData.default_theme_mode);
      }
    }
  }, [mounted, settingsData, setTheme]);

  useEffect(() => {
    if (!mounted) return;

    const { app_name, app_description, favicon_url, theme_primary_color, theme_light_background_color } = settings || {};
    
    let faviconHref = "";
    if (isLoading) {
      if (isSettingsLoaded && favicon_url) {
        const resolved = resolveUrl(favicon_url);
        faviconHref = resolved ? resolved : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      } else {
        faviconHref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      }
    } else if (isSettingsLoaded) {
      const resolved = resolveUrl(favicon_url);
      faviconHref = resolved ? resolved : DEFAULT_FAVICON;
    } else if (isError) {
      faviconHref = DEFAULT_FAVICON;
    } else {
      faviconHref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }

    const applyThemeColors = (primary?: string, lightBg?: string) => {
      const root = document.documentElement;
      if (primary) {
        root.style.setProperty("--primary", primary, "important");
      }
      if (lightBg) {
        root.style.setProperty("--light-background", lightBg, "important");
      }
    };

    const applyAll = () => {
      if (isSettingsLoaded) {
        const fullTitle = `${pageTitle ? `${pageTitle} | ` : ""}${app_name || "WhatsApp CRM"} | All-in-One WhatsApp Marketing & Automation Platform with CRM, Campaigns, Live Chat, Lead Generation, Business API SaaS Platform`;
        if (document.title !== fullTitle) document.title = fullTitle;
        if (app_description) {
          let meta = document.querySelector(
            'meta[name="description"]',
          ) as HTMLMetaElement | null;
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
          }
          if (meta.getAttribute("content") !== app_description) {
            meta.setAttribute("content", app_description);
          }
        }
        applyThemeColors(theme_primary_color, theme_light_background_color);
      }
      if (faviconHref) applyFavicon(faviconHref);
    };

    applyAll();
    const observer = new MutationObserver(applyAll);
    observer.observe(document.head, { childList: true, subtree: false });
    const interval = setInterval(applyAll, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [settings, isSettingsLoaded, isLoading, isError, pathname, mounted, pageTitle]);

  return <>{children}</>;
};

export default DynamicSettingsProvider;
