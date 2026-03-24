import { useEffect, useState } from "react";
import { getBlogListingData } from "@/blogs/_lib/get-blogs";
import BlogListingView from "@/blogs/_components/BlogListingView";
import PhilosopherShell from "@/components/layout/PhilosopherShell";
import SiteTopBar from "@/components/layout/SiteTopBar";
import { SITE_NAME } from "@/components/layout/siteConstants";

export default function BlogsPage() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    document.title = `Codex · ${SITE_NAME}`;
    let cancelled = false;
    (async () => {
      try {
        const d = await getBlogListingData();
        if (cancelled) return;
        if (d === null) {
          setErr(new Error("strapi"));
          return;
        }
        setData(d);
      } catch (e) {
        if (!cancelled) setErr(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (err) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Codex" />}>
        <div className="mx-auto max-w-lg flex-1 bg-white px-6 py-16 text-center">
          <p className="text-sm font-medium text-zinc-900">
            The codex could not be opened.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Strapi returned no data (often <strong>403 Forbidden</strong> or a
            network error). In Strapi Admin go to{" "}
            <span className="whitespace-nowrap font-mono text-xs">
              Settings → Users &amp; Permissions → Roles → Public
            </span>{" "}
            and enable <strong>find</strong> and <strong>findOne</strong> for{" "}
            <strong>Article</strong>. Ensure the entry is{" "}
            <strong>Published</strong>, and allow your Vite origin in Strapi{" "}
            <span className="font-mono text-xs">middlewares.js</span> CORS.
          </p>
          <p className="mt-6 font-mono text-xs text-zinc-500">
            API:{" "}
            {import.meta.env.VITE_STRAPI_BASE_URL ?? "http://localhost:1337"}
            /api/articles
          </p>
        </div>
      </PhilosopherShell>
    );
  }
  if (!data) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Codex" />}>
        <div className="flex-1 bg-white p-8 text-center text-zinc-500">
          Loading…
        </div>
      </PhilosopherShell>
    );
  }

  return (
    <PhilosopherShell topBar={<SiteTopBar sectionLabel="Codex" />}>
      <div className="scrollbar min-h-0 flex-1 overflow-y-auto bg-white">
        <BlogListingView featured={data.featured} rest={data.rest} />
      </div>
    </PhilosopherShell>
  );
}
