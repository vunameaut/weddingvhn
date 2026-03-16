create table if not exists public.rsvp_submissions (
  id bigserial primary key,
  name text not null,
  guest_of text,
  number_of_guests int not null default 1,
  wishes text,
  created_at timestamptz not null default now()
);

alter table public.rsvp_submissions enable row level security;

create policy "Allow public insert"
on public.rsvp_submissions
for insert
to anon
with check (true);

create policy "Allow public read wishes"
on public.rsvp_submissions
for select
to anon
using (true);
