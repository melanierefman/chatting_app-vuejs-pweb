import { CollectionConfig } from 'payload/types'

const Members: CollectionConfig = {
  slug: 'members',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  ],
}

export default Members
