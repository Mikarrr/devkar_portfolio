import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { revalidateProject, revalidateDelete } from './hooks/revalidateProject'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł projektu',
    },
    ...slugField(),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Kategoria',
      hasMany: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Krótki opis',
      required: false,
    },
    {
      name: 'imageWeb',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie główne',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Galeria zdjęć',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologie',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'Link do projektu',
      required: false,
    },
    {
      name: 'github',
      type: 'text',
      label: 'Link do GitHub',
      required: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data publikacji',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
