import type { Metadata } from "next";
import Page404 from "@/components/ui/404";

export const metadata: Metadata = {
  title: "404",
};

export default async function NotFound() {
  return <Page404 />;
}
