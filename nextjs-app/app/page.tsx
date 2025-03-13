import { client } from "@/sanity/lib/client";
import BlockRenderer from "./components/BlockRenderer";
import IntroHero from "./components/IntroHero";

export default async function Page() {
  //refactor this
  const [page] = await client.fetch(
    '*[_type == "page" && slug.current == "/"]'
  );
  return (
    <div>
      {page?.pageBuilder?.map((block: any, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  );
}
