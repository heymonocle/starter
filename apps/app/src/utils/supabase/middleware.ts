import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "../../types/database";

interface MiddlewareResponse {
  supabase: SupabaseClient;
  response: NextResponse;
}

export const createClient = (request: NextRequest): MiddlewareResponse => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase URL and/or ANON KEY are not defined");
  }

  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // If the cookie is updated, update the cookies for the request and response
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Prevent TS error  */
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Prevent TS error  */
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        // If the cookie is removed, update the cookies for the request and response
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Prevent TS error  */
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Prevent TS error  */
        response.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  return { supabase, response };
};
