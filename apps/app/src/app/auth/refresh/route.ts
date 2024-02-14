import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../utils/supabase/server";

interface OAuthResponseData {
  access_token: string;
}

export async function GET(): Promise<NextResponse> {
  const clientId = process.env.SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!clientId || !clientSecret) {
    throw new Error("Client ID or Client Secret is not defined");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  try {
    const { data } = await supabase
      .from("users")
      .select("provider_refresh_token")
      .single();

    if (!data) {
      throw new Error("No rows returned.");
    }

    const { provider_refresh_token: providerRefreshToken } = data;

    if (!providerRefreshToken) {
      throw new Error("No rows returned.");
    }

    const params = new URLSearchParams();
    params.append("refresh_token", providerRefreshToken);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "refresh_token");

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const { access_token: providerToken } =
      (await response.json()) as OAuthResponseData;

    await supabase.from("users").upsert({
      id: user.id,
      provider_token: providerToken,
      updated_at: new Date().toISOString(),
    });

    return new NextResponse(JSON.stringify({ status: providerToken }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to refresh token" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
}
