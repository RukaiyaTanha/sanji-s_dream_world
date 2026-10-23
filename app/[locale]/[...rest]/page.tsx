import { notFound } from "next/navigation";

/** Any unknown address under /en or /bn shows the localised "not found" page. */
export default function CatchAll(): never {
  return notFound();
}
