import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_SEO } from "@/app/config/constants";

export const Footer = () => {
  const linkStyle = "hover:text-primary transition-colors duration-200";

  return (
    <footer className="bg-background/95 backdrop-blur text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-foreground">{DEFAULT_SEO.title}</h3>
              <Badge variant="secondary">v1.0</Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">{DEFAULT_SEO.description}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/features" className={linkStyle}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={linkStyle}>
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link href="/help" className={linkStyle}>
                  Help Center
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className={linkStyle}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              {/* <li>
                <Link href="/about" className={linkStyle}>
                  About Us
                </Link>
              </li> */}
              <li>
                <Link href="/legal#privacy" className={linkStyle}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal#terms" className={linkStyle}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal#licenses" className={linkStyle}>
                  Open Source Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/docs" className={linkStyle}>
                  Documentation
                </Link>
              </li>
              {/* <li>
                <Link href="/docs#api" className={linkStyle}>
                  API Reference
                </Link>
              </li> */}
              <li>
                <Link href="/changelog" className={linkStyle}>
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>&copy; 2026 {DEFAULT_SEO.title}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
