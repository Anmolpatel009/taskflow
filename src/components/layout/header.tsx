
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: '/find-work', label: 'Find Work' },
  { href: '/find-talent', label: 'Find Talent' },
  { href: '/why-talentflow', label: 'Why TalentFlow' },
  { href: '/one-percent-club', label: 'The 1% Club' },
  { href: '/build-together', label: 'Build Together' },
];

const NavLink = ({ href, label, hasDropdown = false, children, onLinkClick }: { href?: string, label: string, hasDropdown?: boolean, children?: React.ReactNode, onLinkClick?: () => void }) => {
    if (href) {
        return (
            <Link href={href} className="group nav-btn flex items-center gap-1 transition-colors hover:text-primary text-foreground/80" onClick={onLinkClick}>
                {label}
            </Link>
        );
    }
    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group nav-btn flex items-center gap-1 transition-colors hover:text-primary text-foreground/80 outline-none">
                    {label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background w-full border-b sticky top-0 z-40">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
              <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM12 3a9 9 0 100 18 9 9 0 000-18zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
            </svg>
          <span className="font-bold text-2xl font-headline text-primary">
            TalentFlow
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-2 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
           <NavLink label="Explore" hasDropdown>
                <DropdownMenuItem asChild>
                    <Link href="/nearby">Nearby</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/showall">Show All</Link>
                </DropdownMenuItem>
            </NavLink>
        </nav>

        <div className="hidden lg:flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Join Now</Link>
            </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
             <Button variant="outline" size="sm" asChild className="px-2">
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild className="px-2">
              <Link href="/signup">Join Now</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm">
                 <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col h-full">
                    <div className="border-b pb-4">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
                                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM12 3a9 9 0 100 18 9 9 0 000-18zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold text-2xl font-headline text-primary">TalentFlow</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                     <Link href="/nearby" className="text-lg font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Nearby</Link>
                     <Link href="/showall" className="text-lg font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Show All</Link>
                    </nav>
                    <div className="mt-auto flex flex-col gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Join Now</Link>
                        </Button>
                    </div>
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
