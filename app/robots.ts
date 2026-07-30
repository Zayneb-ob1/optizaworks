import type { MetadataRoute } from "next";
import { absoluteSiteUrl, siteUrl } from "@/shared/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: siteUrl.origin,
  };
}
