import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalLayout";
import { getLegalDoc, legalMetadata } from "@/lib/legal";

const SLUG = "cookies" as const;

export function generateMetadata(): Metadata {
  const doc = getLegalDoc(SLUG);
  return legalMetadata({ title: doc.title, summary: doc.summary, path: "/cookies/" });
}

export default function Page() {
  return <LegalDocument doc={getLegalDoc(SLUG)} />;
}
