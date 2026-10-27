"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { adminClient } from "@/lib/supabase-browser";

export function AdminPasswordForm() {
  const [access, setAccess] = useState<"loading" | "allowed" | "denied">("loading");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkAccess() {
      try {
        const client = adminClient();
        const { data: { user }, error } = await client.auth.getUser();
        if (error || !user?.email_confirmed_at) { if (active) setAccess("denied"); return; }
        const { data: role, error: roleError } = await client.from("catalog_admins").select("email").eq("email", user.email?.toLowerCase()).maybeSingle();
        if (active) setAccess(!roleError && role ? "allowed" : "denied");
      } catch { if (active) setAccess("denied"); }
    }
    void checkAccess();
    return () => { active = false; };
  }, []);

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("");
    if (password.length < 12) { setStatus("Use at least 12 characters for your password."); return; }
    if (password !== confirmation) { setStatus("The passwords do not match."); return; }
    setBusy(true);
    try {
      const client = adminClient();
      const { data: { user }, error: userError } = await client.auth.getUser();
      if (userError || !user?.email_confirmed_at) throw new Error("Your session expired. Request a password recovery email and try again.");
      const { data: role, error: roleError } = await client.from("catalog_admins").select("email").eq("email", user.email?.toLowerCase()).maybeSingle();
      if (roleError || !role) throw new Error("This account does not have admin access.");
      const { error } = await client.auth.updateUser({ password });
      if (error) throw new Error("Password could not be saved. Use a different strong password, or request a fresh recovery link and try again.");
      setPassword(""); setConfirmation(""); setComplete(true);
      const { error: signOutError } = await client.auth.signOut({ scope: "global" });
      setStatus(signOutError ? "Password saved. Sign out before signing in with your new password." : "Password saved. Sign in with your email and new password.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to save the password."); }
    finally { setPassword(""); setConfirmation(""); setBusy(false); }
  }

  return <section className="admin-login"><p className="eyebrow">Jagmohan Sawmill</p><h1>Set Admin Password</h1>
    {access === "loading" ? <p role="status">Checking admin access…</p> : access === "denied" ? <><p>Sign in first, or use Set / reset password on the sign-in page to receive a recovery email.</p><Link className="btn btn-primary" href="/admin">Go to admin sign-in</Link></> : complete ? <Link className="btn btn-primary" href="/admin">Go to admin sign-in</Link> : <form onSubmit={savePassword}>
      <p>Choose a unique password with at least 12 characters. You can then sign in without requesting an email link each time.</p>
      <label>New password<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={password} onChange={event => setPassword(event.target.value)} /></label>
      <label>Confirm new password<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={confirmation} onChange={event => setConfirmation(event.target.value)} /></label>
      <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save password"}</button>
      <Link className="admin-auth-link" href="/admin">Back to admin</Link>
    </form>}
    <p role="status" aria-live="polite">{status}</p>
  </section>;
}
