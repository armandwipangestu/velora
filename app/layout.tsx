import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Ubuntu_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (

    <html lang="en" suppressHydrationWarning className="scroll-pt-[3.5rem]">
      <body
        className={cn("min-h-screen bg-background font-sans antialiased", `${geistSans.variable} ${geistMono.variable} ${ubuntuMono.variable}`)}
        suppressHydrationWarning
      >
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletamanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date())
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  })
                `
              }}
            />
          </>
        )}

        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID}
          strategy="afterInteractive"
        />

        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
