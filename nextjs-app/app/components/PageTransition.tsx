"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigate = (url: string) => {
    if (isAnimating) return; // Prevent multiple clicks
    setIsAnimating(true);

    setTimeout(() => {
      router.push(url);
    }, 900); // Transition duration before navigation
  };

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 900);
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

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 bg-white z-50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Click anywhere except text to navigate back */}
      {!isAnimating && pathname === "/about" && (
        <div
          className="fixed inset-0 z-10"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a, p, h1, h2, h3, h4, h5, h6")) return;
            handleNavigate("/");
          }}
        />
      )}
    </>
  );
}
