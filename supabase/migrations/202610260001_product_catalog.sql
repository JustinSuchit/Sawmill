create table public.catalog_admins (
  email text primary key check (email = lower(email) and length(email) < 255),
  created_at timestamptz not null default now()
);
alter table public.catalog_admins enable row level security;
revoke all on public.catalog_admins from anon, authenticated;
grant select on public.catalog_admins to authenticated;
create policy "Admins can check their membership" on public.catalog_admins for select to authenticated using (email = lower(auth.jwt()->>'email'));

create function public.is_catalog_admin() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.catalog_admins a join auth.users u on lower(u.email) = a.email where u.id = auth.uid() and u.email_confirmed_at is not null);
$$;
revoke all on function public.is_catalog_admin() from public;
grant execute on function public.is_catalog_admin() to authenticated;

create table public.catalog_products (
  id text primary key check (id ~ '^[a-zA-Z0-9-]{1,100}$'),
  page text not null check (page in ('products','lumber','steel','home','services')),
  title text not null check (length(trim(title)) between 1 and 160),
  label text not null check (length(trim(label)) between 1 and 80),
  description text not null check (length(trim(description)) between 1 and 3000),
  image_src text not null check (length(image_src) < 1500 and position('..' in image_src) = 0 and (image_src ~ '^/images/[^?#]+\.(jpg|jpeg|png|webp|avif)$' or image_src ~ '^https://shgmyyzxcxthafbpvjvl\.supabase\.co/storage/v1/object/public/product-thumbnails/[a-zA-Z0-9/_-]+\.(jpg|png|webp|avif)$')),
  image_alt text not null check (length(trim(image_alt)) between 1 and 250),
  thumbnail_src text check (thumbnail_src is null or (thumbnail_src ~ '^/images/[^?#]+\.(jpg|jpeg|png|webp|avif)$' and position('..' in thumbnail_src) = 0)),
  image_position text not null default '50% 50%' check (image_position ~ '^(100|[0-9]{1,2})% (100|[0-9]{1,2})%$'),
  specs text not null default '' check (length(specs) <= 2000),
  examples text[] not null default '{}' check (cardinality(examples) <= 50 and length(array_to_string(examples, ',')) <= 10000),
  price numeric(10,2) check (price >= 0 and price <= 99999999),
  price_unit text not null default '' check (length(price_unit) <= 80),
  sort_order integer not null default 0 check (sort_order between 0 and 9999),
  published boolean not null default false,
  archived boolean not null default false,
  updated_at timestamptz not null default now()
);
create index catalog_products_page_order on public.catalog_products(page,sort_order) where published and not archived;
alter table public.catalog_products enable row level security;
revoke all on public.catalog_products from anon, authenticated;
grant select on public.catalog_products to anon, authenticated;
grant insert, update on public.catalog_products to authenticated;
create policy "Visitors see published products" on public.catalog_products for select to anon, authenticated using (published and not archived);
create policy "Admins see all products" on public.catalog_products for select to authenticated using ((select public.is_catalog_admin()));
create policy "Admins add products" on public.catalog_products for insert to authenticated with check ((select public.is_catalog_admin()));
create policy "Admins edit products" on public.catalog_products for update to authenticated using ((select public.is_catalog_admin())) with check ((select public.is_catalog_admin()));
create function public.catalog_touch_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = clock_timestamp(); return new; end; $$;
create trigger catalog_product_updated before update on public.catalog_products for each row execute function public.catalog_touch_updated_at();

insert into public.catalog_admins(email) values ('justinsuchit37@gmail.com');
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('product-thumbnails','product-thumbnails',true,5242880,array['image/jpeg','image/png','image/webp','image/avif']);
create policy "Admins upload product thumbnails" on storage.objects for insert to authenticated with check (bucket_id = 'product-thumbnails' and (select public.is_catalog_admin()) and (storage.foldername(name))[1] = (select auth.uid())::text and lower(storage.extension(name)) in ('jpg','png','webp','avif'));
create policy "Admins read thumbnail metadata" on storage.objects for select to authenticated using (bucket_id = 'product-thumbnails' and (select public.is_catalog_admin()));
create policy "Admins clean their unused uploads" on storage.objects for delete to authenticated using (bucket_id = 'product-thumbnails' and (select public.is_catalog_admin()) and (storage.foldername(name))[1] = (select auth.uid())::text);

