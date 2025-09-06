"use client";
import { apiendpoints, config } from "../../config/config";
import { IconTypes } from "./components/button/Button";
import Card from "./components/card/Card";
import { fetchBlogs } from "./helper/fetchhelper";
import styles from "./globals.css";
import { Spotlight } from "@/app/components/motion-primitives/spotlight";
import { SpotlightCustomColor } from "./components/SpotlightCustomColor/SpotlightCustomColor";
import { TextEffect } from "./components/motion-primitives/text-effect";
import Link from "next/link";
import { useEffect, useState } from "react";

import AppleStyleDock from "@/app/components/AppleStyleDock";
import InfiniteSliderVertical from "./components/CustomInfiniteSlider/CustomInfiniteSlider";
import { TextRoll } from "./components/motion-primitives/textRoll";

// ...existing code...

const Home = () => {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderKey((prev) => prev + 1);
    }, 5000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <SpotlightCustomColor>
      <div className="flex h-[100%] hello w-[100%]">
        <div className="h-[70%] w-[30%] flex justify-center">
          <InfiniteSliderVertical direction="vertical" />
        </div>
        <div className="h-full w-[40%] flex flex-col justify-between">
          <div
            key={renderKey}
            className="flex flex-col  items-center justify-center flex-grow"
          >
            <TextRoll className="font-bold h1_display ">Sumedh Gavai</TextRoll>
            <TextEffect
              className="text-lg text-gray-700 dark:text-gray-300 text-center mt-2"
              preset="fade-in-blur"
              speedReveal={1.1}
              speedSegment={0.3}
            >
              This is a brief introduction to my portfolio.
            </TextEffect>
          </div>

          <div className="sticky bottom-0 w-full text-center py-2">
            <AppleStyleDock />
          </div>
        </div>

        <div className="h-full w-[30%] relative">
          <div className="absolute bottom-20 w-full">
            <InfiniteSliderVertical direction="horizontal" />
          </div>
        </div>
      </div>
    </SpotlightCustomColor>
  );
};

export default Home;
