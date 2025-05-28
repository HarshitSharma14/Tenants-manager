import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => {
      // Hide Users collection from tenant admins
      return user?.role === 'tenant-admin'
    }
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // If this is a new user creation and no tenant is specified
        if (operation === 'create' && data.tenantName && !data.tenant) {
          const payload = req.payload

          // Create tenant first
          const tenant = await payload.create({
            collection: 'tenants',
            data: {
              name: data.tenantName,
              slug: data.tenantName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }
          })

          // Assign tenant to user
          data.tenant = tenant.id
          delete data.tenantName // Remove the temporary field
        }

        return data
      }
    ]
  },
  fields: [
    {
      name: 'tenantName',
      type: 'text',
      admin: {
        condition: (data, siblingData, { user }) => {
          // Only show this field during user creation for new signups
          return !user // Only show when no user is logged in (signup)
        }
      }
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      admin: {
        condition: (data, siblingData, { user }) => {
          return Boolean(user) // Only show when user is logged in
        }
      }
    },
    {
      name: 'role',
      type: 'select',
      options: ['tenant-admin', 'super-admin'], // Added super-admin option
      defaultValue: 'tenant-admin',
      admin: {
        readOnly: true
      }
    },
  ],
}