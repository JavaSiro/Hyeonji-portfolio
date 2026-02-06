import { type SchemaTypeDefinition } from 'sanity'

import { actressProfileType } from './actressProfileType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { creditsType } from './creditsType'
import { galleryType } from './galleryType'
import { newsType } from './newsType'
import { postType } from './postType'
import { authorType } from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    actressProfileType,
    blockContentType,
    categoryType,
    creditsType,
    galleryType,
    newsType,
    postType,
    authorType,
  ],
}
