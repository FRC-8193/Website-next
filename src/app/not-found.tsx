import Page404 from "@/components/ui/404";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default async function NotFound() {
  return <Page404 />;
}
