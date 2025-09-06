import Link from "next/link";
import {
  Dock,
  DockItem,
  DockIcon,
  DockLabel,
} from "@/app/components/motion-primitives/dock";
import { navigationData } from "@/app/components/navigationData";

function AppleStyleDock({ className = "" }) {
  return (
    <div
      className={`fixed bottom-2 left-0 w-full z-50 ${className}`}
      style={{ pointerEvents: "auto" }}
    >
      <Dock className="items-end pb-3 backdrop-blur-xs">
        {navigationData.map((item, idx) => (
          <Link href={item.href} key={idx}>
            <DockItem
              key={idx}
              className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 hover:cursor-pointer"
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}

export default AppleStyleDock;
