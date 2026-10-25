import type { MetadataRoute } from "next";
import { getAllPosts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rohitc.tech";

  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/uses` },
    { url: `${baseUrl}/anime` },
    { url: `${baseUrl}/manga` },
    ...getAllPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
    })),
  ];
}
