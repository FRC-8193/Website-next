"use client";

export default function Admin() {
  if (typeof window !== "undefined") {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js";
    script.async = true;
    document.head.appendChild(script);
  }
}
