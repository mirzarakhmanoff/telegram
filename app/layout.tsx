import "./globals.css";
import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ui/providers/theme.provider";
import QueryProvider from "@/components/ui/providers/query.provider";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});
export const metadata: Metadata = {
  title: "Telegram Web",
  description: "Telegram web application clone created by Ulug'bek",
  icons: "./logo (1).svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${spaceGrotesk.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {" "}
            <main> {children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
