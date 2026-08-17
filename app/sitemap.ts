import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/shared/seo/site";

const publicRoutes = [
  "",
  "/about",
  "/careers",
  "/contact",
  "/news",
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
  return fixedPages;
}
