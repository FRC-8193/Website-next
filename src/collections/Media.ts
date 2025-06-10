import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    defaultColumns: ["filename", "createdAt", "width", "height"],
  },
  access: {
    read: () => true,
  },
  fields: [],
  upload: {
    disableLocalStorage: true,
  },
};
