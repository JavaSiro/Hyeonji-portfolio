export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-06'

// We are hardcoding these to ensure the build never fails
export const dataset = 'production'
export const projectId = 'b7om90c3'

export const useCdn = false