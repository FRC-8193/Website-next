import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Post: CollectionConfig = {
  slug: "post",
  versions: {
    drafts: {
      autosave: {
        interval: 1500,
        showSaveDraftButton: true,
      },
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "author",
      "createdAt",
      "updatedAt",
      "coverImage",
      "id",
      "_status",
      "slug",
    ],
  },

  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "coverImageAlt",
      type: "text",
      required: false,
      admin: {
        description: "Required if cover image is used.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "user",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "relationship",
          relationTo: "tag",
        },
      ],
      required: false,
    },
  ],
};
