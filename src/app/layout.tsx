import type { Metadata } from "next";
import { Toaster } from "sonner";
import ThemeChangeNotification from "../components/shared/ThemeChangeNotification";
import ReduxProvider from "../provider/ReduxProvider";
import SocketProvider from "../provider/SocketProvider";
import ThemeProvider from "../provider/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Workly_job",
    template: "%s | Workly_job",
  },
  description: "Find the perfect job for you",
  twitter: {
    card: "summary_large_image",
  },
};

import MaintenanceModeProvider from "../provider/MaintenanceModeProvider";
import ContentProtection from "@/components/shared/ContentProtection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // fix theme style mismatch
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="workly-theme"
        >
          <ReduxProvider>
            <SocketProvider>
              <MaintenanceModeProvider>{children}</MaintenanceModeProvider>
            </SocketProvider>
          </ReduxProvider>
          <ThemeChangeNotification />
          <ContentProtection />
        </ThemeProvider>
        <Toaster
          position="top-center"
          expand={true}
          richColors
          closeButton
          theme="system"
          duration={3000}
        />
      </body>
    </html>
  );
}
