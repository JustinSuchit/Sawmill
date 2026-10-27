import { createClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (!url || !key || !token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = createClient(url, key, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user?.email_confirmed_at) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { data: admin, error: roleError } = await supabase.from("catalog_admins").select("email").eq("email", user.email?.toLowerCase()).maybeSingle();
  if (roleError || !admin) return Response.json({ error: "Forbidden" }, { status: 403 });
  revalidateTag("catalog", { expire: 0 });
  for (const path of ["/", "/products", "/lumber", "/steel", "/services", "/quote"]) revalidatePath(path);
  return Response.json({ ok: true });
}
