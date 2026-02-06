import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'b7om90c3',
  dataset: 'production',
  apiVersion: '2024-02-06',
  useCdn: false,
})
