import { Lato, Open_Sans } from "next/font/google";
import AppleStyleDock from "@/app/components/AppleStyleDock";
import { TransitionLayout } from "../components/motion-primitives/transition-layout";
import Footer from "../components/Footer";

export function Layout({ children }) {
  return (
    <div>
      {children}
      <AppleStyleDock className="fixed bottom-2 py-2  left-0 w-full z-50 " />
    </div>
  );
}

export default Layout;
