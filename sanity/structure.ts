import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.documentTypeListItem('actressProfile').title('Actress Profile'),
      S.divider(),
      S.documentTypeListItem('gallery').title('Gallery'),
      S.documentTypeListItem('credits').title('Credits'),
      S.documentTypeListItem('news').title('News'),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['actressProfile', 'gallery', 'credits', 'news', 'post', 'category', 'author'].includes(
            item.getId()!
          )
      ),
    ])
