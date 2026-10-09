import type { NextConfig } from "next";

const BASE_PATH = "";

const nextConfig: NextConfig = {
  basePath: BASE_PATH || undefined,
  reactStrictMode: false,
  serverExternalPackages: ["unzipper"],
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_API_URL: "https://crm.whatscloud.shop/api",
    NEXT_PUBLIC_API_BASE_URL: BASE_PATH + "/api",
    NEXT_PUBLIC_STORAGE_URL: "https://crm.whatscloud.shop",
    NEXT_PUBLIC_FRONT_URL: "https://whatscloud.shop",
  },
  redirects: async () => {
    const list: any[] = [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
    if (BASE_PATH) {
      list.push({
        source: "/",
        destination: BASE_PATH,
        basePath: false,
        permanent: false,
      });
    }
    return list;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "crm.whatscloud.shop",
      },
    ],
  },
};

export default nextConfig;
