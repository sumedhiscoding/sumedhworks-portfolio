import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAME, SITE_SUBTITLE } from "@/components/layout/siteConstants";

/**
 * @param {string} sectionLabel — current chamber only (e.g. Origin, Codex)
 * @param {() => void} [onOpenMobileNav] — opens mobile nav (injected by PhilosopherShell)
 */
export default function SiteTopBar({ sectionLabel, className, onOpenMobileNav }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white/90 py-3.5 backdrop-blur-sm",
        "pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))]",
        className
      )}
      style={{ paddingTop: "max(0.875rem, env(safe-area-inset-top))" }}
    >
      <div className="flex min-w-0 max-w-[min(100%,calc(100vw-5rem))] flex-col gap-0.5 sm:max-w-[calc(100%-3.5rem)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1 lg:max-w-none">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
          <Link
            to="/"
            className="truncate text-[13px] font-semibold text-zinc-900 hover:text-zinc-600"
          >
            {SITE_NAME}
          </Link>
          <span className="shrink-0 text-zinc-300" aria-hidden>
            ·
          </span>
          <span className="min-w-0 truncate text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            {SITE_SUBTITLE}
          </span>
        </div>
        {sectionLabel ? (
          <span className="w-full min-w-0 truncate text-[10px] font-semibold tracking-[0.2em] text-zinc-900 uppercase sm:w-auto sm:max-w-[min(100%,14rem)] lg:max-w-none">
            <span className="text-zinc-300 sm:inline" aria-hidden>
              ·{" "}
            </span>
            {sectionLabel}
          </span>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1 text-zinc-500">
        <button
          type="button"
          className="rounded-md p-2 transition-colors hover:bg-zinc-100"
          aria-label="Search"
        >
          <Search className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="rounded-md p-2 transition-colors hover:bg-zinc-100 lg:hidden"
          aria-label="Open menu"
          onClick={() => onOpenMobileNav?.()}
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
