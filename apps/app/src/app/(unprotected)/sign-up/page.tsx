import type { Metadata } from "next";
import Link from "next/link";
import AuthenticationPage from "../components/auth-page";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page(): JSX.Element {
  return (
    <AuthenticationPage
      action="sign-up"
      subTitle={
        <>
          Already have an account?{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/sign-in"
          >
            Sign in
          </Link>
        </>
      }
      title="Create an account"
    />
  );
}
