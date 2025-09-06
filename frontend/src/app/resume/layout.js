import React from "react";
import AppleStyleDock from "@/app/components/AppleStyleDock";

export function Layout({ children }) {
  return (
    <div className="overflow-hidden">
      {children}
      <AppleStyleDock className="fixed bottom-0 py-0  left-0 w-full z-50 " />
    </div>
  );
}

export default Layout;
