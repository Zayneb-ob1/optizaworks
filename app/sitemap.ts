import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/backend/content/queries";
import { absoluteSiteUrl } from "@/shared/seo/site";

const publicRoutes = [
  "",
  "/about",
  "/careers",
  "/contact",
  "/news",
  "/portfolio",
  "/products",
  "/references",
  "/services",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedPages: MetadataRoute.Sitemap = publicRoutes.map((path) => ({
    url: absoluteSiteUrl(path || "/"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  const caseStudies: MetadataRoute.Sitemap = getPublishedProjects().map(
    (project) => ({
      url: absoluteSiteUrl(`/portfolio/${project.slug}`),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...fixedPages, ...caseStudies];
}
