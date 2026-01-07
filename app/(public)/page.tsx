"use client";

import { useAuth } from "@/contexts/auth-context";
import { SignOutHandler } from "@/components/sign-out-handler";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();

  return (
    <>
      <div>home</div>
      <div>{user ? `signed in as ${user.email}` : "not signed in"}</div>
      {user && (
        <Button>
          <SignOutHandler />
        </Button>
      )}
    </>
  );
}
