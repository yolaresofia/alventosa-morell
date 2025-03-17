"use client";
import { About as AboutType } from "@/sanity.types";
import { PortableText, PortableTextBlock } from "next-sanity";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AboutProps = {
  block: AboutType;
};

export default function About({ block }: AboutProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<"ca" | "en" | "es">("en"); // Default to English

  // Helper function to get the correct language text, with fallback to English
  const getTranslation = (field: any) => field?.[language] || field?.en || "";

  // Click handler for navigating to homepage
  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactiveElements = ["A", "P", "H1", "H2", "H3", "H4", "H5", "H6", "BUTTON"];

    // If the clicked element is NOT inside text or links, navigate to homepage
    if (!interactiveElements.includes(target.tagName)) {
      router.push("/");
    }
  };

  return (
    <section
      className="relative w-full min-h-screen bg-white text-black px-6 pt-8 pb-16 flex flex-col"
      onClick={handleBackgroundClick}
    >
      <div className="text-2xl font-medium leading-tight">
        <PortableText value={getTranslation(block.aboutText) as PortableTextBlock[]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-sm flex-grow">
        <div>
          <div className="flex flex-col">
            <h2>{getTranslation(block.contact?.titleTranslations)}</h2>
            <a href={`mailto:${block.contact?.email || ""}`}>{block?.contact?.email}</a>
            <a href={`tel:${block.contact?.phone || ""}`}>{block?.contact?.phone}</a>
          </div>

          <h2 className="mt-4">{getTranslation(block.office?.titleTranslations)}</h2>
          <a href={`${block.office?.addressUrl || ""}`}>
            <PortableText value={block.office?.address as PortableTextBlock[]} />
          </a>

          <div className="flex flex-col">
            <h2 className="mt-4">{getTranslation(block.social?.titleTranslations)}</h2>
            <a href={`${block.social?.instagram || ""}`}>Instagram</a>
            <a href={`${block.social?.facebook || ""}`}>Facebook</a>
          </div>

          <p className="text-sm mt-6">Site under construction</p>
        </div>

        <div>
          <h2>{getTranslation(block.team?.titleTranslations)}</h2>
          {block?.team?.coFounders?.map((member) => (
            <div key={member._key} className="py-4">
              <p>{member.name}</p>
              <p>{getTranslation(member.role)}</p>
            </div>
          ))}

          <h2 className="mt-4">{getTranslation(block.team?.teammatesTitleTranslations)}</h2>
          <div className="pb-4">
            {block?.team?.teammates?.map((member) => (
              <div key={member._key}>
                <p>{member.name}</p>
              </div>
            ))}
          </div>

          <h2 className="pb-4">{getTranslation(block.team?.pastTeammatesTitleTranslations)}</h2>
          {block?.team?.pastTeammates?.map((member) => (
            <div key={member._key}>
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-sm flex space-x-2">
        {["ca", "en", "es"].map((lang) => (
          <button
            key={lang}
            className={`cursor-pointer ${language === lang ? "font-bold underline" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setLanguage(lang as "ca" | "en" | "es");
            }}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </section>
  );
}
