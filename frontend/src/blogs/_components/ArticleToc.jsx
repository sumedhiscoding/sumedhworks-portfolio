import { useCallback, useEffect, useRef, useState } from "react";

const SENSE_OFFSET = 96;

/**
 * Sticky outline with vertical reading progress and heading spy.
 */
export default function ArticleToc({ entries, scrollRootRef }) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  const updateFromScroll = useCallback(() => {
    const root = scrollRootRef?.current;
    if (!root || !entries.length) return;

    const { scrollTop, scrollHeight, clientHeight } = root;
    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    const pct =
      maxScroll <= 0
        ? 100
        : Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
    setProgress(pct);

    const rootRect = root.getBoundingClientRect();
    const senseY = rootRect.top + SENSE_OFFSET;
    let best = entries[0]?.id ?? null;
    for (const { id } of entries) {
      const el = root.querySelector(`#${CSS.escape(id)}`);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= senseY) best = id;
    }
    setActiveId(best);
  }, [entries, scrollRootRef]);

  useEffect(() => {
    if (!entries.length || !scrollRootRef?.current) return;
    const root = scrollRootRef.current;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        updateFromScroll();
      });
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    updateFromScroll();

    const ro = new ResizeObserver(() => updateFromScroll());
    ro.observe(root);

    return () => {
      root.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [entries, scrollRootRef, updateFromScroll]);

  if (!entries.length) return null;

  const activeIndex = entries.findIndex((e) => e.id === activeId);

  return (
    <nav
      className="sticky top-24 z-[1] flex w-full max-w-64 flex-col"
      aria-label="In this entry"
    >
      <div className="flex min-h-0 flex-1 gap-3">
        <div
          className="relative mt-0.5 w-1 shrink-0 rounded-full bg-zinc-200"
          style={{ height: "min(18rem, calc(100vh - 11rem))" }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="How far you have scrolled through this entry"
        >
          <div
            className="absolute top-0 left-0 w-full rounded-full bg-zinc-900 transition-[height] duration-75 ease-out"
            style={{ height: `${progress}%` }}
          />
        </div>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto pr-0.5">
          <p className="mb-3 text-[9px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Contents
          </p>
          <ol className="space-y-0.5">
            {entries.map((item, i) => {
              const read = activeIndex >= 0 && i < activeIndex;
              const active = item.id === activeId;
              const pad =
                item.level === 1 ? "" : item.level === 2 ? "pl-3" : "pl-5";
              const dotClass =
                read || active
                  ? "bg-zinc-900"
                  : "bg-zinc-300 ring-2 ring-white";

              return (
                <li key={item.id} className="relative">
                  <span
                    className={`absolute top-2 -left-[1.125rem] z-[1] h-2 w-2 rounded-full transition-all duration-200 ${dotClass}`}
                    aria-hidden
                  />
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const root = scrollRootRef?.current;
                      const el = root?.querySelector(`#${CSS.escape(item.id)}`);
                      if (el && root) {
                        const rootRect = root.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const top =
                          elRect.top - rootRect.top + root.scrollTop - 72;
                        root.scrollTo({
                          top: Math.max(0, top),
                          behavior: "smooth",
                        });
                      }
                    }}
                    className={`block py-1.5 text-left text-[11px] leading-snug transition-colors duration-200 ${pad} ${
                      active
                        ? "font-semibold text-zinc-900"
                        : read
                          ? "text-zinc-400"
                          : "text-zinc-600 hover:text-zinc-900"
                    } `}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
