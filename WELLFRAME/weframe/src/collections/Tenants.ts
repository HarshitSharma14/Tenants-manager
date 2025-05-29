import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    admin: {
        useAsTitle: 'name',
        hidden: ({ user }) => user?.role === 'tenant-admin' // Hide from tenant admins
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'domain',
            type: 'text',
            admin: {
                description: 'Optional domain for this tenant'
            }
        }
    ],
}