import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    type: z.enum([
      'Hybrid OR Installation',
      'Multi-Suite Upgrade',
      'Boom System Install',
      'Emergency Service',
      'Preventive Maintenance',
      'Equipment Fleet',
      'OR Integration',
    ]),
    facility: z.string(),
    location: z.string(),
    value: z.string(),
    year: z.number().optional(),
    status: z.enum(['Completed', 'Active', 'Ongoing']),
    equipment: z.array(z.string()),
    scope: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    featured: z.boolean().default(false),
    disclaimer: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
