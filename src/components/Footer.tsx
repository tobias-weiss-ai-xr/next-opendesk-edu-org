import {Link} from '@/i18n/navigation';
import EmailLink from "@/components/EmailLink";

interface FooterProps {
  locale: string;
}

// The locale prop is reserved for future locale-dependent behavior
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Footer(_props: FooterProps) {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/imprint" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Imprint
            </Link>
            <Link href="/privacy" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Privacy
            </Link>
            <EmailLink className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Contact
            </EmailLink>
          </div>
          <p className="text-xs text-foreground-secondary">
            &copy; {new Date().getFullYear()} openDesk Edu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
