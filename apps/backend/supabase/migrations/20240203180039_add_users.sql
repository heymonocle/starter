create table public.users (
  id uuid references auth.users not null,
  provider_token text,
  provider_refresh_token text,
  updated_at timestamp without time zone not null default current_timestamp,
  created_at timestamp without time zone not null default current_timestamp,
  primary key (id)
);

alter table public.users enable row level security;

create policy "Users can select their own profile.."
  on users for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on users for update
  using ( auth.uid() = id );

create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
