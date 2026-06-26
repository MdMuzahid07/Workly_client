import type { Metadata } from "next";
import { Toaster } from "sonner";
import ReduxProvider from "../provider/ReduxProvider";
import ThemeProvider from "../provider/ThemeProvider";
import SocketProvider from "../provider/SocketProvider";
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
          disableTransitionOnChange={false}
          storageKey="workly-theme"
        >
          <ReduxProvider>
            <SocketProvider>{children}</SocketProvider>
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
