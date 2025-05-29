import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200,
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role === 'tenant-admin'
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['tenant-admin', 'super-admin'],
      defaultValue: 'tenant-admin',
    },
    // Plugin will automatically add:
    // - tenant field (for document scoping)
    // - tenants array field (for user-tenant assignments)
  ],
}