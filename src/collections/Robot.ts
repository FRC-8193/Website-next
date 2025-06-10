import type { CollectionConfig } from "payload";

export const Robot: CollectionConfig = {
  slug: "robot",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "year",
      type: "text",
      required: true,
    },
    {
      name: "game",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "features",
      type: "array",
      required: true,
      fields: [
        {
          name: "feature",
          type: "text",
        },
      ],
      admin: {
        description: "Recommended to have 3-5 features.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageAlt",
      type: "text",
      required: false,
    },
  ],
};
