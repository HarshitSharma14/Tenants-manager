import type { CollectionConfig } from 'payload'

const tenantAccess = ({ req: { user } }: { req: { user: any } }) => {
    if (!user) return false
    return {
        tenant: { equals: user.tenant }
    }
}

export const Forms: CollectionConfig = {
    slug: 'forms',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: tenantAccess,
        create: ({ req: { user } }) => Boolean(user),
        update: tenantAccess,
        delete: tenantAccess,
    },
    fields: [
        {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
            defaultValue: ({ user }) => (user as any)?.tenant,
        },
        {
            name: 'title',
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
            name: 'fields',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'type',
                    type: 'select',
                    options: ['text', 'email', 'textarea'],
                    required: true,
                },
                {
                    name: 'required',
                    type: 'checkbox',
                    defaultValue: false,
                },
            ],
        },
    ],
}