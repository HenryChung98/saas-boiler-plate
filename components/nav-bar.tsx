"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { DEFAULT_SEO } from "@/app/config/constants";
import Image from "next/image";

export const NavBar = () => {
  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
          >
            {DEFAULT_SEO.image ? (
              <Image src={DEFAULT_SEO.image} alt={DEFAULT_SEO.title} width={40} height={40} />
            ) : (
              DEFAULT_SEO.title
            )}
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Sign In
            </Link>
            <Button variant="default">
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
