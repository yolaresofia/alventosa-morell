import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getHomepageQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
  const homepage = await client.fetch(getHomepageQuery);
  const projects = homepage?.featuredProjects || [];

  if (!projects.length) {
    return <div>No featured projects</div>;
  }

  return (
    <section className="w-full overflow-x-auto whitespace-nowrap pb-12">
      <div className="flex">
        {projects.map((project: any) => {
          const imageUrl = project.thumbnail
            ? urlForImage(project.thumbnail)?.url()
            : null;

          if (!project.slug?.current || !imageUrl) return null;

          return (
            <Link
              href={`/projects/${project.slug.current}`}
              key={project.slug.current}
              className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 30vw"
                />
              </div>

              <div className="mt-2 text-sm font-medium leading-tight flex">
                <div className="pr-4">{project.projectNumber}</div>
                <div>{project.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
