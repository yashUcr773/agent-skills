create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'member',
  internal_notes text,
  created_at timestamptz not null default now()
);

create table public.care_notes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  plant text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.reminders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  plant text not null,
  due_on date not null
);

alter table public.profiles enable row level security;

create policy "profiles are viewable" on public.profiles
  for select using (true);

create policy "profiles can be updated" on public.profiles
  for update using (true);

alter table public.reminders enable row level security;

create policy "members read their reminders" on public.reminders
  for select using (auth.uid() = user_id);

create policy "members add their reminders" on public.reminders
  for insert with check (auth.uid() = user_id);

create policy "members change their reminders" on public.reminders
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "members remove their reminders" on public.reminders
  for delete using (auth.uid() = user_id);

create function public.all_reminders()
returns setof public.reminders
language sql
security definer
as $$
  select * from public.reminders;
$$;

grant execute on function public.all_reminders() to anon, authenticated;

insert into storage.buckets (id, name, public) values ('plant-photos', 'plant-photos', true);

create policy "anyone can upload plant photos" on storage.objects
  for insert with check (bucket_id = 'plant-photos');

create policy "anyone can delete plant photos" on storage.objects
  for delete using (bucket_id = 'plant-photos');

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
