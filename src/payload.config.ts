// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { User } from "./collections/User";
import { Media } from "./collections/Media";
import { Post } from "./collections/Post";
import { Robot } from "./collections/Robot";
import { Sponsor } from "./collections/Sponsor";
import { Tag } from "./collections/Tag";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: User.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: "http://localhost:3000",
      collections: ["post"],
    },
  },
  collections: [User, Media, Post, Robot, Sponsor, Tag],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: "cms@nlrobotics.org",
    defaultFromName: "NLRobotics CMS",
    apiKey: process.env.RESEND_API_KEY ?? "",
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? "",
      config: {
        endpoint: process.env.S3_ENDPOINT ?? "",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.S3_REGION ?? "",
      },
      clientUploads: true,
      signedDownloads: true,
    }),
  ],
});
