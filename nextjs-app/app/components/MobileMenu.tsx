"use client";

import { useEffect, useState } from "react";
import { SettingsQueryResult } from "@/sanity.types";
import MenuIcon from "./MenuIcon";
import Image from "next/image";
import { PortableText } from "next-sanity";
import Link from "next/link";

type MobileMenuProps = {
  block: SettingsQueryResult;
  onClose: () => void;
  onOpenModal: (url: string) => void; // New function to handle modal opening
};

export default function MobileMenu({
  onClose,
  block,
  onOpenModal,
}: MobileMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsAnimating(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 300);
  };

  const handleModalClick = (url: string) => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      onOpenModal(url);
    }, 300);
  };

  if (!block) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#F8F6F2] flex flex-col justify-between p-8 z-50 font-teachers 
        transition-transform duration-300 ${isAnimating && !isExiting ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-start">
        <Link href="/">
          <Image
            // @ts-ignore
            src={block?.mainNavigation?.darkLogo?.url as string}
            alt="Logo"
            width={150}
            height={50}
            className="rounded-xl md:pr-20 w-auto h-auto transition-opacity duration-300"
          />
        </Link>
        <button onClick={handleClose} aria-label="Close menu">
          <MenuIcon width={26} height={25} color={"#712538"} isOpen={true} />
        </button>
      </div>

      <nav className="flex flex-col items-end space-y-8 text-[#541B1E] text-5xl">
        {block?.mainNavigation?.navLinks?.map((link, i) => {
          if (!link) return null;
          if (link.linkType === "href" && link.openType === "modal") {
            return (
              <button
                key={i}
                onClick={() => handleModalClick(link.href as string)}
                className="hover:opacity-70 transition-opacity"
              >
                {link.urlTitle || "Untitled Link"}
              </button>
            );
          }
          return (
            <a
              key={i}
              href={
                // @ts-ignore
                link?.linkType === "navLink"
                  ? // @ts-ignore
                    `/${link?.navLink}`
                  : // @ts-ignore
                    `/${link?.page?.slug?.current}`
              }
              className="hover:opacity-70 transition-opacity"
              onClick={handleClose}
            >
              {/* @ts-ignore */}
              {link?.linkType === "navLink" ? link?.navLink : link?.page?.name}
              {link.urlTitle ?? ""}
            </a>
          );
        })}
      </nav>

      <div className="text-right text-[#541B1E] pb-12">
        <PortableText value={block.footer?.secondColumnFooter as any} />
      </div>
    </div>
  );
}
