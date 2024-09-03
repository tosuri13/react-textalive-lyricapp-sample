"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect } from "react";

import { BounceCircle } from "@/components/BounseCircle";
import { CuteImage } from "@/components/CuteImage";
import { MusicContext } from "@/components/MusicProvider";

export default function AppPage() {
  const { player, phrase } = useContext(MusicContext);
  const controls = useAnimationControls();

  useEffect(() => {
    if (player) {
      player.requestPlay();
    }
  }, [player]);

  useEffect(() => {
    if (phrase) {
      void controls.start({
        opacity: [0, 1, 1, 0],
        y: [4, 0, 0, 4],
        transition: {
          ease: "linear",
          duration: phrase.duration / 1000,
          times: [0, 0.02, 0.98, 1],
        },
      });
    }
  }, [phrase]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between">
      <div className="flex w-full flex-1 items-center bg-slate-300 bg-[url('/background-image.jpg')] bg-cover bg-center">
        <BounceCircle className="ml-[240px]" />
      </div>
      <div className="flex h-32 w-full flex-row items-center justify-center bg-slate-900">
        <motion.div animate={controls} className="text-4xl text-white">
          {player ? phrase?.text : "ローディングなう!!"}
        </motion.div>
        <span className="inline-block w-[240px]" />
      </div>
      <CuteImage className="absolute bottom-[-800px] right-[64px]" />
    </div>
  );
}
