import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BlogNewsletterForm from "@/blogs/_components/BlogNewsletterForm";
import { SITE_NAME } from "@/components/layout/siteConstants";

function mergePosts(featured, rest) {
  const seen = new Set();
  const out = [];
  for (const p of [...featured, ...rest]) {
    if (!p?.slug || seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(p);
  }
  return out;
}

function uniqueCategoryTags(posts) {
  const s = new Set();
  for (const p of posts) {
    for (const c of p.categories || []) {
      if (c?.name) s.add(c.name.toUpperCase().replace(/\s+/g, " "));
    }
  }
  return [...s];
}

function FeedPost({ post }) {
  return (
    <article
      className="border-b border-zinc-200 pb-16 last:border-b-0 last:pb-0"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-medium tracking-widest uppercase">
        <span className="border border-zinc-300 px-2 py-1 text-zinc-800">
          {post.categoryLabel}
        </span>
        {post.publishedLabel ? (
          <span className="text-zinc-400">{post.publishedLabel}</span>
        ) : null}
      </div>

      <Link to={post.href} className="group block">
        <div className="relative mb-6 aspect-video w-full overflow-hidden bg-zinc-200 sm:aspect-[21/9]">
          <img
            src={post.coverUrl}
            alt={post.title}
            className="h-full w-full object-cover grayscale contrast-125 transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {post.title}
        </h2>
      </Link>

      <p className="mb-6 max-w-2xl text-base leading-relaxed text-zinc-600">
        {post.excerpt || post.summary}
      </p>

      <Link
        to={post.href}
        className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.2em] text-zinc-900 uppercase underline-offset-4 hover:underline"
      >
        View article
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </article>
  );
}

export default function BlogListingView({ featured, rest }) {
  const posts = mergePosts(featured, rest);
  const hero = posts[0];
  const feedPosts = posts.length <= 1 ? [] : posts.slice(1);
  const tags = uniqueCategoryTags(posts);
  const focusItems = posts.slice(0, 3);
  const defaultTags = [
    "INFRASTRUCTURE",
    "PHILOSOPHY",
    "PERFORMANCE",
    "SYSTEMS",
  ];
  const collectionTags = tags.length ? tags : defaultTags;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-zinc-900 antialiased">
      <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
        <div className="min-w-0 flex-1">
          <section
            id="codex"
            className="relative overflow-hidden border-b border-zinc-200 px-6 py-16 sm:px-10 sm:py-20"
          >
            <div className="pointer-events-none absolute -right-8 top-1/2 h-[min(55vw,22rem)] w-[min(55vw,22rem)] -translate-y-1/2 rotate-12 border border-zinc-200 opacity-50 sm:h-80 sm:w-80" />
            <div className="relative max-w-3xl">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
                Journal entry no. 001
              </p>
              <p className="mb-4 text-[13px] font-medium text-zinc-700">
                {SITE_NAME}
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem]">
                {hero ? hero.title : "The Archivist: Systems of Thought"}
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-600">
                {hero
                  ? hero.excerpt || hero.summary
                  : "Notes on software, distributed systems, and the craft of building things that last. New entries arrive as they are written."}
              </p>
              <div className="flex flex-wrap gap-3">
                {hero ? (
                  <Link
                    to={hero.href}
                    className="inline-flex min-h-11 items-center justify-center bg-zinc-950 px-6 text-[11px] font-semibold tracking-widest text-white uppercase transition hover:bg-zinc-800"
                  >
                    Open first entry
                  </Link>
                ) : null}
                <a
                  href="#feed"
                  className="inline-flex min-h-11 items-center justify-center border border-zinc-900 bg-transparent px-6 text-[11px] font-semibold tracking-widest text-zinc-900 uppercase transition hover:bg-zinc-900 hover:text-white"
                >
                  Enter the codex
                </a>
              </div>
            </div>
          </section>

          <section id="feed" className="px-6 py-16 sm:px-10">
            {posts.length === 0 ? (
              <p className="text-zinc-500">
                No articles yet. Publish a post in Strapi to see it here.
              </p>
            ) : feedPosts.length === 0 ? (
              <p className="text-zinc-500">
                More journal entries will appear here as they are published.
              </p>
            ) : (
              <div className="mx-auto max-w-3xl space-y-20">
                {feedPosts.map((post) => (
                  <FeedPost key={post.slug} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="w-full max-w-none flex-shrink-0 border-t border-zinc-200 bg-zinc-50 px-6 py-10 xl:max-w-sm xl:w-[min(100%,20rem)] xl:border-l xl:border-t-0 xl:py-12">
          <div className="space-y-12 xl:sticky xl:top-24">
            <div>
              <h3 className="mb-6 text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                Present inquiry
              </h3>
              <ul className="space-y-8">
                {(focusItems.length
                  ? focusItems
                  : [
                      {
                        title: "Serverless evolution",
                        excerpt:
                          "Patterns for shipping quickly without losing observability.",
                      },
                      {
                        title: "Functional refactoring",
                        excerpt:
                          "Small steps that keep behavior identical while clarity improves.",
                      },
                      {
                        title: "Performance budgets",
                        excerpt:
                          "Making speed a requirement, not an afterthought.",
                      },
                    ]
                ).map((item, i) => (
                  <li key={item.slug ?? item.title ?? i}>
                    <p className="text-sm font-bold text-zinc-900">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                      {item.excerpt || item.summary || ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-zinc-200 bg-zinc-100 p-5">
              <h3 className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                Margin note · Occam
              </h3>
              <p className="text-sm italic leading-relaxed text-zinc-700">
                &ldquo;Among competing hypotheses that predict equally well, the one with the fewest assumptions should be selected.&rdquo;
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                — William of Ockham (Occam&rsquo;s razor)
              </p>
            </div>

            <div id="collection">
              <h3 className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                Lines of inquiry
              </h3>
              <div className="flex flex-wrap gap-2">
                {collectionTags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wider text-zinc-700 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section
        id="sanctum"
        className="border-t border-zinc-200 bg-zinc-950 px-6 py-16 text-white sm:px-10"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Sanctum
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70">
            Occasional mandates from {SITE_NAME}. No noise — unsubscribe
            anytime.
          </p>
          <BlogNewsletterForm />
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white px-6 py-5 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
            <a href="#codex" className="hover:text-zinc-900">
              Opening
            </a>
            <a href="#feed" className="hover:text-zinc-900">
              The codex
            </a>
            <span className="text-zinc-400">Privacy</span>
            <span className="text-zinc-400">RSS</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
