import AuthDialogProvider from "@/components/main/auth/AuthDialogProvider";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "sonner";
import ReduxProvider from "../provider/ReduxProvider";
import ThemeProvider from "../provider/ThemeProvider";
import "./globals.css";

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Workly_job",
  description: "Find the perfect job for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${barlow.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <AuthDialogProvider>{children}</AuthDialogProvider>
          </ReduxProvider>
        </ThemeProvider>
        <Toaster
          position="bottom-center"
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
