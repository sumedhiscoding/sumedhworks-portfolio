import { cn } from "@/lib/utils";
import PrimarySidebar, { primaryShellFont } from "@/components/layout/PrimarySidebar";

export default function PhilosopherShell({ topBar, children, className }) {
  return (
    <div
      className={cn(
        "flex h-svh min-h-0 overflow-hidden bg-zinc-50 text-zinc-900 antialiased",
        className
      )}
      style={primaryShellFont()}
    >
      <PrimarySidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {topBar}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
