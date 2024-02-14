"use client";

import { useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

const supabase = createClient();

function RefreshProviderToken(): null {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (["INITIAL_SESSION", "TOKEN_REFRESHED"].includes(event)) {
        await fetch("/auth/refresh");
      }
    });

    // Return a cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
export default RefreshProviderToken;
