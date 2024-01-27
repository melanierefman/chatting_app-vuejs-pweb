import { CollectionConfig } from 'payload/types'

const Friends: CollectionConfig = {
  slug: 'friends',
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
      name : "name",
      label : "Name",
      type : "text",
      required : true
    },
    {
      name : "phone_number",
      label : "Phone Number",
      type : "text",
      required : true
    }
  ],
}

export default Friends


