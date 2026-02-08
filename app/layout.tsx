import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freelancer Hourly Rate Calculator (USD/EUR)",
  description:
    "Calculate a recommended freelance hourly rate in USD or EUR based on your monthly income goal, working hours, platform fees, and taxes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="brP6YiK7pC18owlFgghup9sG5Q61bI1cd9M4vouM0Is"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}