create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;
alter function public.is_catalog_admin() set schema private;
revoke all on function private.is_catalog_admin() from public, anon, authenticated;
grant execute on function private.is_catalog_admin() to authenticated;
alter policy "Admins can check their membership" on public.catalog_admins using (email = lower((select auth.jwt())->>'email'));
drop policy "Visitors see published products" on public.catalog_products;
create policy "Visitors see published products" on public.catalog_products for select to anon using (published and not archived);
alter policy "Admins see all products" on public.catalog_products using ((published and not archived) or (select private.is_catalog_admin()));

