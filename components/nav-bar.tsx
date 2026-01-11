"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { DEFAULT_SEO } from "@/app/config/constants";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, LogOut, Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { SignOutHandler } from "./sign-out-handler";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavBar = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const navConfig = {
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Docs", href: "/docs" },
    ],
    droppable: {
      title: "droppable",
      items: [
        { label: "item1", href: "/item1" },
        { label: "item2", href: "/item2" },
      ],
    },
  };

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
              <Image src={DEFAULT_SEO.image} alt="Logo" loading="eager" width={120} height={120} />
            ) : (
              DEFAULT_SEO.title
            )}
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navConfig.links.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href} className={navigationMenuTriggerStyle()}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Navigation Dropdown Style Menu Item */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{navConfig.droppable.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <ul className="grid w-[200px] gap-3 p-4">
                      {navConfig.droppable.items.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {/* Dropdown Style Menu Item */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={
                      navigationMenuTriggerStyle() + " cursor-pointer flex items-center gap-1"
                    }
                  >
                    {navConfig.droppable.title}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {navConfig.droppable.items.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <Link href={item.href} className="cursor-pointer">
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {/* User Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-background ring-primary/10 hover:ring-primary/30 transition-all">
                        <AvatarImage src={user?.avatar_url || ""} alt={user?.full_name || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                          {user?.full_name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm font-semibold leading-none">
                          {user?.full_name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate py-1">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Theme Toggle */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                      Theme
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                      {theme === "light" && <span className="ml-auto text-primary">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                      {theme === "dark" && <span className="ml-auto text-primary">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                      <Monitor className="mr-2 h-4 w-4" />
                      <span>System</span>
                      {theme === "system" && <span className="ml-auto text-primary">✓</span>}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <SignOutHandler />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signin"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Button variant="default">
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
