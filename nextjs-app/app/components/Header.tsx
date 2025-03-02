"use client";

import { useState } from "react";
import Link from "next/link";
import { SettingsQueryResult, Settings as SettingsType } from "@/sanity.types";
import { PortableText, PortableTextBlock } from "next-sanity";
import DynamicHeader from "./DynamicHeader";
import MenuIcon from "./MenuIcon";
import MobileMenu from "./MobileMenu";
import ReservationModal from "./ReservationModal";

type HeaderProps = {
  block: SettingsQueryResult | null;
};

export default function Header({ block }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleOpenModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };

  if (!block) return null;

  return (
    <div>
      <header className="lg:hidden flex justify-between w-full fixed top-8 left-0 px-8 items-center z-50">
        <DynamicHeader />
        <button onClick={toggleMenu} aria-label="Toggle menu">
          <MenuIcon width={40} height={22} color="#712538" isOpen={isMenuOpen} />
        </button>
      </header>

      {isMenuOpen && (
        <MobileMenu block={block} onClose={toggleMenu} onOpenModal={handleOpenModal} />
      )}

      <header className="fixed top-0 left-0 lg:flex hidden items-center text-base justify-between px-10 py-8 bg-transparent z-50 w-full font-teachers transition-colors duration-300">
        <DynamicHeader />

        <div className="flex w-1/2">
          <div className="text-left pr-24 leading-tight">
            <PortableText
              value={
                block?.mainNavigation?.secondColumnNav as PortableTextBlock[]
              }
            />
          </div>
          <div className="text-left leading-tight">
            <PortableText
              value={
                block?.mainNavigation?.thirdColumnNav as PortableTextBlock[]
              }
            />
          </div>
        </div>

        <nav className="flex justify-end gap-8 w-1/2 font-semibold">
          {block?.mainNavigation?.navLinks?.map((link, i) => {
            if (!link) return null;

            const isExternalLink = link?.href?.startsWith("http");

            if (link.linkType === "href" && link.openType === "modal") {
              return (
                <button
                  key={i}
                  onClick={() => handleOpenModal(link?.href as string)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.urlTitle || "Untitled Link"}
                </button>
              );
            }

            if (link.linkType === "href") {
              return isExternalLink ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.urlTitle || "Untitled Link"}
                </a>
              ) : (
                <Link
                  key={i}
                  href={link.href || ""}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.urlTitle || "Untitled Link"}
                </Link>
              );
            }

            if (link.linkType === "page" && link?.page?.slug?.current) {
              return (
                <Link
                  key={i}
                  href={`/${link.page.slug.current}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.page.name || "Untitled Page"}
                </Link>
              );
            }
            return null;
          })}
        </nav>
      </header>


      {isModalOpen && modalUrl && (
        <ReservationModal
          isOpen={isModalOpen}
          url={modalUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
