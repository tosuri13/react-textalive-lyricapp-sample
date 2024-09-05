import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type AgreementPopupProps = {
  className?: string;
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const AgreementPopup = ({
  className,
  onClick,
  ...props
}: AgreementPopupProps) => {
  return (
    <motion.div
      className={twMerge(
        "flex h-[160px] w-[320px] flex-col items-center justify-center gap-4 rounded-lg bg-white/80 px-6",
        className,
      )}
      initial={{ opacity: 0, x: "-50%", y: "-45%" }}
      animate={{ opacity: 1, x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, x: "-50%", y: "-45%" }}
      transition={{ duration: 0.25 }}
      {...props}
    >
      <p className="text-base text-slate-900">
        このアプリケーションでは音声が流れるため注意してください!!
      </p>
      <button
        className="flex w-[80px] items-center justify-center rounded-lg bg-pink-500 py-2 text-white hover:bg-pink-600"
        onClick={onClick}
      >
        OK!!
      </button>
    </motion.div>
  );
};
