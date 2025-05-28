import type { CollectionConfig } from 'payload'

const tenantAccess = ({ req: { user } }) => {
    if (!user) return false
    return {
        tenant: { equals: user.tenant }
    }
}

export const FormSubmissions: CollectionConfig = {
    slug: 'form-submissions',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        read: tenantAccess,
        create: () => true, // Public can submit
        update: () => false,
        delete: tenantAccess,
    },
    fields: [
        {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
        },
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
        },
        {
            name: 'submissionData',
            type: 'json',
            required: true,
        },
        {
            name: 'submittedAt',
            type: 'date',
            defaultValue: () => new Date(),
        },
    ],
}