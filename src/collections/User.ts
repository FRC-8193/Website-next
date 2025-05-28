import type { CollectionConfig } from "payload";

export const User: CollectionConfig = {
  slug: "user",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "role", "createdAt", "updatedAt", "email"],
  },
  auth: true,
  fields: [
    {
      name: "authorName",
      type: "text",
    },
    {
      name: "role",
      type: "text",
    },
  ],
};
