"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import { ProjectViews as ProjectViewsType } from "@/sanity.types";

type ProjectViewsProps = {
  block: ProjectViewsType;
};

export const ProjectsViews = ({ block }: ProjectViewsProps) => {
  return (
    <section className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {block.projects?.map((project, index) => {
          const imageUrl = project.miniaturePhoto
            ? urlForImage(project.miniaturePhoto)?.url()
            : null;

          const slug = project?.slug; // ✅ flat field thanks to query

          if (!slug || !imageUrl) return null;

          return (
            <Link
              href={`/projects/${slug}`}
              key={project._key || index}
              className="group text-black hover:text-neutral-600"
            >
              <div className="w-full aspect-[4/5] relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Miniatura de ${project.projectName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 text-sm font-medium leading-tight">
                <div>{project.projectNumber}</div>
                <div>{project.projectName}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
