import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import PrimaryNavLinks from "@/components/layout/PrimaryNavLinks";
import { INSCRIPTION_LABEL, SITE_NAME } from "@/components/layout/siteConstants";

export default function MobileNavDrawer({ open, onClose }) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement;
      document.body.style.overflow = "hidden";
      queueMicrotask(() => {
        panelRef.current?.querySelector("button")?.focus();
      });
    } else {
      document.body.style.overflow = "";
      if (
        previouslyFocused.current &&
        typeof previouslyFocused.current.focus === "function"
      ) {
        previouslyFocused.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute top-0 right-0 flex h-full max-h-svh w-[min(100%,20rem)] flex-col border-l border-zinc-200 bg-white shadow-xl"
        style={{
          paddingTop: "max(0px, env(safe-area-inset-top))",
          paddingRight: "max(0px, env(safe-area-inset-right))",
          paddingBottom: "max(0px, env(safe-area-inset-bottom))",
        }}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b border-zinc-200 py-3 pr-2 pl-4"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(0.5rem, env(safe-area-inset-right))",
          }}
        >
          <Link
            to="/"
            className="min-w-0 truncate text-[13px] font-semibold text-zinc-900"
            onClick={onClose}
          >
            {SITE_NAME}
          </Link>
          <button
            type="button"
            className="rounded-md p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-6"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(1rem, env(safe-area-inset-right))",
          }}
        >
          <PrimaryNavLinks variant="drawer" onNavigate={onClose} />
        </div>
        <div
          className="shrink-0 border-t border-zinc-200 py-5"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(1rem, env(safe-area-inset-right))",
            paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-300 bg-zinc-50 text-[10px] font-bold tracking-tighter text-zinc-800">
              SG
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                {INSCRIPTION_LABEL}
              </p>
              <p className="truncate text-xs font-medium text-zinc-800">
                {SITE_NAME}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
