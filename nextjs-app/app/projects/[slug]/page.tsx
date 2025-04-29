import type { Metadata } from "next";
import PageBuilderPage from "@/app/components/PageBuilder";
import { client } from "@/sanity/lib/client";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "project" && defined(slug.current)]{
      "slug": slug.current
    }`
  );

  return slugs.map((s: { slug: string }) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  return {
    title: project?.title || "Projecte",
    description: project?.title || "",
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="bg-white">
      <PageBuilderPage page={project} />
    </div>
  );
}
