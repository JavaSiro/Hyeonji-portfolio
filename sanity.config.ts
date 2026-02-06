'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: 'b7om90c3',
  dataset: 'production',
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2024-02-06'}),
  ],
})
