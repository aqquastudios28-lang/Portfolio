"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: {
    hidden: { y: number; opacity: number; filter: string };
    visible: { y: number; opacity: number; filter: string };
  };
}

export function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { y: 12, opacity: 0, filter: "blur(6px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  },
  className,
}: WordFadeInProps) {
  const _words = words.split(" ");

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      className={cn("inline-block", className)}
    >
      {_words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={variants}
          transition={{
            duration: 0.45,
            delay: i * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.28em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
