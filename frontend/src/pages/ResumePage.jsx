import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PhilosopherShell from "@/components/layout/PhilosopherShell";
import SiteTopBar from "@/components/layout/SiteTopBar";
import { SITE_NAME } from "@/components/layout/siteConstants";

const CHAPTERS = [
  {
    id: "present-congruent",
    tag: "PRESENT",
    title: "Software Engineer — Congruent Solutions",
    meta: "Payroll · systems that must not lie",
    items: [
      "End-to-end ownership of microservices and batch pipelines in a regulated payroll domain",
      "30+ services on .NET 8, messaging, and operational rigor under real load",
      "Platform craft: AKS, Helm, Bicep, Key Vault, CI/CD — infrastructure treated as part of the design",
      "Exploring AI-assisted workflows with Semantic Kernel; judgement stays human",
      "Budding architect: naming boundaries, failure modes, and what must stay simple as the graph grows",
    ],
  },
  {
    id: "milestone-year-one",
    tag: "MILESTONE",
    title: "One year in production engineering",
    meta: "Consolidation · depth",
    items: [
      "Deeper ownership across services, data paths, and cross-team contracts",
      "Cloud posture: infrastructure hardening, security tuning, and observable operations",
      "Database performance elevated from firefight to habit",
    ],
  },
  {
    id: "role-congruent-early",
    tag: "ROLE",
    title: "Software Engineer — Congruent Solutions",
    meta: "Payroll · first full-time chapter",
    items: [
      "Full-time engineer after internship conversion; same domain, steeper accountability",
      "Microservices, batch work, on-call discipline, and learning to read a system end to end",
    ],
  },
  {
    id: "intern-congruent",
    tag: "INTERNSHIP",
    title: "Congruent Solutions — Intern",
    meta: "Payroll APIs",
    items: [
      ".NET 8 microservices, API shape, and service boundaries",
      "Database performance exploration and query discipline",
      "RabbitMQ and messaging patterns in anger",
    ],
  },
  {
    id: "intern-nirvin",
    tag: "INTERNSHIP",
    title: "Nirvin IT — Intern",
    meta: "Cloud & delivery",
    items: [
      "Cloud infrastructure setup, hardening, and first production anxieties",
      "Docker, Kubernetes fundamentals, and why orchestration is a contract",
      "Introduction to CI/CD: repeatability as a moral position",
    ],
  },
  {
    id: "formation-iiitdm",
    tag: "FORMATION",
    title: "Mechanical Engineering — Dual Degree (B.Tech + M.Tech)",
    meta: "IIITDM Kancheepuram",
    items: [
      "Rigorous formation in mechanical systems, design under constraint, and how hardware teaches patience with failure modes",
      "Software became the adjacent craft: MERN and cloud-backed projects, data structures, algorithms, and CS depth built alongside the degree",
    ],
  },
];

function Chapter({ tag, title, meta, items }) {
  return (
    <article
      className="border-b border-zinc-200 py-14 last:border-b-0"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-medium tracking-widest uppercase">
        <span className="border border-zinc-300 px-2 py-1 text-zinc-800">
          {tag}
        </span>
        {meta ? (
          <span className="text-zinc-400">{meta}</span>
        ) : null}
      </div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
        {title}
      </h2>
      <ul className="max-w-2xl list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-600">
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  );
}

