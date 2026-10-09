import { Toaster } from "@/src/elements/ui/sonner";
import type { Metadata } from "next";
import { ToastManager } from "../components/providers/ToastManager";
import { globalSans } from "./fonts";
import "./globals.css";
import MainProvider from "./MainProvider";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "WhatsApp CRM",
  description: "One solution...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${globalSans.variable} antialiased custom-scrollbar`} suppressHydrationWarning>
        <ThemeProvider>
          <MainProvider>{children}</MainProvider>
          <Toaster position="top-center" />
          <ToastManager />
        </ThemeProvider>
      </body>
    </html>
  );
}
