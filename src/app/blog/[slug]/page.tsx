import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/data/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  return post
    ? { title: post.title, description: post.description }
    : { title: "Post not found" };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <main className="page-shell">
      <article className="section-container">
        <Link
          href="/blog"
          className="eyebrow inline-flex items-center gap-2 hover:text-theme-text"
        >
          ← Writing archive
        </Link>
        <header className="mt-12 max-w-5xl border-b border-theme-highlight pb-14">
          <p className="eyebrow">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readTime} read
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            {post.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-theme-subtle">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {post.originalUrl && (
            <a
              href={post.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-wider text-theme-muted hover:text-theme-text"
            >
              Originally published on Medium ↗
            </a>
          )}
        </header>

        <div className="prose mx-auto mt-14 max-w-3xl">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("## "))
              return (
                <h2
                  key={index}
                  className="mb-5 mt-14 text-3xl font-semibold tracking-tight"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            if (paragraph.startsWith("> "))
              return (
                <blockquote
                  key={index}
                  className="my-8 border-l-4 pl-6 text-xl italic"
                >
                  {paragraph.replace("> ", "")}
                </blockquote>
              );
            if (paragraph.startsWith("- "))
              return (
                <ul key={index} className="my-6 list-disc space-y-3 pl-6">
                  {paragraph.split("\n").map((item) => (
                    <li key={item}>
                      {item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                  ))}
                </ul>
              );
            return (
              <p
                key={index}
                className="mb-7"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                }}
              />
            );
          })}
        </div>
      </article>
    </main>
  );
}
