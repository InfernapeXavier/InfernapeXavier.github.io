import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { getPostBySlug, getAllPosts } from "@/data/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Rohit Choudhari",
    };
  }

  return {
    title: `${post.title} | Rohit Choudhari`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-16 font-sans">
      <section className="min-h-screen bg-rose-pine-base relative overflow-hidden">
        <div className="floating-shapes" />
        <div className="grid-pattern" />
        <div className="section-container">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-theme-subtle hover:text-theme-text transition-colors mb-8"
            >
              <FaArrowLeft className="text-sm" />
              <span>Back to blog</span>
            </Link>

            <article>
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-theme-muted mb-4">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-theme-highlight/50 text-theme-subtle border border-theme-highlight"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {post.originalUrl && (
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-theme-muted hover:text-theme-subtle transition-colors"
                  >
                    <span>Originally published on Medium</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
              </header>

              <div className="prose prose-lg max-w-none">
                {post.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="text-2xl font-bold text-theme-text mt-10 mb-4"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("> ")) {
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-rose-pine-dawn-pine dark:border-rose-pine-foam pl-4 my-6 text-theme-subtle italic"
                      >
                        {paragraph.replace("> ", "")}
                      </blockquote>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n");
                    return (
                      <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-theme-text/85">
                            {item
                              .replace("- ", "")
                              .replace(/\*\*(.*?)\*\*/g, "$1")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-theme-text/85 leading-relaxed mb-6"
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
          </div>
        </div>
      </section>
    </main>
  );
}
