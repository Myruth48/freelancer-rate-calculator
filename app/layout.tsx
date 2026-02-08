import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Freelancer Hourly Rate Calculator (USD/EUR)",
  description:
    "Calculate a recommended freelance hourly rate based on your monthly income goal, working hours, platform fees, and taxes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console verification (keep) */}
        <meta
          name="google-site-verification"
          content="brP6YiK7pC18owlFgghup9sG5Q61bI1cd9M4vouM0Is"
        />

        {/* Google AdSense (add) */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9314284148684247"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}