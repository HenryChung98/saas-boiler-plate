"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export const SignOutHandler = ({ className }: { className?: string }) => {
  const { supabase } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error.message);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("signOut exception:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleSignOut} className={`cursor-pointer ${className}`}>
      {loading ? "Signing out..." : "Sign out"}
    </div>
  );
};
