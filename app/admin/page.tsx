import type { Metadata } from "next";
import { ProductAdmin } from "@/components/ProductAdmin";
import "./admin.css";

export const metadata: Metadata = { title: "Product Admin | Jagmohan Sawmill", robots: { index: false, follow: false } };
export default function AdminPage() {
  return <main id="main" className="admin-page"><ProductAdmin /></main>;
}