export default function ResumePage() {
  useEffect(() => {
    document.title = `Record of Becoming · ${SITE_NAME}`;
  }, []);

  return (
    <PhilosopherShell topBar={<SiteTopBar sectionLabel="Record of Becoming" />}>
      <main className="min-h-0 flex-1 overflow-y-auto bg-white">
        <section id="becoming" className="border-b border-zinc-200">
          <div className="flex min-h-0 flex-col lg:min-h-[min(72vh,780px)] lg:flex-row">
            <div className="relative flex flex-1 flex-col justify-center px-6 py-14 sm:px-10 sm:py-20 lg:min-w-0 lg:px-12 lg:py-24 xl:pl-16 xl:pr-10">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_0%_35%,rgba(228,228,231,0.4),transparent_58%)]"
                aria-hidden
              />
              <div className="relative max-w-2xl">
                <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
                  Chronicle · vita
                </p>

                <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-zinc-950">
                  <span className="block">Structure earned in production.</span>
                  <span className="block">Boundaries, load, and time.</span>
                  <span className="block text-zinc-600">Engineer first — architect in training.</span>
                </h1>
                <p className="mt-8 max-w-md text-[15px] leading-relaxed text-zinc-600">
                  The same surface as Origin and Codex: one chronicle, not a separate
                  document. Roles, intervals, and what each season demanded — including
                  the slow discipline of thinking in systems, not only in tickets.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="h-11 rounded-none border-0 bg-zinc-950 px-6 text-[10px] font-semibold tracking-[0.2em] text-white uppercase hover:bg-zinc-800"
                  >
                    <a href="#chapters">Read the chapters</a>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-11 rounded-none border border-zinc-900 bg-transparent px-6 text-[10px] font-semibold tracking-[0.2em] text-zinc-900 uppercase hover:bg-zinc-100"
                  >
                    <Link to="/blogs">Return to codex</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[min(36vh,340px)] flex-1 flex-col border-t border-zinc-800 bg-[#1a1612] lg:max-w-[min(46vw,560px)] lg:min-h-0 lg:flex-none lg:self-stretch lg:border-t-0 lg:border-l lg:border-zinc-800">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(255,255,255,0.07),transparent_62%)]"
                aria-hidden
              />
              <div className="relative flex h-full min-h-0 w-full flex-col px-4 pt-10 pb-10 sm:px-6 lg:px-7">
                <div className="mb-6 w-full shrink-0 border border-stone-500/50 bg-stone-950/40 px-5 py-5 sm:px-6 sm:py-6">
                  <p className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-stone-400 sm:text-xs uppercase">
                    Margin note
                  </p>
                  <p className="text-base italic leading-[1.65] text-stone-100 sm:text-lg md:text-xl">
                    &ldquo;The self is something which has a development; it is
                    not initially there&hellip; it arises in the process of social
                    experience.&rdquo;
                  </p>
                  <p className="mt-4 text-sm leading-snug text-stone-400 sm:text-base">
                    &mdash; George Herbert Mead
                  </p>
                </div>
                <div className="mt-auto flex w-full flex-col items-stretch leading-none">
                  <img
                    src="/images/record-school-of-athens.png"
                    alt=""
                    width={1600}
                    height={900}
                    decoding="async"
                    className="block h-auto w-full max-h-[min(48vh,520px)] object-contain object-bottom shadow-2xl shadow-black/40 lg:max-h-[min(70vh,680px)]"
                  />
                  <p className="mt-2 pb-0 text-center text-[10px] font-medium tracking-[0.15em] text-stone-500 sm:text-[11px] uppercase">
                    <span className="sr-only">Artwork: </span>
                    Raphael · School of Athens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="chapters"
          className="px-6 py-4 sm:px-10"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="mx-auto max-w-3xl">
            {CHAPTERS.map(({ id, ...ch }) => (
              <Chapter key={id} {...ch} />
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-10 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              Archival copy
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              Prefer a portable file?{" "}
              <a
                href="/SumedhResume.pdf"
                className="font-medium text-zinc-900 underline-offset-4 hover:underline"
              >
                Download PDF
              </a>
            </p>
          </div>
        </section>

        <footer className="border-t border-zinc-200 px-6 py-5 sm:px-10">
          <p className="text-[10px] tracking-wide text-zinc-500">
            © {new Date().getFullYear()} {SITE_NAME}. Record of Becoming.
          </p>
        </footer>
      </main>
    </PhilosopherShell>
  );
}
