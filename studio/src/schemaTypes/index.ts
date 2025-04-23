import {page} from './documents/page'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import { introHero } from './objects/introHero'
import { about } from './objects/about'
import { coverImage } from './objects/coverImage'
import { projectSummary } from './objects/projectSummary'
import { diptychImage } from './objects/diptychImage'
import { imageCarousel } from './objects/imageCarousel'
import { textBlock } from './objects/textBlock'
import { projectInfo } from './objects/projectInfo'
import { projectViews } from './objects/projectViews'
import { projectMin } from './objects/projectMin'
import { project } from './documents/project'

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
  coverImage,
  projectSummary,
  diptychImage,
  imageCarousel,
  textBlock,
  projectInfo,
  projectViews,
  projectMin,
  project
]
