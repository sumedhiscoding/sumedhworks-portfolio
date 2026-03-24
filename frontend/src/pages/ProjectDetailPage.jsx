import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConditionalRenderer from "@/components/shared/ConditionalRenderer";
import MarkdownRenderer from "@/components/shared/MarkdownRenderer";
import Footer from "@/components/ui/Footer";
import { apiendpoints, config } from "@/config";
import { fetchProjects } from "@/helper/fetchhelper";
import PhilosopherShell from "@/components/layout/PhilosopherShell";
import SiteTopBar from "@/components/layout/SiteTopBar";
import { SITE_NAME } from "@/components/layout/siteConstants";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const projects = await fetchProjects(
        `${apiendpoints.GET_ALL_PROJECTS_API}&filters[slug][$eq]=${encodeURIComponent(slug)}`
      );
      if (cancelled) return;
      const p = projects?.data?.[0];
      setProject(p ?? null);
      if (p) {
        document.title = `${p.Name} · Constructions · ${SITE_NAME}`;
      } else {
        document.title = `Constructions · ${SITE_NAME}`;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (project === undefined) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Constructions" />}>
        <div className="flex-1 bg-white p-8 text-center text-zinc-500">
          Loading…
        </div>
      </PhilosopherShell>
    );
  }
  if (!project) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Constructions" />}>
        <div className="flex-1 bg-white py-20 text-center text-zinc-500">
          Construction not found.
        </div>
      </PhilosopherShell>
    );
  }

  return (
    <PhilosopherShell topBar={<SiteTopBar sectionLabel="Constructions" />}>
      <div className="scrollbar min-h-0 flex-1 scroll-smooth overflow-y-auto bg-white p-5 sm:p-8">
        <div className="mb-8 border-b border-zinc-200 pt-4">
          <ConditionalRenderer condition={project.Name}>
            <h1 className="mb-4 text-4xl leading-tight font-bold text-zinc-950">
              {project.Name}
            </h1>
          </ConditionalRenderer>

          <ConditionalRenderer condition={project.Technologies}>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.Technologies.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </ConditionalRenderer>
        </div>

        {project.Showcase?.[0]?.formats?.large?.url ? (
          <div className="mb-12">
            <img
              className="max-h-[500px] w-full rounded-xl object-cover shadow-lg grayscale contrast-125"
              src={`${config.STRAPI_BACKEND_BASEURL}${project.Showcase[0].formats.large.url}`}
              alt="Project cover"
              width={project.Showcase[0].formats.large.width}
              height={project.Showcase[0].formats.large.height}
            />
          </div>
        ) : null}

        <div className="max-w-none leading-relaxed">
          <ConditionalRenderer condition={project.Description}>
            <MarkdownRenderer content={project.Content?.[0]?.body} />
          </ConditionalRenderer>
        </div>

        <div className="mt-20 border-t border-zinc-200 pt-10">
          <Footer />
        </div>
      </div>
    </PhilosopherShell>
  );
}
