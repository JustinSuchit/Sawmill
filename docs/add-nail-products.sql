-- Run after deploying the two new images to avoid broken production images.
begin;
update public.catalog_products
set title = 'Pneumatic Coil Nailer', examples = array['CN70 Nail Gun', 'CN100 Nail Gun']
where id = 'products-cn70-pneumatic-coil-nailer' and page = 'products';

insert into public.catalog_products
  (id, page, title, label, description, image_src, image_alt, image_position, specs, examples, sort_order, published, archived)
values
  ('products-coil-nails', 'products', 'Coil Nails', 'Nailing',
   'Wire-collated coil nails for compatible pneumatic coil nailers and timber assembly.',
   '/images/tools/coil nails.jpg', 'Wire-collated nails arranged in coils inside a box',
   '50% 50%', '', array['2-inch', '2.25-inch', '2.5-inch'], 4, true, false),
  ('products-loose-nails', 'products', 'Loose Nails', 'Nailing',
   'Loose nails for general timber fixing, construction and woodworking applications.',
   '/images/tools/nails.jpg', 'Loose nails stored together in a bag',
   '50% 50%', '', array['2-inch', '2.5-inch', '3-inch'], 5, true, false)
on conflict (id) do nothing;
commit;
