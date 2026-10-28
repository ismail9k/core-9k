import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        repo: z.string().optional(),
        demo: z.string().optional(),
        image: z.string().optional(),
        order: z.number().default(0),
      }),
    }),
  },
})
