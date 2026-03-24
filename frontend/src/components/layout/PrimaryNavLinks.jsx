import { NavLink } from "react-router-dom";
import { BookOpen, Home, Library, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

export function primaryNavItemClass({ isActive }) {
  return cn(
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors",
    isActive
      ? "bg-white text-zinc-950 shadow-sm"
      : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900"
  );
}

function primaryNavItemClassDrawer({ isActive }) {
  return cn(
    "flex items-center gap-3 rounded-md px-3 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors",
    isActive
      ? "bg-zinc-100 text-zinc-950"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
  );
}

/**
 * @param {{ onNavigate?: () => void; variant?: "sidebar" | "drawer" }} props
 */
export default function PrimaryNavLinks({ onNavigate, variant = "sidebar" }) {
  const itemClass =
    variant === "drawer" ? primaryNavItemClassDrawer : primaryNavItemClass;

  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      <NavLink to="/" end className={itemClass} onClick={onNavigate}>
        <Home className="h-4 w-4 shrink-0 stroke-[1.25]" aria-hidden />
        Origin
      </NavLink>
      <NavLink to="/blogs" className={itemClass} onClick={onNavigate}>
        <BookOpen className="h-4 w-4 shrink-0 stroke-[1.25]" aria-hidden />
        Codex
      </NavLink>
      <NavLink to="/projects" className={itemClass} onClick={onNavigate}>
        <Library className="h-4 w-4 shrink-0 stroke-[1.25]" aria-hidden />
        Constructions
      </NavLink>
      <NavLink to="/resume" className={itemClass} onClick={onNavigate}>
        <ScrollText className="h-4 w-4 shrink-0 stroke-[1.25]" aria-hidden />
        <span className="min-w-0 leading-snug">Record of Becoming</span>
      </NavLink>
    </nav>
  );
}
