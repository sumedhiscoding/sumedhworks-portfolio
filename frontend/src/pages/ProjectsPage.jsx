import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import ProjectCard from "@/components/ui/ProjectCard";
import { IconTypes } from "@/constants/iconTypes";
import { apiendpoints, config } from "@/config";
import { fetchProjects } from "@/helper/fetchhelper";
import PhilosopherShell from "@/components/layout/PhilosopherShell";
import SiteTopBar from "@/components/layout/SiteTopBar";
import { SITE_NAME } from "@/components/layout/siteConstants";

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    document.title = `Constructions · ${SITE_NAME}`;
    let cancelled = false;
    (async () => {
      const projects = await fetchProjects(apiendpoints.GET_ALL_PROJECTS_API);
      if (cancelled) return;
      setProjectsData(projects?.data ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (projectsData === null) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Constructions" />}>
        <div className="flex-1 bg-white p-8 text-center text-zinc-500">
          Loading…
        </div>
      </PhilosopherShell>
    );
  }

  if (!projectsData.length) {
    return (
      <PhilosopherShell topBar={<SiteTopBar sectionLabel="Constructions" />}>
        <div className="flex-1 bg-white p-8 text-center text-zinc-600">
          No artifacts published yet — the workshop is not empty, only quiet.
        </div>
      </PhilosopherShell>
    );
  }

  return (
    <PhilosopherShell topBar={<SiteTopBar sectionLabel="Constructions" />}>
      <div className="scrollbar min-h-0 flex-1 overflow-y-auto bg-white">
        <Header
          title="Constructions"
          subtitle="Each artifact is an argument: reliability under load, simplicity where it earns its keep, boundaries that survive contact with reality. The list grows as work is fit to tell."
        />
        <div className="columns-1 gap-4 p-4 sm:columns-2 lg:columns-3">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.slug ?? project.id}
              Title={project.Name}
              Description={project.Description}
              Technologies={
                project.Technologies
                  ? project.Technologies.split(", ").map((item) => item.trim())
                  : []
              }
              ImageSrc={
                project.Showcase != null
                  ? `${config.STRAPI_BACKEND_BASEURL}${project.Showcase[0].formats.small.url}`
                  : ""
              }
              Link={project.Link}
              href={`/projects/${project.slug}`}
              btnIcon={IconTypes.ARROW_RIGHT}
            />
          ))}
        </div>
      </div>
    </PhilosopherShell>
  );
}
