import { Link, NavLink } from "react-router-dom";
import { BookOpen, Home, Library, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSCRIPTION_LABEL, SITE_NAME } from "@/components/layout/siteConstants";

function navItemClass({ isActive }) {
  return cn(
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors",
    isActive
      ? "bg-white text-zinc-950 shadow-sm"
      : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900"
  );
}

export function primaryShellFont() {
  return {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  };
}

export default function PrimarySidebar({ className }) {
  return (
    <aside
      className={cn(
        "flex w-[13.5rem] shrink-0 flex-col justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-8 lg:border-b-0 lg:border-r",
        className
      )}
    >
      <div>
        <Link
          to="/"
          className="mb-8 block px-1 text-[13px] font-semibold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex flex-col gap-1" aria-label="Primary">
          <NavLink to="/" end className={navItemClass}>
            <Home className="h-4 w-4 shrink-0 stroke-[1.25]" aria-hidden />
            Origin
          </NavLink>
          <NavLink to="/blogs" className={navItemClass}>
            <BookOpen
              className="h-4 w-4 shrink-0 stroke-[1.25]"
              aria-hidden
            />
            Codex
          </NavLink>
          <NavLink to="/projects" className={navItemClass}>
            <Library
              className="h-4 w-4 shrink-0 stroke-[1.25]"
              aria-hidden
            />
            Constructions
          </NavLink>
          <NavLink to="/resume" className={navItemClass}>
            <ScrollText
              className="h-4 w-4 shrink-0 stroke-[1.25]"
              aria-hidden
            />
            <span className="min-w-0 leading-snug">Record of Becoming</span>
          </NavLink>
        </nav>
      </div>
      <div className="mt-12 hidden border-t border-zinc-200/80 pt-6 lg:block">
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-300 bg-white text-[10px] font-bold tracking-tighter text-zinc-800">
            SG
          </div>
          <div>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              {INSCRIPTION_LABEL}
            </p>
            <p className="text-xs font-medium text-zinc-800">{SITE_NAME}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
