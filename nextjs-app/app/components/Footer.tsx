/* eslint-disable @next/next/no-img-element */
import { SettingsQueryResult, Settings as SettingsType } from "@/sanity.types";
import Link from "next/link";
import { PortableText, PortableTextBlock } from "next-sanity";

type FooterProps = {
  block: SettingsQueryResult | null;
};

export default function Footer({ block }: FooterProps) {
  if (!block) return null;

  return (
    <footer className="text-[#ECE8E2] flex flex-col space-y-4 lg:grid grid-cols-5 gap-4 items-start text-base justify-between pb-40 pt-20 lg:px-20 px-8 bg-[#712538] z-50 w-full font-teachers border-t border-[#ECE8E2]">
      <Link href="/">
        <img
          src={block?.mainNavigation?.lightLogo?.url as string}
          alt="alttext"
          className="lg:w-1/3 h-auto"
        />
      </Link>
      <div className="text-left">
        <PortableText
          value={block.footer?.secondColumnFooter as PortableTextBlock[]}
        />
      </div>
      <div className="text-left">
        <PortableText
          value={block.footer?.thirdColumnFooter as PortableTextBlock[]}
        />
      </div>
      <div className="text-left">
        <PortableText
          value={block.footer?.fourthColumnFooter as PortableTextBlock[]}
        />
      </div>
      <div className="text-left">
        <PortableText
          value={block.footer?.fifthColumnFooter as PortableTextBlock[]}
        />
      </div>
    </footer>
  );
}
