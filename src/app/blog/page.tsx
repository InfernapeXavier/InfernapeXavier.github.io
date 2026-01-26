import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog | Rohit Choudhari",
  description: "Thoughts on technology, engineering, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-16 font-sans">
      <section className="min-h-screen bg-rose-pine-base relative overflow-hidden">
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="section-heading mb-4">Blog</h1>
            <p className="text-xl text-theme-subtle mb-12">
              Thoughts on technology, engineering, and more.
            </p>

            <p className="text-sm text-theme-muted mb-8 p-4 rounded-lg bg-theme-surface/50 border border-theme-highlight">
              These posts are from my early days in tech (2017). Keeping them
              here for nostalgia.
            </p>

            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-6 rounded-xl bg-theme-surface/50 border border-theme-highlight hover:border-theme-subtle hover:bg-theme-surface transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-theme-text group-hover:text-rose-pine-dawn-pine dark:group-hover:text-rose-pine-foam transition-colors">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-theme-text/70 text-sm leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-theme-muted">
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>·</span>
                        <span>{post.readTime} read</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-theme-highlight/50 text-theme-subtle"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
