"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Plus, LogOut, Pencil, Archive, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { adminClient } from "@/lib/supabase-browser";
import { adminSignInEmail } from "@/lib/admin-identity";
import { catalogPages, productCard, validImageSource, type CatalogPage, type CatalogProduct } from "@/lib/catalog-types";
import { imageExtension, thumbnailLimit } from "@/lib/catalog-upload";
import { CategoryCard } from "./CategoryCard";

function emptyProduct(): CatalogProduct {
  return { id: crypto.randomUUID(), page: "lumber", title: "", label: "Lumber", description: "", image_src: "", image_alt: "", thumbnail_src: null, image_position: "50% 50%", specs: "", examples: [], price: null, price_unit: "", sort_order: 0, published: false, archived: false, updated_at: "" };
}

export function ProductAdmin() {
  const [access, setAccess] = useState<"loading" | "login" | "denied" | "admin">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recovering, setRecovering] = useState(false);
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [page, setPage] = useState("all");
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
  const [editing, setEditing] = useState<CatalogProduct | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const previewRef = useRef("");
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    async function loadSession() {
      try {
        const client = adminClient();
        const { data: { user }, error } = await client.auth.getUser();
        if (!active) return;
        if (error || !user?.email_confirmed_at) { setAccess("login"); setProducts([]); setEditing(null); return; }
        const { data: role, error: roleError } = await client.from("catalog_admins").select("email").eq("email", user.email?.toLowerCase()).maybeSingle();
        if (!active) return;
        setAccount(user.email || "");
        if (roleError || !role) { setAccess("denied"); setProducts([]); setEditing(null); return; }
        const { data, error: queryError } = await client.from("catalog_products").select("*").order("sort_order").order("title");
        if (queryError) throw new Error("Unable to load products. Please try signing in again.");
        if (active) { setProducts(data || []); setAccess("admin"); setStatus(current => current.startsWith("Check your email") || current.startsWith("Sign-in failed") || current.startsWith("Too many sign-in") ? "" : current); }
      } catch (error) {
        if (active) { setAccess("login"); setStatus(error instanceof Error ? error.message : "Unable to connect."); }
      }
    }
    void loadSession();
    let unsubscribe = () => {};
    try {
      const { data: { subscription } } = adminClient().auth.onAuthStateChange(event => {
        if (event === "PASSWORD_RECOVERY") { window.location.replace("/admin/password"); return; }
        window.setTimeout(() => { if (active) void loadSession(); }, 0);
      });
      unsubscribe = () => subscription.unsubscribe();
    } catch { /* Setup state is shown by loadSession. */ }
    return () => { active = false; unsubscribe(); if (previewRef.current) URL.revokeObjectURL(previewRef.current); };
  }, []);

  function edit(product: CatalogProduct) {
    setEditing({ ...product }); setFile(null); setPreview(""); setStatus("");
    if (previewRef.current) { URL.revokeObjectURL(previewRef.current); previewRef.current = ""; }
    requestAnimationFrame(() => { editor.current?.scrollIntoView({ block: "start", behavior: "smooth" }); editor.current?.querySelector<HTMLInputElement>("input[name=title]")?.focus({ preventScroll: true }); });
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus("");
    try {
      const signInEmail = adminSignInEmail(email);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail)) { setStatus("Enter your admin email address or the username Admin."); return; }
      if (recovering) {
        const { error } = await adminClient().auth.resetPasswordForEmail(signInEmail, { redirectTo: `${window.location.origin}/admin` });
        if (error) throw error;
        setStatus("Check your email for password setup or recovery instructions. This is only needed when setting or resetting your password.");
        return;
      }
      const { error } = await adminClient().auth.signInWithPassword({ email: signInEmail, password });
      if (error) throw error;
      setPassword("");
    } catch (error) { setStatus(error instanceof Error && "status" in error && error.status === 429 ? "Too many sign-in or recovery attempts. Wait a minute before trying again." : recovering ? "Could not request password recovery. Try again shortly." : "Sign-in failed. Check your email and password, or use Set / reset password below."); }
    finally { setPassword(""); setBusy(false); }
  }

  async function refreshPages() {
    const { data: { session } } = await adminClient().auth.getSession();
    const response = await fetch("/api/admin/revalidate", { method: "POST", headers: { Authorization: `Bearer ${session?.access_token || ""}` } });
    if (!response.ok) throw new Error("Saved, but the website refresh is delayed. Changes will appear within a minute.");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!editing) return;
    setBusy(true); setStatus("");
    let uploaded: string | null = null;
    let persisted = false;
    try {
      const client = adminClient();
      const { data: { user } } = await client.auth.getUser();
      if (!user?.email_confirmed_at) throw new Error("Your session expired. Sign in again.");
      let image = editing.image_src.trim();
      if (file) {
        if (file.size > thumbnailLimit) throw new Error("Please choose an image smaller than 5 MB.");
        const extension = imageExtension(new Uint8Array(await file.slice(0,32).arrayBuffer()));
        if (!extension) throw new Error("Choose a JPEG, PNG, WebP or AVIF image.");
        uploaded = `${user.id}/${crypto.randomUUID()}.${extension}`;
        const contentType = extension === "jpg" ? "image/jpeg" : `image/${extension}`;
        const { error } = await client.storage.from("product-thumbnails").upload(uploaded, file, { contentType, cacheControl: "31536000", upsert: false });
        if (error) throw new Error("The thumbnail could not be uploaded. Please try again.");
        image = client.storage.from("product-thumbnails").getPublicUrl(uploaded).data.publicUrl;
      }
      if (!validImageSource(image)) throw new Error("Choose a thumbnail or an existing /images/ path.");
      if (!editing.title.trim() || !editing.description.trim() || !editing.image_alt.trim()) throw new Error("Complete the name, description and image description.");
      const { updated_at: previousVersion, ...values } = editing;
      const payload = { ...values, title: values.title.trim(), label: values.label.trim(), description: values.description.trim(), image_src: image, image_alt: values.image_alt.trim(), thumbnail_src: file ? null : values.thumbnail_src, examples: values.examples.map(value => value.trim()).filter(Boolean) };
      const query = previousVersion
        ? client.from("catalog_products").update(payload).eq("id", editing.id).eq("updated_at", previousVersion)
        : client.from("catalog_products").insert(payload);
      const { data, error } = await query.select().maybeSingle();
      if (error) throw new Error("Product could not be saved. Check the fields and your admin access.");
      if (!data) throw new Error("This product changed in another session. Reload the page before editing it again.");
      persisted = true;
      setProducts(current => [...current.filter(item => item.id !== data.id), data]);
      setEditing(null); setFile(null); setPreview("");
      await refreshPages();
      setStatus(data.published ? "Product saved and published." : "Draft saved. Switch on Published when it is ready.");
    } catch (error) {
      if (uploaded && !persisted) await adminClient().storage.from("product-thumbnails").remove([uploaded]);
      setStatus(error instanceof Error ? error.message : "Unable to save product.");
    } finally { setBusy(false); }
  }

  async function archive(product: CatalogProduct, archived: boolean) {
    setBusy(true); setStatus("");
    try {
      const { data, error } = await adminClient().from("catalog_products").update({ archived }).eq("id", product.id).eq("updated_at", product.updated_at).select().maybeSingle();
      if (error || !data) throw new Error("Unable to update this product. Reload to check for changes by another admin.");
      setProducts(current => current.map(item => item.id === data.id ? data : item));
      setPendingRemoval(null);
      if (editing?.id === data.id) setEditing(null);
      await refreshPages(); setStatus(archived ? "Product removed. You can restore it below." : "Product restored.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to update product."); }
    finally { setBusy(false); }
  }

  const visible = products.filter(item => item.archived === showArchived && (page === "all" || item.page === page) && `${item.title} ${item.label}`.toLowerCase().includes(search.toLowerCase())).sort((a,b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));
  const update = <K extends keyof CatalogProduct>(key: K, value: CatalogProduct[K]) => setEditing(current => current ? { ...current, [key]: value } : current);

  if (access === "loading") return <p role="status">Checking admin access…</p>;
  if (access !== "admin") return <section className="admin-login"><p className="eyebrow">Jagmohan Sawmill</p><h1>Product Admin</h1><p>Manage your products, photos and prices.</p>
    {access === "denied" ? <><p role="alert">This account does not have admin access.</p><button className="btn btn-dark" onClick={() => void adminClient().auth.signOut()}>Sign out</button></> :
    <form onSubmit={signIn}><label>Email or username<input type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={254} required value={email} onChange={event => setEmail(event.target.value)} /></label>{!recovering && <label>Password<input type="password" autoComplete="current-password" required maxLength={128} value={password} onChange={event => setPassword(event.target.value)} /></label>}<button className="btn btn-primary" disabled={busy}>{busy ? "Please wait…" : recovering ? "Send password recovery email" : "Sign in"}</button><button className="admin-auth-link" type="button" disabled={busy} onClick={() => { setRecovering(!recovering); setPassword(""); setStatus(""); }}>{recovering ? "Back to password sign-in" : "Set / reset password"}</button><p>Access is limited to approved administrators.</p></form>}
    <p role="status" aria-live="polite">{status}</p></section>;

  return <>
    <header className="admin-heading"><div><p className="eyebrow">Jagmohan Sawmill</p><h1>Product Admin</h1><p>{account}</p></div><div className="admin-actions"><button className="btn btn-primary" disabled={busy} onClick={() => edit(emptyProduct())}><Plus size={18} /> Add product</button><Link className="btn btn-dark" href="/admin/password">Set / change password</Link><button className="btn btn-dark" disabled={busy} onClick={() => void adminClient().auth.signOut()}><LogOut size={18} /> Sign out</button></div></header>
    <p className="admin-status" role="status" aria-live="polite">{status}</p>
    {editing && <div className="admin-editor" ref={editor}>
      <form onSubmit={save} className="admin-form"><h2>{editing.updated_at ? "Edit product" : "New product"}</h2>
        <label>Product name<input name="title" maxLength={160} required value={editing.title} onChange={e => update("title",e.target.value)} /></label>
        <div className="admin-fields"><label>Show on page<select value={editing.page} onChange={e => update("page", e.target.value as CatalogPage)}>{Object.entries(catalogPages).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label><label>Category label<input required maxLength={80} value={editing.label} onChange={e => update("label",e.target.value)} /></label></div>
        <label>Description<textarea rows={4} required maxLength={3000} value={editing.description} onChange={e => update("description", e.target.value)} /></label>
        <label>Thumbnail photo<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e => {
          const selected = e.target.files?.[0] || null;
          if (selected && selected.size > thumbnailLimit) { setStatus("Please choose an image smaller than 5 MB."); e.target.value = ""; return; }
          if (previewRef.current) URL.revokeObjectURL(previewRef.current);
          previewRef.current = selected ? URL.createObjectURL(selected) : ""; setPreview(previewRef.current); setFile(selected);
        }} /><small>JPEG, PNG, WebP or AVIF. Maximum 5 MB. Your existing photo stays unless replaced.</small></label>
        {!file && <label>Existing website image path<input value={editing.image_src} placeholder="/images/lumber/products/example.jpg" onChange={e => { update("image_src",e.target.value); update("thumbnail_src",null); }} /></label>}
        <label>Image description<input required maxLength={250} value={editing.image_alt} onChange={e => update("image_alt", e.target.value)} /></label>
        <div className="admin-fields"><label>Price in TT$ (optional)<input type="number" min="0" max="99999999" step="0.01" value={editing.price ?? ""} onChange={e => update("price",e.target.value === "" ? null : Number(e.target.value))} /></label><label>Price unit<input maxLength={80} placeholder="per square foot" value={editing.price_unit} onChange={e => update("price_unit", e.target.value)} /></label></div>
        <label>Specifications / pricing notes<textarea rows={2} maxLength={2000} value={editing.specs} onChange={e => update("specs", e.target.value)} /></label>
        <label>Sizes / examples (one per line)<textarea rows={4} value={editing.examples.join("\n")} onChange={e => update("examples", e.target.value.split("\n"))} /></label>
        <div className="admin-fields"><label>Display order<input type="number" min="0" max="9999" step="1" value={editing.sort_order} onChange={e => update("sort_order", Number(e.target.value))} /></label><label>Photo crop<select value={editing.image_position} onChange={e => update("image_position",e.target.value)}><option value={editing.image_position}>{editing.image_position}</option>{["50% 50%","50% 0%","50% 100%","0% 50%","100% 50%"].filter(p => p !== editing.image_position).map(p => <option key={p} value={p}>{p}</option>)}</select></label></div>
        <label className="admin-check"><input type="checkbox" checked={editing.published} onChange={e => update("published",e.target.checked)} /> Published on website</label>
        <div className="admin-actions"><button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save product"}</button><button type="button" className="btn btn-dark" disabled={busy} onClick={() => setEditing(null)}>Cancel</button></div>
      </form>
      <aside className="admin-preview"><h2>Card preview</h2><p>The website uses this same card formatting.</p>{preview || validImageSource(editing.image_src) ? <>
        {preview ? <article className="category-card"><div className="category-media admin-local-preview"><Image src={preview} alt={editing.image_alt || "Selected thumbnail"} fill unoptimized style={{ objectFit: "cover", objectPosition: editing.image_position }} /></div><div className="category-body"><p className="label">{editing.label}</p><h3>{editing.title || "Product name"}</h3><p>{editing.description || "Product description"}</p>{editing.price != null && <p className="category-specs">{new Intl.NumberFormat("en-TT",{style:"currency",currency:"TTD"}).format(editing.price)} {editing.price_unit}</p>}{editing.specs && <p className="category-specs">{editing.specs}</p>}</div></article> : <CategoryCard item={productCard(editing)} variant={editing.page === "products" ? "tools" : editing.page === "steel" ? "steel" : "default"} />}
      </> : <p>Add a thumbnail to preview the product card.</p>}</aside>
    </div>}
    <section className="admin-list" aria-label="Product catalogue"><div className="admin-filters"><label>Search products<input type="search" value={search} onChange={e => setSearch(e.target.value)} /></label><label>Page<select value={page} onChange={e => setPage(e.target.value)}><option value="all">All pages</option>{Object.entries(catalogPages).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label><label className="admin-check"><input type="checkbox" checked={showArchived} onChange={e => setShowArchived(e.target.checked)} /> Removed products</label></div><p>{visible.length} {visible.length === 1 ? "product" : "products"}</p>
      <div className="admin-product-list">{visible.map(product => <article className="admin-product-row" key={product.id}><div><h2>{product.title}</h2><p>{catalogPages[product.page]} · {product.archived ? "Removed" : product.published ? "Published" : "Draft"}</p></div><div className="admin-actions">{!product.archived && <button className="btn btn-dark" disabled={busy} onClick={() => edit(product)} aria-label={`Edit ${product.title}`}><Pencil size={16} /> Edit</button>}<button className="btn btn-dark" disabled={busy} onClick={() => product.archived ? void archive(product,false) : setPendingRemoval(product.id)} aria-label={`${product.archived ? "Restore" : "Remove"} ${product.title}`}>{product.archived ? <RotateCcw size={16} /> : <Archive size={16} />}{product.archived ? "Restore" : "Remove"}</button></div>{pendingRemoval === product.id && <div className="admin-removal" role="group" aria-label={`Confirm removal of ${product.title}`}><p>Remove this product from the website? You can restore it later.</p><div className="admin-actions"><button className="btn btn-primary" disabled={busy} onClick={() => void archive(product,true)}>Confirm removal</button><button className="btn btn-dark" disabled={busy} onClick={() => setPendingRemoval(null)}>Keep product</button></div></div>}</article>)}</div>
      {!visible.length && <p>No products match these filters.</p>}
    </section>
  </>;
}
