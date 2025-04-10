import type { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { Page as PageType } from "@/sanity.types";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "project" && defined(slug.current)]{ slug }`
  );

  return slugs.map((p: any) => ({
    slug: p.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  return {
    title: page?.title,
    description: page?.category,
  };
}

export default async function ProjectPage({ params }: Props) {
  const page = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!page?._id) notFound();

  return (
    <div>
      <Head>
        <title>{page.title}</title>
      </Head>
      <PageBuilderPage page={page as PageType} />
    </div>
  );
}
