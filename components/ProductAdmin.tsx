"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Plus, LogOut, Pencil, Archive, RotateCcw, Copy } from "lucide-react";
import Link from "next/link";
import { adminClient } from "@/lib/supabase-browser";
import { adminSignInEmail } from "@/lib/admin-identity";
import { catalogPages, productCard, validImageSource, type CatalogPage, type CatalogProduct } from "@/lib/catalog-types";
import { imageExtension, thumbnailLimit } from "@/lib/catalog-upload";
import { catalogValidationError } from "@/lib/catalog-editor";
import { CategoryCard } from "./CategoryCard";
import { ServiceFeature } from "./ServiceFeature";

function emptyProduct(service = false): CatalogProduct {
  return { id: crypto.randomUUID(), page: service ? "services" : "lumber", title: "", label: service ? "Service" : "Lumber", description: "", image_src: "", image_alt: "", thumbnail_src: null, image_position: "50% 50%", specs: "", examples: [], price: null, price_unit: "", sort_order: 0, published: false, archived: false, updated_at: "" };
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
  const [visibility, setVisibility] = useState("active");
  const [kind, setKind] = useState("all");
  const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
  const [editing, setEditing] = useState<CatalogProduct | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [checkingPhoto, setCheckingPhoto] = useState(false);
  const previewRef = useRef("");
  const fileInput = useRef<HTMLInputElement>(null);
  const photoRequest = useRef(0);
  const [original, setOriginal] = useState("");
  const editor = useRef<HTMLDivElement>(null);
  const dirty = editing !== null && (JSON.stringify(editing) !== original || file !== null);

  useEffect(() => {
    if (!dirty) return;
    function warn(event: BeforeUnloadEvent) { event.preventDefault(); event.returnValue = ""; }
    function checkNavigation(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.target === "_blank" || !link.href) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || (destination.pathname === window.location.pathname && destination.search === window.location.search)) return;
      if (!window.confirm("Discard your unsaved changes and leave this editor?")) { event.preventDefault(); event.stopPropagation(); }
    }
    window.addEventListener("beforeunload", warn);
    document.addEventListener("click", checkNavigation, true);
    return () => { window.removeEventListener("beforeunload", warn); document.removeEventListener("click", checkNavigation, true); };
  }, [dirty]);

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
        if (queryError) throw new Error("Unable to load products and services. Please try signing in again.");
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

  function clearPhoto() {
    photoRequest.current += 1;
    setCheckingPhoto(false); setFile(null); setPreview("");
    if (fileInput.current) fileInput.current.value = "";
    if (previewRef.current) { URL.revokeObjectURL(previewRef.current); previewRef.current = ""; }
  }

  function discardChanges() {
    return !dirty || window.confirm("Discard your unsaved changes? The saved item will stay unchanged.");
  }

  function edit(product: CatalogProduct) {
    if (!discardChanges()) return;
    clearPhoto(); setOriginal(JSON.stringify(product));
    setEditing({ ...product }); setStatus("");
    requestAnimationFrame(() => { editor.current?.scrollIntoView({ block: "start", behavior: "smooth" }); editor.current?.querySelector<HTMLInputElement>("input[name=title]")?.focus({ preventScroll: true }); });
  }

  async function selectPhoto(input: HTMLInputElement) {
    const selected = input.files?.[0];
    clearPhoto();
    if (!selected) return;
    const request = photoRequest.current;
    setCheckingPhoto(true); setStatus("");
    let url = "";
    try {
      if (!selected.size || selected.size > thumbnailLimit) throw new Error("Choose a non-empty image no larger than 5 MB.");
      if (!imageExtension(new Uint8Array(await selected.slice(0,32).arrayBuffer()))) throw new Error("Choose a JPEG, PNG, WebP or AVIF image.");
      url = URL.createObjectURL(selected);
      await new Promise<void>((resolve, reject) => {
        const image = new window.Image();
        image.onload = () => image.naturalWidth > 0 ? resolve() : reject(new Error("This image could not be opened. Choose another photo."));
        image.onerror = () => reject(new Error("This image could not be opened. Choose another photo."));
        image.src = url;
      });
      if (request !== photoRequest.current) { URL.revokeObjectURL(url); return; }
      previewRef.current = url; setPreview(url); setFile(selected);
    } catch (error) {
      if (url) URL.revokeObjectURL(url);
      if (request === photoRequest.current) setStatus(error instanceof Error ? error.message : "Unable to open image.");
    } finally {
      if (request === photoRequest.current) setCheckingPhoto(false);
    }
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
    event.preventDefault(); if (!editing || busy || checkingPhoto) return;
    const validationError = catalogValidationError(editing);
    if (validationError) { setStatus(validationError); return; }
    if (!file && !validImageSource(editing.image_src.trim())) { setStatus("Choose a photo or a valid existing website image path."); return; }
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
      const payload = { ...values, title: values.title.trim(), label: values.label.trim(), description: values.description.trim(), image_src: image, image_alt: values.image_alt.trim(), specs: values.specs.trim(), price_unit: values.price_unit.trim(), thumbnail_src: file ? null : values.thumbnail_src, examples: values.examples.map(value => value.trim()).filter(Boolean) };
      const query = previousVersion
        ? client.from("catalog_products").update(payload).eq("id", editing.id).eq("updated_at", previousVersion)
        : client.from("catalog_products").insert(payload);
      const { data, error } = await query.select().maybeSingle();
      if (error) throw new Error("Item could not be saved. Check the fields and your admin access.");
      if (!data) throw new Error("This item changed in another session. Reload the page before editing it again.");
      persisted = true;
      setProducts(current => [...current.filter(item => item.id !== data.id), data]);
      setEditing(null); clearPhoto();
      await refreshPages();
      setStatus(data.archived ? "Saved in the archive. This item is hidden from the website." : data.published ? "Saved and published on the website." : "Draft saved. Publish when ready.");
    } catch (error) {
      if (uploaded && !persisted) {
        try { await adminClient().storage.from("product-thumbnails").remove([uploaded]); } catch { /* Keep the original save error visible. */ }
      }
      setStatus(error instanceof Error ? error.message : "Unable to save item.");
    } finally { setBusy(false); }
  }

  async function setPublication(product: CatalogProduct, state: "published" | "archived") {
    if (editing?.id === product.id && !discardChanges()) return;
    setBusy(true); setStatus("");
    try {
      const { data, error } = await adminClient().from("catalog_products").update({ archived: state === "archived", published: state === "published" }).eq("id", product.id).eq("updated_at", product.updated_at).select().maybeSingle();
      if (error || !data) throw new Error("Unable to update this item. Reload to check for changes by another admin.");
      setProducts(current => current.map(item => item.id === data.id ? data : item));
      setPendingRemoval(null);
      if (editing?.id === data.id) { setEditing(null); clearPhoto(); }
      await refreshPages(); setStatus(state === "archived" ? "Archived and hidden from the website. Photos, descriptions and prices are saved for republishing." : "Published on the website.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to update item."); }
    finally { setBusy(false); }
  }

  const visible = products.filter(item =>
    (visibility === "all" || (visibility === "active" && !item.archived) || (visibility === "archived" && item.archived) || (visibility === "published" && item.published && !item.archived) || (visibility === "draft" && !item.published && !item.archived)) &&
    (kind === "all" || (kind === "services" ? item.page === "services" : item.page !== "services")) &&
    (page === "all" || item.page === page) && `${item.title} ${item.label}`.toLowerCase().includes(search.toLowerCase())
  ).sort((a,b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));
  const update = <K extends keyof CatalogProduct>(key: K, value: CatalogProduct[K]) => setEditing(current => current ? { ...current, [key]: value } : current);
  const previewProduct = editing ? { ...editing, image_src: preview || editing.image_src, thumbnail_src: preview ? null : editing.thumbnail_src } : null;
  const editorLocked = busy || checkingPhoto;

  if (access === "loading") return <p role="status">Checking admin access…</p>;
  if (access !== "admin") return <section className="admin-login"><p className="eyebrow">Jagmohan Sawmill</p><h1>Products &amp; Services</h1><p>Manage products and services, photos, prices and website visibility.</p>
    {access === "denied" ? <><p role="alert">This account does not have admin access.</p><button className="btn btn-dark" onClick={() => void adminClient().auth.signOut()}>Sign out</button></> :
    <form onSubmit={signIn}><label>Email or username<input type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={254} required value={email} onChange={event => setEmail(event.target.value)} /></label>{!recovering && <label>Password<input type="password" autoComplete="current-password" required maxLength={128} value={password} onChange={event => setPassword(event.target.value)} /></label>}<button className="btn btn-primary" disabled={busy}>{busy ? "Please wait…" : recovering ? "Send password recovery email" : "Sign in"}</button><button className="admin-auth-link" type="button" disabled={busy} onClick={() => { setRecovering(!recovering); setPassword(""); setStatus(""); }}>{recovering ? "Back to password sign-in" : "Set / reset password"}</button><p>Access is limited to approved administrators.</p></form>}
    <p role="status" aria-live="polite">{status}</p></section>;

  return <>
    <header className="admin-heading"><div><p className="eyebrow">Jagmohan Sawmill</p><h1>Products &amp; Services</h1><p>{account}</p></div><div className="admin-actions"><button className="btn btn-primary" disabled={busy} onClick={() => edit(emptyProduct())}><Plus size={18} /> Add product</button><button className="btn btn-primary" disabled={busy} onClick={() => edit(emptyProduct(true))}><Plus size={18} /> Add service</button><Link className="btn btn-dark" href="/admin/password">Set / change password</Link><button className="btn btn-dark" disabled={busy} onClick={() => { if (discardChanges()) void adminClient().auth.signOut(); }}><LogOut size={18} /> Sign out</button></div></header>
    <p className="admin-status" role="status" aria-live="polite">{status}</p>
    {editing && <div className="admin-editor" ref={editor}>
      <form onSubmit={save} className="admin-form"><fieldset className="admin-form-fields" disabled={busy}><legend>{editing.updated_at ? "Edit" : "New"} {editing.page === "services" ? "service" : "product"}</legend>
        <p className="admin-editor-hint">{dirty ? "You have unsaved changes." : "Edit the saved details below."} Changes appear on the website only after you save a published item.</p>
        {status && <p className="admin-status" role="status">{status}</p>}
        <label>{editing.page === "services" ? "Service" : "Product"} name<input name="title" maxLength={160} required value={editing.title} onChange={e => update("title",e.target.value)} /></label>
        <div className="admin-fields"><label>Show on page<select value={editing.page} onChange={e => update("page", e.target.value as CatalogPage)}>{Object.entries(catalogPages).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label><label>Category label<input required maxLength={80} value={editing.label} onChange={e => update("label",e.target.value)} /></label></div>
        <label>Description<textarea rows={4} required maxLength={3000} value={editing.description} onChange={e => update("description", e.target.value)} /></label>
        <label>Thumbnail photo<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e => void selectPhoto(e.currentTarget)} /><small>JPEG, PNG, WebP or AVIF. Maximum 5 MB. Your existing photo stays unless replaced.</small></label>
        {checkingPhoto && <p role="status">Checking photo…</p>}
        {file && <div className="admin-photo-selection"><p>Selected: {file.name} ({Math.ceil(file.size / 1024)} KB)</p><button type="button" className="admin-auth-link" onClick={clearPhoto}>{editing.image_src ? "Undo photo replacement" : "Clear selected photo"}</button></div>}
        {!file && <label>Existing website image path<input value={editing.image_src} placeholder="/images/lumber/products/example.jpg" onChange={e => { update("image_src",e.target.value); update("thumbnail_src",null); }} /></label>}
        <label>Image description<input required maxLength={250} value={editing.image_alt} onChange={e => update("image_alt", e.target.value)} /></label>
        <div className="admin-fields"><label>Price in TT$ (optional)<input type="number" min="0" max="99999999" step="0.01" value={editing.price ?? ""} onChange={e => update("price",e.target.value === "" ? null : Number(e.target.value))} /></label><label>Price unit<input maxLength={80} placeholder="per square foot" value={editing.price_unit} onChange={e => update("price_unit", e.target.value)} /></label></div>
        <div className="admin-price-help"><small>Leave the price blank for enquiries. You can add, change or remove a price at any time; 0 displays as a zero price.</small>{editing.price !== null && <button type="button" className="admin-auth-link" onClick={() => { update("price",null); update("price_unit",""); }}>Remove price</button>}</div>
        {/\$\s*\d/.test([editing.specs,...editing.examples].join(" ")) && <p className="admin-editor-hint">This item also has prices written in its notes or examples. Update those below when changing pricing to avoid showing conflicting amounts.</p>}
        <label>Specifications / pricing notes<textarea rows={2} maxLength={2000} value={editing.specs} onChange={e => update("specs", e.target.value)} /></label>
        <label>Sizes / examples (one per line)<textarea rows={4} maxLength={10049} value={editing.examples.join("\n")} onChange={e => update("examples", e.target.value.split("\n"))} /><small>Up to 50 entries. Blank lines are ignored.</small></label>
        <div className="admin-fields"><label>Display order<input type="number" min="0" max="9999" step="1" value={editing.sort_order} onChange={e => update("sort_order", Number(e.target.value))} /></label><label>Photo crop<select value={editing.image_position} onChange={e => update("image_position",e.target.value)}><option value={editing.image_position}>{editing.image_position}</option>{["50% 50%","50% 0%","50% 100%","0% 50%","100% 50%"].filter(p => p !== editing.image_position).map(p => <option key={p} value={p}>{p}</option>)}</select></label></div>
        <label>Website visibility<select value={editing.archived ? "archived" : editing.published ? "published" : "draft"} onChange={e => { update("archived", e.target.value === "archived"); update("published", e.target.value === "published"); }}><option value="draft">Draft — hidden until ready</option><option value="published">Published — show on website</option><option value="archived">Archived — hidden, saved for later</option></select><small>Archive an unavailable item without losing its photo, description or price. Choose Published to show it again.</small></label>
        <div className="admin-actions"><button className="btn btn-primary" disabled={editorLocked}>{busy ? "Saving…" : checkingPhoto ? "Checking photo…" : "Save changes"}</button><button type="button" className="btn btn-dark" disabled={busy} onClick={() => { if (discardChanges()) { setEditing(null); clearPhoto(); setStatus(""); } }}>Cancel</button></div>
        </fieldset>
      </form>
      <aside className="admin-preview"><h2>{editing.page === "services" ? "Service preview" : "Card preview"}</h2><p>The preview includes your photo, description, sizes and optional price. Some existing lumber items use a dedicated feature layout.</p>{previewProduct && (preview || validImageSource(editing.image_src)) ? editing.page === "services" ? <ServiceFeature service={previewProduct} /> : <CategoryCard item={productCard(previewProduct)} variant={editing.page === "products" ? "tools" : editing.page === "steel" ? "steel" : "default"} /> : <p>Add a thumbnail to preview this item.</p>}</aside>
    </div>}
    <section className="admin-list" aria-label="Products and services catalogue">
      <p>Published items appear on the website. Archive unavailable items to hide them, then publish them again when ready. Archived items can still be edited.</p>
      <div className="admin-filters">
        <label>Search products and services<input type="search" value={search} onChange={e => setSearch(e.target.value)} /></label>
        <label>Type<select value={kind} onChange={e => { setKind(e.target.value); setPage("all"); }}><option value="all">Products and services</option><option value="products">Products</option><option value="services">Services</option></select></label>
        <label>Page<select value={page} onChange={e => setPage(e.target.value)}><option value="all">All pages</option>{Object.entries(catalogPages).filter(([key]) => kind === "all" || (kind === "services" ? key === "services" : key !== "services")).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label>Status<select value={visibility} onChange={e => setVisibility(e.target.value)}><option value="active">Active (published and drafts)</option><option value="published">Published</option><option value="draft">Drafts</option><option value="archived">Archived</option><option value="all">All statuses</option></select></label>
      </div><p>{visible.length} {visible.length === 1 ? "item" : "items"}</p>
      <div className="admin-product-list">{visible.map(product => <article className="admin-product-row" key={product.id}>
        <div><h2>{product.title}</h2><p>{product.page === "services" ? "Service" : "Product"} · {catalogPages[product.page]} · <strong>{product.archived ? "Archived — hidden" : product.published ? "Published" : "Draft — hidden"}</strong></p></div>
        <div className="admin-actions">
          <button className="btn btn-dark" disabled={busy} onClick={() => edit(product)} aria-label={`Edit ${product.title}`}><Pencil size={16} /> Edit</button>
          <button className="btn btn-dark" disabled={busy} onClick={() => edit({ ...product, id: crypto.randomUUID(), title: `${product.title.slice(0,150)} copy`, published: false, archived: false, updated_at: "", sort_order: Math.min(product.sort_order + 1,9999) })} aria-label={`Duplicate ${product.title} as draft`}><Copy size={16} /> Duplicate</button>
          {product.archived || !product.published ? <button className="btn btn-primary" disabled={busy} onClick={() => void setPublication(product,"published")} aria-label={`Publish ${product.title}`}><RotateCcw size={16} /> Publish</button> : null}
          {!product.archived && <button className="btn btn-dark" disabled={busy} onClick={() => setPendingRemoval(product.id)} aria-label={`Archive ${product.title}`}><Archive size={16} /> Archive / hide</button>}
        </div>
        {pendingRemoval === product.id && <div className="admin-removal" role="group" aria-label={`Confirm archive of ${product.title}`}><p>Hide this {product.page === "services" ? "service" : "product"} from the website? It stays saved in Archived and can be edited or published again.</p><div className="admin-actions"><button className="btn btn-primary" disabled={busy} onClick={() => void setPublication(product,"archived")}>Confirm archive</button><button className="btn btn-dark" disabled={busy} onClick={() => setPendingRemoval(null)}>Cancel</button></div></div>}
      </article>)}</div>
      {!visible.length && <p>No items match these filters.</p>}
    </section>
  </>;
}
