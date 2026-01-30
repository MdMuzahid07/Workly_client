import AuthDialogProvider from "@/components/main/auth/AuthDialogProvider";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "sonner";
import ReduxProvider from "../provider/ReduxProvider";
import ThemeProvider from "../provider/ThemeProvider";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "./globals.css";

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

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
      <body
        className={` ${barlow.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="workly-theme"
        >
          <ReduxProvider>
            <AuthDialogProvider>{children}</AuthDialogProvider>
          </ReduxProvider>
        </ThemeProvider>
        <Toaster
          position="top-center"
          expand={true}
          richColors
          closeButton
          theme="light"
          duration={3000}
        />
      </body>
    </html>
  );
}
