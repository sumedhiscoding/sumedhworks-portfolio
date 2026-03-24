import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAME, SITE_SUBTITLE } from "@/components/layout/siteConstants";

/**
 * @param {string} sectionLabel — current chamber only (e.g. Origin, Codex)
 */
export default function SiteTopBar({ sectionLabel, className }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 bg-white/90 px-6 py-3.5 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        <Link
          to="/"
          className="truncate text-[13px] font-semibold text-zinc-900 hover:text-zinc-600"
        >
          {SITE_NAME}
        </Link>
        <span className="text-zinc-300" aria-hidden>
          ·
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          {SITE_SUBTITLE}
        </span>
        {sectionLabel ? (
          <>
            <span className="text-zinc-300" aria-hidden>
              ·
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-900 uppercase">
              {sectionLabel}
            </span>
          </>
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
          aria-label="Menu"
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
