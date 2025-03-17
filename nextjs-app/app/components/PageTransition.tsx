"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigate = (url: string) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      router.push(url);
    }, 400);
  };

  useEffect(() => {
    setIsAnimating(true);

    setTimeout(() => setIsAnimating(false), 400);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      {!isAnimating && pathname === "/about" && (
        <div
          className="fixed inset-0"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, p, h1, h2, h3, h4, h5, h6, button")) return;
            handleNavigate("/");
          }}
        />
      )}
    </>
  );
}
