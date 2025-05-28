import type { CollectionConfig } from 'payload'

const tenantAccess = ({ req: { user } }) => {
  if (!user) return false
  return {
    tenant: { equals: user.tenant }
  }
}

export const Forms: CollectionConfig = {
  slug: 'forms',
  labels: {
    singular: 'Form',
    plural: 'My Forms'
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isActive', 'createdAt'],
    group: 'Form Builder',
    description: 'Create and manage your forms'
  },
  access: {
    read: tenantAccess,
    create: ({ req: { user } }) => Boolean(user?.role === 'tenant-admin'),
    update: tenantAccess,
    delete: tenantAccess,
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      defaultValue: ({ user }) => user?.tenant,
      admin: {
        hidden: true
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Form Settings',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'The name of your form (e.g., "Contact Us", "Lead Generation")'
              }
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL-friendly version (e.g., "contact-us"). This will be used in your public form URL.'
              }
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Optional description that appears at the top of your form'
              }
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Uncheck to temporarily disable form submissions'
              }
            },
            {
              name: 'successMessage',
              type: 'textarea',
              defaultValue: 'Thank you for your submission! We will get back to you soon.',
              admin: {
                description: 'Message shown to users after successful form submission'
              }
            }
          ]
        },
        {
          label: 'Form Fields',
          fields: [
            {
              name: 'fields',
              type: 'array',
              label: 'Form Fields',
              labels: {
                singular: 'Field',
                plural: 'Fields'
              },
              minRows: 1,
              admin: {
                description: 'Add and configure the fields for your form. Drag to reorder!'
              },
              fields: [
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                  admin: {
                    description: 'Field display order (must be unique)'
                  },
                  validate: (value, { data, siblingData, operation }) => {
                    // Ensure order is a valid number
                    if (value === null || value === undefined || isNaN(value)) {
                      return 'Order must be a number'
                    }
                    
                    // Check for duplicate orders in the same form
                    if (operation === 'create' || operation === 'update') {
                      const currentFields = data?.fields || []
                      const duplicateOrder = currentFields.find((field, index) => {
                        return field !== siblingData && field?.order === value
                      })
                      
                      if (duplicateOrder) {
                        return 'Each field must have a unique order number'
                      }
                    }
                    
                    return true
                  }
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '50%',
                        description: 'Label shown to users'
                      }
                    },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '50%',
                        description: 'Field name (no spaces, lowercase)'
                      },
                      validate: (value) => {
                        if (!value) return 'Field name is required'
                        if (!/^[a-z][a-z0-9_]*$/i.test(value)) {
                          return 'Field name must start with a letter and contain only letters, numbers, and underscores'
                        }
                        return true
                      }
                    }
                  ]
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: 'Short Text', value: 'text' },
                        { label: 'Email Address', value: 'email' },
                        { label: 'Phone Number', value: 'tel' },
                        { label: 'Long Text/Message', value: 'textarea' },
                        { label: 'Number', value: 'number' },
                        { label: 'Website URL', value: 'url' },
                        { label: 'Date', value: 'date' },
                      ],
                      required: true,
                      admin: {
                        width: '50%'
                      }
                    },
                    {
                      name: 'required',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        width: '50%'
                      }
                    }
                  ]
                },
                {
                  name: 'placeholder',
                  type: 'text',
                  admin: {
                    description: 'Placeholder text shown inside the field'
                  }
                },
                {
                  name: 'helpText',
                  type: 'text',
                  admin: {
                    description: 'Help text shown below the field'
                  }
                },
                {
                  name: 'width',
                  type: 'select',
                  options: [
                    { label: 'Full Width', value: 'full' },
                    { label: 'Half Width', value: 'half' },
                  ],
                  defaultValue: 'full',
                  admin: {
                    description: 'Field width in the form'
                  }
                }
              ]
            }
          ]
        },
        {
          label: 'Form Styling',
          fields: [
            {
              name: 'styling',
              type: 'group',
              fields: [
                {
                  name: 'theme',
                  type: 'select',
                  options: [
                    { label: 'Clean White', value: 'clean' },
                    { label: 'Modern Dark', value: 'dark' },
                    { label: 'Colorful', value: 'colorful' }
                  ],
                  defaultValue: 'clean'
                },
                {
                  name: 'submitButtonText',
                  type: 'text',
                  defaultValue: 'Submit',
                  admin: {
                    description: 'Text on the submit button'
                  }
                },
                {
                  name: 'submitButtonColor',
                  type: 'select',
                  options: [
                    { label: 'Blue', value: 'blue' },
                    { label: 'Green', value: 'green' },
                    { label: 'Red', value: 'red' },
                    { label: 'Purple', value: 'purple' }
                  ],
                  defaultValue: 'blue'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-assign order numbers if not set
        if (data.fields && Array.isArray(data.fields)) {
          data.fields.forEach((field, index) => {
            if (field.order === null || field.order === undefined || isNaN(field.order)) {
              field.order = index
            }
          })
          
          // Sort fields by order
          data.fields.sort((a, b) => (a.order || 0) - (b.order || 0))
        }
        return data
      }
    ]
  }
}