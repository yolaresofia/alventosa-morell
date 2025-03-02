"use client";

import { useState } from "react";
import Link from "next/link";
import { InfoWithCTA as InfoWithCTAType } from "@/sanity.types";
import { PortableText, PortableTextBlock } from "next-sanity";
import Button from "./Button";
import ReservationModal from "./ReservationModal";

type InfoWithCTAProps = {
  block: InfoWithCTAType;
  index: number;
};

export default function InfoWithCTA({ block }: InfoWithCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!block) return null;

  const cta = block?.cta?.link;

  const handleClick = () => {
    if (cta?.openType === "modal") {
      setIsModalOpen(true);
    }
  };

  const isExternalLink = cta?.href?.startsWith("http");

  return (
    <section
      className={`lg:grid lg:grid-cols-12 pt-${block?.paddingT} pb-${block?.paddingB} text-[${block?.textColor?.hex}] md:px-20 px-5`}
      data-section={block?.theme}
    >
      <div className="text-3xl col-span-6 pb-96 lg:pb-0 font-semibold">
        <PortableText value={block.firstColumnText as PortableTextBlock[]} />
      </div>
      <div className="text-base col-span-5 pb-12 lg:pb-0 font-semibold">
        <PortableText value={block.secondColumnText as PortableTextBlock[]} />
      </div>
      <div className="col-span-1">
        {cta && (
          <>
            {cta.openType === "newTab" && cta.href ? (
              isExternalLink ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button buttonText={block?.cta?.text as string} variant={block?.cta?.variant} />
                </a>
              ) : (
                <Link href={cta.href}>
                  <Button buttonText={block?.cta?.text as string} variant={block?.cta?.variant} />
                </Link>
              )
            ) : (
              <Button
                buttonText={block?.cta?.text as string}
                variant={block?.cta?.variant}
                onClick={handleClick}
              />
            )}
          </>
        )}
      </div>
      
      {isModalOpen && <ReservationModal isOpen={isModalOpen} url={cta?.href} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
