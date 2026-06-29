import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    type: z.enum([
      'Hybrid OR Installation',
      'Hybrid OR Integration',
      'Multi-Suite Upgrade',
      'Boom System Install',
      'Emergency Service',
      'Emergency Department Outfitting',
      'Preventive Maintenance',
      'Equipment Fleet',
      'OR Integration',
      'Full Campus Build-Out',
      'Full Hospital Build-Out',
      'Full Surgical Suite Build-Out',
      'Ambulatory Surgical Suite Build-Out',
      'Specialty Surgical Suite Build-Out',
      'Surgical Suite Build-Out',
      'LDRP Suite Installation',
      'Catheterization Laboratory Build-Out',
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
