import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    // Show the employer and role dates from src/data/profile.ts under the title.
    showDates: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/papers' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      venue: z.string(),
      year: z.number().int(),
      authors: z.string(),
      order: z.number().int(),
      // A featured paper gets its own block with the summary in the body.
      featured: z.boolean().default(false),
      links: z.object({
        paper: z.url(),
        video: z.url().optional(),
      }),
      thumbnail: image().optional(),
      thumbnailAlt: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    order: z.number().int(),
    repo: z.url(),
    description: z.string(),
    // Only public repositories are listed. A project stays hidden until it is.
    visible: z.boolean(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writing' }),
  schema: z.discriminatedUnion('status', [
    z.object({
      status: z.literal('coming-soon'),
      title: z.string(),
      teaser: z.string(),
      order: z.number().int(),
    }),
    z.object({
      status: z.literal('published'),
      title: z.string(),
      teaser: z.string(),
      order: z.number().int(),
      published: z.coerce.date(),
    }),
  ]),
});

export const collections = { work, papers, projects, writing };
