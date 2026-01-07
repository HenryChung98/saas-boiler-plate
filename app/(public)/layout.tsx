import React from "react";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="px-15 py-5 min-h-screen min-w-5xl max-w-8xl">{children}</div>
      <Footer />
    </>
  );
}
