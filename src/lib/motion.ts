import type { Transition, Variants } from "motion/react";

export const springTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

export const gentleTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // Custom cubic bezier
};

export const quickTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

export const fadeInVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: gentleTransition },
  exit: { opacity: 0, y: -12, transition: quickTransition },
};

export const reducedMotionVariants: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};
