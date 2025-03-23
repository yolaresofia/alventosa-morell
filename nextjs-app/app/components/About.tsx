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
  const [language, setLanguage] = useState<"ca" | "en" | "es">("ca");

  const getTranslation = (field: any) => field?.[language] || field?.en || "";

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactiveElements = [
      "A",
      "P",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "BUTTON",
    ];

    if (!interactiveElements.includes(target.tagName)) {
      router.push("/");
    }
  };

  const availableLanguages = ["ca", "en", "es"].filter(
    (lang) => lang !== language
  );

  return (
    <section
      className="relative w-full min-h-screen bg-white text-black px-6 pt-8 pb-16 flex flex-col"
      onClick={handleBackgroundClick}
    >
      <div className="md:text-2xl text-lg font-medium leading-tight md:pb-24">
        <PortableText
          value={getTranslation(block.aboutText) as PortableTextBlock[]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-sm flex-grow">
        <div className="col-span-1">
          <div className="flex flex-col">
            <h2>{getTranslation(block.contact?.titleTranslations)}</h2>
            <a href={`mailto:${block.contact?.email || ""}`}>
              {block?.contact?.email}
            </a>
            <a href={`tel:${block.contact?.phone || ""}`}>
              {block?.contact?.phone}
            </a>
          </div>

          <h2 className="mt-4">
            {getTranslation(block.office?.titleTranslations)}
          </h2>
          <a href={`${block.office?.addressUrl?.href || ""}`} target="_blank">
            <PortableText
              value={block.office?.address as PortableTextBlock[]}
            />
          </a>

          <div className="flex flex-col py-4">
            <a href={`${block.social?.instagram?.href || ""}`} target="_blank">
              {block.social?.instagram?.urlTitle}
            </a>
          </div>
          <div className="text-sm">
            <PortableText
              value={getTranslation(block?.aboutInfo) as PortableTextBlock[]}
            />
          </div>
        </div>

        <div className="col-span-1">
          <h2>{getTranslation(block.team?.titleTranslations)}</h2>
          {block?.team?.coFounders?.map((member) => (
            <div key={member._key} className="py-4">
              <p>{member.name}</p>
              <p>{getTranslation(member.role)}</p>
            </div>
          ))}

          <h2 className="mt-4">
            {getTranslation(block.team?.teammatesTitleTranslations)}
          </h2>
          <div className="pb-4">
            {block?.team?.teammates?.map((member) => (
              <div key={member._key}>
                <p>{member.name}</p>
              </div>
            ))}
          </div>

          <h2 className="pb-4">
            {getTranslation(block.team?.pastTeammatesTitleTranslations)}
          </h2>
          {block?.team?.pastTeammates?.map((member) => (
            <div key={member._key}>
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-sm flex space-x-2">
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setLanguage(availableLanguages[0] as "ca" | "en" | "es");
          }}
        >
          {availableLanguages[0].toUpperCase()}
        </button>

        <span>/</span>

        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setLanguage(availableLanguages[1] as "ca" | "en" | "es");
          }}
        >
          {availableLanguages[1].toUpperCase()}
        </button>
      </div>
    </section>
  );
}
