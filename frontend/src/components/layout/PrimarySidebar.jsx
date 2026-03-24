import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import PrimaryNavLinks from "@/components/layout/PrimaryNavLinks";
import { INSCRIPTION_LABEL, SITE_NAME } from "@/components/layout/siteConstants";

export function primaryShellFont() {
  return {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  };
}

export default function PrimarySidebar({ className }) {
  return (
    <aside
      className={cn(
        "hidden w-[13.5rem] shrink-0 flex-col justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-8 lg:flex lg:border-b-0 lg:border-r",
        className
      )}
    >
      <div>
        <Link
          to="/"
          className="mb-8 block px-1 text-[2rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600"
          style={{ fontFamily: "var(--font-playfair), ui-serif, Georgia, serif" }}
        >
          {/* {SITE_NAME} */}
          OCCAM'S DISCIPLE
        </Link>
        <PrimaryNavLinks variant="sidebar" />
      </div>
      <div className="mt-12 border-t border-zinc-200/80 pt-6">
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
