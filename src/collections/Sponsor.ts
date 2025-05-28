import type { CollectionConfig } from "payload";

export const Sponsor: CollectionConfig = {
  slug: "sponsor",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageDark",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "imageAlt",
      type: "text",
      required: false,
    },
    {
      name: "website",
      type: "text",
      required: false,
    },
  ],
};
