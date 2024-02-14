"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { getURL } from "../utils/helpers";

export const googleAuth = async (): Promise<void> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getURL()}/auth/callback`,
      scopes: "https://www.googleapis.com/auth/webmasters",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (data.url) {
    return redirect(data.url);
  }

  throw new Error("URL is null");
};
