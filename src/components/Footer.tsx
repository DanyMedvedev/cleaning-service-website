import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Send, Youtube } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Send, href: 'https://t.me', label: 'Telegram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useTranslation();
  
  const footerLinks = [
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.regular_cleaning'), href: '/services/apartment' },
        { label: t('footer.deep_cleaning'), href: '/services/airbnb' },
        { label: t('footer.moveout_cleaning'), href: '/services/extras' },
        { label: t('footer.office_cleaning'), href: '/services/office' },
      ],
    },
  ];

  const companyLinks = [
    { label: t('footer.about_us'), href: '#' },
    { label: t('footer.contact'), href: '#' },
    { label: t('footer.faq'), href: '#' },
    { label: t('footer.reviews'), href: '#' },
  ];
  
  return (
    <footer className="bg-background border-t border-blue-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Logo & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-text tracking-tight">
                Czysty Dom cleaning service
              </span>
            </Link>
            <p className="text-text/70 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
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

          {/* Company */}
          <div>
            <h3 className="text-text font-bold text-lg mb-6">{t('footer.company')}</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
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

          {/* Contact */}
          <div>
            <h3 className="text-text font-bold text-lg mb-6">{t('footer.contact_us')}</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+48731751255" className="text-primary font-bold hover:underline">
                  +48 731 751 255
                </a>
              </li>
              <li className="text-text/70 text-sm font-medium">
                <a href="mailto:Aleksejoleksa286@gmail.com" className="hover:text-primary">
                  Aleksejoleksa286@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-50 pt-8 flex flex-col sm:row items-center justify-between gap-4">
          <p className="text-text/50 text-xs font-medium">
            © 2026 Czysty Dom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
