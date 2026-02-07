import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://freelancer-rate-calculator-two.vercel.app/"; // Örn: https://freelancer-rate-calculator-xxxx.vercel.app

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}