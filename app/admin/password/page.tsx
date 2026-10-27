import type { Metadata } from "next";
import { AdminPasswordForm } from "@/components/AdminPasswordForm";
import "../admin.css";

export const metadata: Metadata = { title: "Set Admin Password | Jagmohan Sawmill", robots: { index: false, follow: false } };
export default function PasswordPage() {
  return <main id="main" className="admin-page"><AdminPasswordForm /></main>;
}
