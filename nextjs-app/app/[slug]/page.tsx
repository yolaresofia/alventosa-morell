import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";
import { client } from "@/sanity/lib/client";

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const page = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug }
  );

  return {
    title: page?.title || "Projecte",
    description: page?.title || "",
  };
}

export default async function Page(props: Props) {
  const params = props.params;
  if (params.slug === "404") return null;
  if (params.slug === "500") return null;

  const page = await client.fetch(
    '*[_type == "page" && slug.current == $slug][0]',
    { slug: params.slug }
  );

  return (
    <div
      className={`bg-[${page?.pageBackgroundColor?.hex}]`}
    >
      <Head>
        <title>{page.heading}</title>
      </Head>
      <PageBuilderPage page={page as PageType} />
    </div>
  );
}
