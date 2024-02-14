import type { Metadata } from "next";
import Link from "next/link";
import AuthenticationPage from "../components/auth-page";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page(): JSX.Element {
  return (
    <AuthenticationPage
      action="sign-in"
      subTitle={
        <>
          Or{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/sign-up"
          >
            sign up
          </Link>{" "}
          to get started
        </>
      }
      title="Sign in to your account"
    />
  );
}
