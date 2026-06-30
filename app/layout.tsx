import type { Metadata } from "next";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";

// Clash Grotesk is loaded via @import in globals.css (Fontshare CDN)
// No next/font needed — the CSS variable --font-sans is set there.

export const metadata: Metadata = {
  title: "Max Haditsch — Brand Designer & Strategist",
  description:
    "Holistic brand development from strategy to design. Vienna-based, global reach.",
  openGraph: {
    title: "Max Haditsch",
    description: "Brand Designer & Strategist",
    url: "https://maxhaditsch.com",
    siteName: "Max Haditsch",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Reads sessionStorage before first paint — prevents flash of wrong theme.
            Default is always "dark"; sessionStorage only persists for the current tab/session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = sessionStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Cursor />
          <Navigation />
          <CommandPalette />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
