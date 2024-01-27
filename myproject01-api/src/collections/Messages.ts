import { CollectionConfig } from 'payload/types';

const Messages: CollectionConfig = {
  slug: 'userMessages',
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
    {
      name: "user",
      type: "relationship",
      relationTo: "members",
      hasMany: false,
      required: true,
    },
    {
      name: "friend",
      type: "relationship",
      relationTo: "members",
      hasMany: false,
      required: true,
    },
    {
      name: 'messages',
      label: 'Messages',
      type: 'text',
      required: true,
    }
  ],
};

export default Messages;

