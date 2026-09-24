import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalLayout";
import { getLegalDoc, legalMetadata } from "@/lib/legal";

const SLUG = "terms" as const;

export function generateMetadata(): Metadata {
  const doc = getLegalDoc(SLUG);
  return legalMetadata({ title: doc.title, summary: doc.summary, path: "/terms/" });
}

export default function Page() {
  return <LegalDocument doc={getLegalDoc(SLUG)} />;
}
