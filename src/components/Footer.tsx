import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Send, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Send, href: 'https://t.me', label: 'Telegram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Regular Cleaning', href: '#' },
      { label: 'Deep Cleaning', href: '#' },
      { label: 'Move-out Cleaning', href: '#' },
      { label: 'Office Cleaning', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Reviews', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-blue-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                CL
              </div>
              <span className="text-xl font-bold text-text tracking-tight">
                Cleanly
              </span>
            </Link>
            <p className="text-text/70 text-sm leading-relaxed max-w-xs">
              Providing top-quality cleaning services in Warsaw since 2024. Your satisfaction is our priority.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-text font-bold text-lg mb-6">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text/70 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-text font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="text-text/70 text-sm font-medium">
                ul. Marszałkowska 123<br />
                00-001 Warsaw, Poland
              </li>
              <li>
                <a href="tel:+48123456789" className="text-primary font-bold hover:underline">
                  +48 123 456 789
                </a>
              </li>
              <li className="text-text/70 text-sm font-medium">
                support@cleanapp.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-50 pt-8 flex flex-col sm:row items-center justify-between gap-4">
          <p className="text-text/50 text-xs font-medium">
            © 2024 CleanApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium text-text/50">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
