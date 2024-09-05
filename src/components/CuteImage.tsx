import { motion, MotionProps, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { HTMLAttributes, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export type CuteImageProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const CuteImage = ({ className, ...props }: CuteImageProps) => {
  const { beat } = useContext(MusicContext);
  const controls = useAnimationControls();

  useEffect(() => {
    if (beat) {
      if (beat.index % 2 == 0) {
        void controls.start(
          { rotate: [2, 0, -2] },
          { duration: beat.duration / 1000, ease: "linear" },
        );
      } else {
        void controls.start(
          { rotate: [-2, 0, 2] },
          { duration: beat.duration / 1000, ease: "linear" },
        );
      }
    }
  }, [beat]);

  return (
    <motion.div
      animate={controls}
      initial={{ rotate: 0 }}
      className={twMerge("w-[400px]", className)}
      {...props}
    >
      <Image
        className="h-auto w-full"
        alt="可愛い画像"
        src="/cute-image.png"
        width={406}
        height={1348}
      />
    </motion.div>
  );
};
