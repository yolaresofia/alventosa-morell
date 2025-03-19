"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    setShowContent(false);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setIsAnimating(false);
              setShowContent(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
