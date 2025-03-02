import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  if (params.slug === "404") return null;
  if (params.slug === "500") return null;

  // use params.slug to fetch the page data
  const page = await client.fetch(
    '*[_type == "page" && slug.current == $slug][0]',
    { slug: params.slug }
  );

  if (!page?._id) redirect("/");
  return (
    <div
      className={`font-teachers bg-[${page.pageBackgroundColor.hex}]`}
    >
      <Head>
        <title>{page.heading}</title>
      </Head>
      <PageBuilderPage page={page as PageType} />
    </div>
  );
}
