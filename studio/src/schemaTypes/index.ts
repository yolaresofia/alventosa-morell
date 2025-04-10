import {page} from './documents/page'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import { introHero } from './objects/introHero'
import { about } from './objects/about'
import { project } from './documents/project'
import { coverImage } from './objects/coverImage'
import { projectSummary } from './objects/projectSummary'
import { diptychImage } from './objects/diptychImage'
import { imageCarousel } from './objects/imageCarousel'
import { textBlock } from './objects/textBlock'
import { projectInfo } from './objects/projectInfo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  // Objects
  blockContent,
  link,
  introHero,
  about,
  project,
  coverImage,
  projectSummary,
  diptychImage,
  imageCarousel,
  textBlock,
  projectInfo
]
