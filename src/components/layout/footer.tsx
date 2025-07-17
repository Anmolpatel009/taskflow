import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  Categories: [
    { href: '#', label: 'Development & IT' },
    { href: '#', label: 'Design & Creative' },
    { href: '#', label: 'Sales & Marketing' },
    { href: '#', label: 'Writing & Translation' },
  ],
  About: [
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Press & News' },
    { href: '#', label: 'Partnerships' },
    { href: '#', label: 'Privacy Policy' },
  ],
  Support: [
    { href: '#', label: 'Help & Support' },
    { href: '#', label: 'Trust & Safety' },
    { href: '#', label: 'Selling on TalentFlow' },
    { href: '#', label: 'Buying on TalentFlow' },
  ],
  Community: [
    { href: '#', label: 'Events' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Forum' },
    { href: '#', label: 'Podcast' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <Facebook size={20} /> },
  { name: 'Twitter', href: '#', icon: <Twitter size={20} /> },
  { name: 'LinkedIn', href: '#', icon: <Linkedin size={20} /> },
  { name: 'Instagram', href: '#', icon: <Instagram size={20} /> },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="font-headline text-lg font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {title === 'Community' && (
                <div className="flex space-x-4 pt-2">
                  {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href} className="text-gray-400 hover:text-white transition-colors">
                      {social.icon}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TalentFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
