import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    // "owner/nome": habilita metadados do GitHub no build (estrelas, linguagem).
    repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/).optional(),
    // Projeto privado ou corporativo: sem link de repositório.
    private: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    // Com `url`: aponta para a publicação original. Sem `url`: o corpo vira página no site.
    url: z.url().optional(),
    source: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const socials = defineCollection({
  loader: file('src/data/socials.yaml'),
  schema: z.object({
    label: z.string(),
    handle: z.string(),
    url: z.url(),
    icon: z.string(),
    group: z.enum(['pessoal', 'comunidade']),
    highlight: z.boolean().default(false),
    order: z.number(),
  }),
});

const expertise = defineCollection({
  loader: file('src/data/expertise.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    evidence: z.string(),
    order: z.number(),
  }),
});

export const collections = { projects, writing, socials, expertise };
