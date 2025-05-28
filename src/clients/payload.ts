import { getPayload } from "payload";
import config from "@/payload.config";

export async function getPayloadClient() {
  return await getPayload({ config });
}

export const client = await getPayloadClient();
