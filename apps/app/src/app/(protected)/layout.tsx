import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import RefreshProviderToken from './components/refresh-provider-token';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <RefreshProviderToken />
      {children}
    </>
  );
}
