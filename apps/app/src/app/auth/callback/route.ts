import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '../../../utils/supabase/server';

export async function GET(request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    const userId = data.user?.id;
    const providerToken = data.session?.provider_token;
    const providerRefreshToken = data.session?.provider_refresh_token;

    if (providerToken && providerRefreshToken) {
      await supabase.from('users').update({
        id: userId,
        provider_token: providerToken,
        provider_refresh_token: providerRefreshToken,
        updated_at: new Date().toISOString(),
      });
    } else if (providerToken) {
      await supabase.from('users').update({
        id: userId,
        provider_token: providerToken,
        updated_at: new Date().toISOString(),
      });
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
