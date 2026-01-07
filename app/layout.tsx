import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { DEFAULT_SEO } from "./config/constants";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { PublicProviders } from "@/contexts/public-providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: DEFAULT_SEO.title,
  description: DEFAULT_SEO.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense>
          <PublicProviders>
            {children}
            <Toaster />
            <ScrollToTop />
          </PublicProviders>
        </Suspense>
      </body>
    </html>
  );
}
