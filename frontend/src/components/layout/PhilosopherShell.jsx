import { cloneElement, isValidElement, useState } from "react";
import { cn } from "@/lib/utils";
import MobileNavDrawer from "@/components/layout/MobileNavDrawer";
import PrimarySidebar, { primaryShellFont } from "@/components/layout/PrimarySidebar";

export default function PhilosopherShell({ topBar, children, className }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const topBarNode =
    isValidElement(topBar) && typeof topBar.type !== "string"
      ? cloneElement(topBar, {
          onOpenMobileNav: () => setMobileNavOpen(true),
        })
      : topBar;

  return (
    <div
      className={cn(
        "flex h-svh min-h-0 overflow-hidden bg-zinc-50 text-zinc-900 antialiased",
        className
      )}
      style={primaryShellFont()}
    >
      <MobileNavDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <PrimarySidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {topBarNode}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
