import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

/**
 * For the favicon assets you can generate using favicon generator, e.g. https://favicon.io/
 * 
 * - favicon.ico: this is for the old browsers - the size is 16x16, 32x32, 48x48
 * - icon.png: this is for the new browsers - the size is 16x16, 32x32, 48x48
 * - icon1.png: this is for the new browsers (with different sizes) - the size is 16x16, 32x32, 48x48
 * - apple-icon.png: this is for the apple devices - the size is 180x180
 */
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url)
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-pt-[3.5rem]">
      <body
        className={cn("min-h-screen bg-background font-sans antialiased", `${geistSans.variable} ${geistMono.variable}`)}
      >
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="7de589ea-cb8c-49e0-95e0-f08448a8e272"
          strategy="afterInteractive"
        />

        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
