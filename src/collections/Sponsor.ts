import type { CollectionConfig } from "payload";

export const Sponsor: CollectionConfig = {
  slug: "sponsor",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "image", "imageDark", "website"],
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
      admin: {
        description: "Only required if the image is different in dark mode.",
      },
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
