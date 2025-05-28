import ContactPage from "@/components/contact/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return <ContactPage />;
}
