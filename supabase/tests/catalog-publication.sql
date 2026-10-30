-- Run with an administrative database connection. Every test rolls back.
begin;
insert into public.catalog_products(id,page,title,label,description,image_src,image_alt,published,archived)
values ('catalog-publication-regression-test','services','QA transaction test','Test','Temporary row for RLS verification.','/images/logo.png','Test image',false,false);
set local role anon;
do $$ begin
  if exists(select 1 from public.catalog_products where id='catalog-publication-regression-test') then raise exception 'Draft visible to visitor'; end if;
end $$;
reset role;
update public.catalog_products set published=true where id='catalog-publication-regression-test';
set local role anon;
do $$ declare changed integer; begin
  if not exists(select 1 from public.catalog_products where id='catalog-publication-regression-test') then raise exception 'Published service invisible'; end if;
  begin
    update public.catalog_products set title='Unauthorized edit' where id='catalog-publication-regression-test';
    get diagnostics changed = row_count;
    if changed > 0 then raise exception 'Visitor can edit catalogue'; end if;
  exception when insufficient_privilege then null; end;
end $$;
reset role;
update public.catalog_products set archived=true where id='catalog-publication-regression-test';
set local role anon;
do $$ begin
  if exists(select 1 from public.catalog_products where id='catalog-publication-regression-test') then raise exception 'Archive visible to visitor'; end if;
end $$;
reset role;
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
set local role authenticated;
do $$ declare changed integer; begin
  if exists(select 1 from public.catalog_products where id='catalog-publication-regression-test') then raise exception 'Non-admin can read archive'; end if;
  update public.catalog_products set archived=false where id='catalog-publication-regression-test';
  get diagnostics changed = row_count;
  if changed > 0 then raise exception 'Non-admin can publish archive'; end if;
end $$;
reset role;
select set_config('request.jwt.claims',json_build_object('sub',(select u.id from auth.users u join public.catalog_admins a on lower(u.email)=a.email where u.email_confirmed_at is not null order by u.created_at limit 1),'role','authenticated')::text,true);
set local role authenticated;
do $$ declare changed integer; begin
  if not exists(select 1 from public.catalog_products where id='catalog-publication-regression-test') then raise exception 'Admin cannot read archive'; end if;
  update public.catalog_products set archived=false,published=true,price=123.45 where id='catalog-publication-regression-test';
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'Admin cannot republish'; end if;
end $$;
reset role;
rollback;
