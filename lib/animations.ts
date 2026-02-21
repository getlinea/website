/**
 * Micro-animation utilities for subtle, professional UI enhancements
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" },
  medium: { duration: 0.25, ease: "easeInOut" },
  slow: { duration: 0.4, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 300, damping: 25 },
  bounce: { type: "spring", stiffness: 400, damping: 15 }
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: transitions.fast }
};

export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: transitions.fast },
  tap: { scale: 0.98, transition: transitions.fast }
};

export const cardLift = {
  rest: { y: 0, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.2)",
    transition: transitions.medium
  }
};

export const scrollReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: transitions.medium
};
