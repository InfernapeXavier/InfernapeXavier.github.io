import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes from Rohit Choudhari on technology and engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="page-shell">
      <div className="section-container">
        <p className="eyebrow">Archive / Writing</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <h1 className="page-heading">
            Old notes,
            <br />
            <span className="text-accent">kept intact.</span>
          </h1>
          <p className="section-deck">
            Early writing from 2017—a snapshot of how I was thinking when I
            first started building for the web.
          </p>
        </div>

        <div className="mt-20 border-t border-theme-highlight">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-5 border-b border-theme-highlight py-9 md:grid-cols-[5rem_1fr_auto] md:items-start"
            >
              <span className="font-mono text-sm text-theme-muted">
                0{index + 1}
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight group-hover:text-accent md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-theme-subtle">
                  {post.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-theme-muted">
                <span>{new Date(post.date).getFullYear()}</span>
                <span>{post.readTime}</span>
                <span className="text-xl text-theme-text transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
