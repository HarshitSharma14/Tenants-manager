// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tenants } from './collections/Tenants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterLogin: [
        '/components/SignupButton'
      ]
    }
  },
  collections: [
    Tenants, // Must include tenants collection
    Users,
    Media
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),

    // Multi-tenant plugin FIRST
    multiTenantPlugin({
      collections: {
        users: {
          useTenantAccess: true,
          useBaseListFilter: true,
        },
        forms: {
          useTenantAccess: true,
          useBaseListFilter: true,
        },
        'form-submissions': {
          useTenantAccess: true,
          useBaseListFilter: true,
        },
      },
    }),

    // Form Builder plugin SECOND
    formBuilderPlugin({
      formOverrides: {
        admin: {
          group: 'Form Builder'
        }
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Form Builder'
        }
      }
    })
  ],
})