import { Lato, Open_Sans } from "next/font/google";
import AppleStyleDock from "@/app/components/AppleStyleDock";
import { Merriweather, Lora, Playfair_Display } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Sumedh Blogs",
  description: "A collection of blogs by Sumedh Gavai",
};

export function Layout({ children }) {
  return (
    <div className="overflow-hidden">
      {children}
      <AppleStyleDock className="fixed bottom-2 py-2  left-0 w-full z-50 " />
    </div>
  );
}

export default Layout;
