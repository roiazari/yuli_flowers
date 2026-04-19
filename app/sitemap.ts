import type { MetadataRoute } from "next";
import content from "@/content.json";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://yuli-flowers.vercel.app";

/**
 * Single-page site with anchor-based sections. We still list the section
 * anchors so search engines understand the information architecture and
 * can surface deep-links (e.g. "About", "Services") in rich results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const anchors = (content.navbar?.links ?? [])
    .map((l) => l.href)
    .filter((h): h is string => typeof h === "string" && h.startsWith("#"));

  const sectionEntries = anchors.map((hash) => ({
    url: `${SITE_URL}/${hash}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sectionEntries,
  ];
}
