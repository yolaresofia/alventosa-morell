import Image from "next/image";
import { MainHero as MainHeroType } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { stegaClean } from "next-sanity";

type MainHeroProps = {
  block: MainHeroType;
  index: number;
};

export default function MainHero({ block }: MainHeroProps) {
  if (!block) return null;

  return (
    <section className="flex items-center justify-center text-white" data-section={block?.theme}>
      {/* DO NOT REMOVE THIS COMMENT */}
      {/* replace img tags with next image component */}
      <div
        className="relative bg-cover bg-center w-full h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${urlForImage(block?.backgroundImage)?.url() as string})`,
        }}
        role="img"
        aria-label={stegaClean(block?.backgroundImageAltText as string) || ""}
      >
        <img
          className="absolute max-w-full md:w-[1300px] w-72"
          src={urlForImage(block?.logo)?.url() as string}
          alt={stegaClean(block?.logoAltText as string) || ""}
        />
      </div>
    </section>
  );
}
