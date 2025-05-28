import type { CollectionConfig } from "payload";

export const Tag: CollectionConfig = {
  slug: "tag",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
