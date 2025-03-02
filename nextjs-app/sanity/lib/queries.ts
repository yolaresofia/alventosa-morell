import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
    ...,
      mainNavigation {
        ...,
      "darkLogo": darkLogo.asset->,
      "lightLogo": lightLogo.asset->,
      navLinks[]{
        ...,
        page->}
    },
  }`);

const linkFields = `
  link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
      }
  }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    pageBackgroundColor,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        ${linkFields},
      },
      _type == "mainHero" => {
        ...
      }
    },
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
