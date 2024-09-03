import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { HTMLAttributes, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export type BounceCircleProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const BounceCircle = ({ className, ...props }: BounceCircleProps) => {
  const { player, beat } = useContext(MusicContext);
  const controls = useAnimationControls();

  useEffect(() => {
    if (beat) {
      void controls.start(
        { scale: [1, 1.05] },
        { duration: beat.duration / 1000, ease: "easeOut" },
      );
    }
  }, [beat]);

  return (
    <motion.div
      animate={controls}
      className={twMerge(
        "flex h-[400px] w-[400px] flex-col items-center justify-center gap-2 rounded-full bg-pink-500/20",
        className,
      )}
      {...props}
    >
      <p className="mx-[40px] text-2xl font-bold text-slate-900">
        {player?.data.song.name}
      </p>
      <p className="text-xl text-slate-900">{player?.data.song.artist.name}</p>
    </motion.div>
  );
};
