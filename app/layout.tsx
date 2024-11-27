import "./globals.css";
import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ui/providers/theme.provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <h1>hello </h1>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
