import type { Metadata } from "next";
import AtlasPage from "@/components/atlas/AtlasPage";

export const metadata: Metadata = {
  title: "Anime Atlas",
  description:
    "What Rohit's been watching, with ratings and similar anime from his AniList list.",
};

export const revalidate = 3600;

export default function AnimePage() {
  return <AtlasPage mediaType="ANIME" />;
}
