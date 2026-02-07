import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://freelancer-rate-calculator-two.vercel.app/"; // Örn: https://freelancer-rate-calculator-xxxx.vercel.app

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}