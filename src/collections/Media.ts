import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    defaultColumns: ["filename", "createdAt", "width", "height", "folder"],
    folders: true,
  },
  access: {
    read: () => true,
  },
  fields: [],
  upload: {
    disableLocalStorage: true,
  },
};
