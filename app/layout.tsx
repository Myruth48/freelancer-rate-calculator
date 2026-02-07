import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freelancer Hourly Rate Calculator (USD/EUR)",
  description:
    "Calculate a recommended freelance hourly rate in USD or EUR based on your monthly income goal and working hours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}