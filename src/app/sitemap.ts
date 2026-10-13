import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://spsglobalschool.com";

  const staticRoutes = [
    "",
    "/about-us",
    "/vision-mission",
    "/administrators",
    "/directors-message",
    "/managers-message",
    "/principals-message",
    "/fee-structure",
    "/student-responsibility",
    "/school-timing",
    "/school-assembly",
    "/parent-guideline",
    "/general-rule",
    "/co-curricular-activities",
    "/our-inspiration",
    "/our-campus",
    "/our-classroom",
    "/library",
    "/labs",
    "/public-disclosure",
    "/contact-us",
    "/admission-form-2026-27",
    "/transfer-certificate",
    "/gallery",
    "/blogs",
    "/career"
  ];

  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : route.includes("admission") || route.includes("fee") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.includes("admission") || route.includes("fee") ? 0.9 : 0.8
  }));

  BLOG_POSTS.forEach((post) => {
    entries.push({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    });
  });

  return entries;
}
