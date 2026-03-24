import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogArticleBySlug } from "@/blogs/_lib/get-blogs";
import BlogArticleView from "@/blogs/_components/BlogArticleView";
import PhilosopherShell from "@/components/layout/PhilosopherShell";
import SiteTopBar from "@/components/layout/SiteTopBar";
import { SITE_NAME } from "@/components/layout/siteConstants";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const a = await getBlogArticleBySlug(slug);
      if (cancelled) return;
      setArticle(a);
      document.title = a
        ? `${a.title} · Codex · ${SITE_NAME}`
        : `Codex · ${SITE_NAME}`;
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (article === undefined) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Codex" />}>
        <div className="flex-1 bg-white p-8 text-center text-zinc-500">
          Loading…
        </div>
      </PhilosopherShell>
    );
  }
  if (!article) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Codex" />}>
        <div className="flex-1 bg-white py-20 text-center text-zinc-500">
          Entry not found.
        </div>
      </PhilosopherShell>
    );
  }

  return (
    <PhilosopherShell topBar={<SiteTopBar sectionLabel="Codex" />}>
      <BlogArticleView article={article} />
    </PhilosopherShell>
  );
}
