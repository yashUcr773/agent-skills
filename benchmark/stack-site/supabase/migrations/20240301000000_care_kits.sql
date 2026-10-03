create table public.kit_claims (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  address text not null,
  created_at timestamptz not null default now()
);

-- Claims are written by the server only.
alter table public.kit_claims enable row level security;
