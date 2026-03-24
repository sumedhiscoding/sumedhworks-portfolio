import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PhilosopherShell from "@/components/layout/PhilosopherShell";
import SiteTopBar from "@/components/layout/SiteTopBar";
import { SITE_NAME } from "@/components/layout/siteConstants";

export default function HomePage() {
  useEffect(() => {
    document.title = `${SITE_NAME} · Origin`;
  }, []);

  return (
    <PhilosopherShell topBar={<SiteTopBar sectionLabel="Origin" />}>
      <main className="min-h-0 flex-1 overflow-y-auto bg-white">
        <section
          id="codex"
          className="relative border-b border-zinc-200"
        >
          <div className="flex min-h-0 flex-col lg:min-h-[min(88vh,860px)] lg:flex-row">
            <div className="relative flex min-w-0 flex-1 flex-col justify-center px-6 py-14 sm:px-10 sm:py-20 lg:min-w-0 lg:px-12 lg:py-24 xl:pl-16 xl:pr-12">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_40%,rgba(228,228,231,0.45),transparent_55%)]"
                aria-hidden
              />
              <div className="relative max-w-xl">
                <p
                  className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-zinc-400 uppercase"
                  style={{ fontFamily: "var(--font-playfair), ui-serif, Georgia, serif" }}
                >
                  First principle · 001
                </p>
                <p className="mb-5 text-[13px] font-medium text-zinc-700">{SITE_NAME}</p>
                <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-zinc-950">
                  <span className="block">Fewer moving parts.</span>
                  <span className="block">Honest constraints.</span>
                  <span
                    className="block text-zinc-600"
                    style={{ fontFamily: "var(--font-playfair), ui-serif, Georgia, serif" }}
                  >
                    What still stands tomorrow.
                  </span>
                </h1>
                <p className="mt-8 max-w-md text-[15px] leading-relaxed text-zinc-600">
                  I write software and tend the shape beneath it — boundaries, load,
                  and time. Engineer by trade, architect in appetite: the same
                  curiosity that reads a philosopher reads a dependency graph.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="h-11 rounded-none border-0 bg-zinc-950 px-6 text-[10px] font-semibold tracking-[0.2em] text-white uppercase hover:bg-zinc-800"
                  >
                    <Link to="/blogs">Enter the codex</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-11 rounded-none border border-zinc-900 bg-transparent px-6 text-[10px] font-semibold tracking-[0.2em] text-zinc-900 uppercase hover:bg-zinc-100"
                  >
                    <Link to="/projects">Enter constructions</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[min(34vh,300px)] flex-1 items-end justify-center border-t border-zinc-800 bg-zinc-950 sm:min-h-[min(38vh,360px)] lg:min-h-0 lg:max-w-[min(46vw,540px)] lg:flex-none lg:border-t-0 lg:border-l lg:border-zinc-800">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_100%,rgba(255,255,255,0.06),transparent_65%)]"
                aria-hidden
              />
              <img
                src="/images/origin-philosopher.png"
                alt=""
                width={800}
                height={1200}
                decoding="async"
                fetchPriority="high"
                className="relative z-[1] h-auto w-full max-h-[min(42vh,400px)] object-contain object-bottom px-4 pb-2 sm:max-h-[min(52vh,520px)] lg:max-h-[min(82vh,760px)] lg:px-2 lg:pb-0"
              />
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-200 px-6 py-5 sm:px-10">
          <p className="text-[10px] tracking-wide text-zinc-500">
            © {new Date().getFullYear()} {SITE_NAME}. Built for clarity.
          </p>
        </footer>
      </main>
    </PhilosopherShell>
  );
}
