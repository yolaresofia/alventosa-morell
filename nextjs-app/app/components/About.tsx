"use client";
import { About as AboutType } from "@/sanity.types";
import { PortableText, PortableTextBlock } from "next-sanity";
import { useRouter } from "next/navigation";

type AboutProps = {
  block: AboutType;
};

export default function About({ block }: AboutProps) {
  const router = useRouter();
  return (
    <section className="relative w-full min-h-screen bg-white text-black px-6 pt-8 pb-16 flex flex-col">
      <div className="text-2xl font-medium leading-tight">
        <PortableText value={block.aboutText as PortableTextBlock[]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-sm flex-grow">
        <div>
          <div className="flex flex-col">
            <h2>Contact</h2>
            <a href={`mailto:${block.contact?.email || ""}`}>
              {block?.contact?.email}
            </a>
            <a href={`tel:${block.contact?.phone || ""}`}>
              {block?.contact?.phone}
            </a>
          </div>

          <h2 className="mt-4">Office</h2>
          <a href={`${block.office?.addressUrl || ""}`}>
            <PortableText
              value={block.office?.address as PortableTextBlock[]}
            />
          </a>

          <div className="flex flex-col">
            <h2 className="mt-4">Social</h2>
            <a href={`${block.social?.instagram || ""}`}>Instagram</a>
            <a href={`${block.social?.facebook || ""}`}>Facebook</a>
          </div>

          <p className="text-sm mt-6">Site under construction</p>
        </div>

        <div>
          <h2>Team</h2>
          {block?.team?.coFounders?.map((member) => (
            <div key={member._key} className="py-4">
              <p>{member.name}</p>
              <p>{member.role}</p>
            </div>
          ))}
          <div className="pb-4">
            {block?.team?.teammates?.map((member) => (
              <div key={member._key}>
                <p>{member.name}</p>
              </div>
            ))}
          </div>

          <h2 className="pb-4">Han format part de l&lsquo;equip</h2>
          {block?.team?.pastTeammates?.map((member) => (
            <div key={member._key}>
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-sm">
        <p>CA / EN</p>
      </div>
      <div
        className="absolute inset-0 z-10"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, p, h1, h2, h3, h4, h5, h6"))
            return;
          router.push("/");
        }}
      />
    </section>
  );
}
