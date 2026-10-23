import type { Metadata } from "next";
import AtlasPage from "@/components/atlas/AtlasPage";

export const metadata: Metadata = {
  title: "Manga Atlas",
  description:
    "What Rohit's been reading, with ratings and similar manga from his AniList list.",
};

export const revalidate = 3600;

export default function MangaPage() {
  return <AtlasPage mediaType="MANGA" />;
}
