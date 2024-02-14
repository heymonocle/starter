// import { searchconsole } from "@googleapis/searchconsole";
// import { cookies } from "next/headers";
// import { createClient } from "../../utils/supabase/server";

export default function Page(): JSX.Element {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const { data } = await supabase
  //   .from("users")
  //   .select("provider_token")
  //   .single();

  // const { provider_token: providerToken } = data;

  // const search = searchconsole({
  //   version: "v1",
  //   headers: {
  //     Authorization: `Bearer ${providerToken}`,
  //   },
  // });

  // const sites = await search.sites.list();

  return <>hello world</>;
}
