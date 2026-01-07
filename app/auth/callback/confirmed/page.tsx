"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { LoadingSpinner } from "@/components/loading-spinner";
import { APP_URL } from "@/app/config/constants";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      if (!loading) {
        if (user) {
          window.location.href = APP_URL;
        } else {
          router.replace("/auth/signin");
        }
      }
    };

    handleCallback();
  }, [user, loading, router, searchParams]);

  return <LoadingSpinner />;
}
