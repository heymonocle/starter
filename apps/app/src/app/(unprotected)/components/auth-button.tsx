'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/button';
import { Icons } from '../../components/icons';

export function AuthButton(): JSX.Element {
  const [pending, setPending] = useState<boolean>(false);

  return (
    <Button
      aria-disabled={pending}
      onClick={() => {
        setPending(true);
      }}
      type="submit"
      variant="outline"
    >
      {!pending ? (
        <Icons.Google className="mr-2 h-4 w-4" />
      ) : (
        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
      )}
      Sign in with Google
    </Button>
  );
}
