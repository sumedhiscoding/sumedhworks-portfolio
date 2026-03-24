import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ConditionalRenderer from "@/components/shared/ConditionalRenderer";
import { getCategoryTextClass } from "@/helper/get-category-colors";
import Footer from "@/components/ui/Footer";
import MarkdownRenderer from "@/components/shared/MarkdownRenderer";
import ArticleToc from "@/blogs/_components/ArticleToc";
import { extractHeadingToc } from "@/blogs/_lib/extract-heading-toc";

export default function BlogArticleView({ article }) {
  const scrollRef = useRef(null);
  const toc = useMemo(
    () => extractHeadingToc(article.bodyMarkdown ?? ""),
    [article.bodyMarkdown]
  );

  return (
    <div
      ref={scrollRef}
      className="scrollbar min-h-0 flex-1 scroll-smooth overflow-y-auto bg-white"
    >
      <div className="p-5 sm:p-8 lg:flex lg:gap-12 xl:gap-16">
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center gap-3">
            <Link
              to="/blogs"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Back to Codex"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
            </Link>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              Codex
            </p>
          </div>
          <div className="mb-8 border-b border-zinc-200">
            <ConditionalRenderer condition={article.title}>
              <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-zinc-950">
                {article.title}
              </h1>
            </ConditionalRenderer>

            <ConditionalRenderer condition={article.categories}>
              <div className="mb-6 flex flex-wrap gap-2">
                {article.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className={`rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium ${getCategoryTextClass(cat.name)}`}
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </ConditionalRenderer>
          </div>

          <div className="mb-12">
            {article.cover?.url && article.cover.width && article.cover.height ? (
              <img
                className="max-h-[500px] w-full rounded-xl object-cover shadow-lg grayscale contrast-125"
                src={article.cover.url}
                alt={article.title}
                width={article.cover.width}
                height={article.cover.height}
              />
            ) : null}
          </div>

          <div className="max-w-none leading-relaxed">
            <ConditionalRenderer condition={article.bodyMarkdown}>
              <MarkdownRenderer
                content={article.bodyMarkdown}
                tocEntries={toc}
              />
            </ConditionalRenderer>
          </div>

          <div className="mt-20 border-t border-zinc-200 pt-10">
            <Footer />
          </div>
        </div>

        {toc.length > 0 ? (
          <aside className="mt-12 hidden w-56 shrink-0 lg:mt-0 lg:block xl:w-64">
            <ArticleToc entries={toc} scrollRootRef={scrollRef} />
          </aside>
        ) : null}
      </div>
    </div>
  );
}
