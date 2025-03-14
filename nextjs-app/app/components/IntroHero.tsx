"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IntroHero as IntroHeroType } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

type IntroHeroProps = {
  block: IntroHeroType;
};

export default function IntroHero({ block }: IntroHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const desktopImages = useMemo(() => block.desktopBackgroundImages || [], [block.desktopBackgroundImages]);
  const mobileImages = useMemo(() => block.mobileBackgroundImages || [], [block.mobileBackgroundImages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const images = mobileImages.length > 0 ? mobileImages : desktopImages;
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, mobileImages, desktopImages]);

  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % desktopImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + desktopImages.length) % desktopImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, desktopImages]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const logoElement = document.getElementById("hero-logo");
      if (logoElement && logoElement.contains(e.target as Node)) {
        router.push("/about");
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % desktopImages.length);
      }
    },
    [isMobile, desktopImages.length, router]
  );

  if (!block) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center" onClick={handleClick}>
      <div className="absolute inset-0 w-full h-full hidden md:block">
        {desktopImages.map((img, index) => (
          <Image
            key={index}
            src={urlForImage(img?.image)?.url() as string}
            alt={img.altText || "Background image"}
            fill
            className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="absolute inset-0 w-full h-full block md:hidden">
        {mobileImages.map((img, index) => (
          <Image
            key={index}
            src={urlForImage(img?.image)?.url() as string}
            alt={img.altText || "Background image"}
            fill
            className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Overlay with 15% opacity */}
      <div className="absolute inset-0 bg-black/15"></div>
      
      {block.logo && (
        <div
          id="hero-logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-white text-5xl font-bold cursor-pointer p-3"
          onClick={() => router.push("/about")}
        >
          {block.logo}
        </div>
      )}
    </section>
  );
}
