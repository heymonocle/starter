import Link from 'next/link';
import { cn } from '@repo/ui/utils';
import { buttonVariants } from '@repo/ui/button';
import { googleAuth } from '../../actions';
import { AuthButton } from './auth-button';

export default function AuthenticationPage({
  action,
  title,
  subTitle,
}: {
  action: 'sign-up' | 'sign-in';
  title: string;
  subTitle: string | JSX.Element;
}): JSX.Element {
  async function create(): Promise<void> {
    'use server';
    return googleAuth(action);
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute lg:hidden left-6 top-6 z-20 flex items-center text-lg font-medium">
        <svg
          className="mr-2 h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Acme Inc
      </div>
      {action === 'sign-up' ? (
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 lg:right-8 lg:top-8',
          )}
          href="/sign-in"
        >
          Sign In
        </Link>
      ) : (
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 lg:right-8 lg:top-8',
          )}
          href="/sign-up"
        >
          Sign Up
        </Link>
      )}

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            className="mr-2 h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-sm">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subTitle}</p>
          </div>
          <div className="grid gap-6">
            <form action={create} className="grid">
              <AuthButton />
            </form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/terms-of-service"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
