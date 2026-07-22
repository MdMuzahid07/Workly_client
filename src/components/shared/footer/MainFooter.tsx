'use client';

import Link from 'next/link';
import { footerLinks, worklyJobSocials } from '../../../constants';
import WJLogo from '../WJLogo';
import { useGetPublicSystemSettingsQuery } from '@/redux/feature/admin/adminApi';
import { useMemo } from 'react';
import { Linkedin, Facebook, Twitter, Github, Instagram, Youtube, Globe } from 'lucide-react';

const socialIconMap: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  github: <Github className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
};

const MainFooter = () => {
  const { data: settingsData } = useGetPublicSystemSettingsQuery();

  const socials = useMemo(() => {
    const dbSocials = settingsData?.data?.footerSocials;
    if (Array.isArray(dbSocials) && dbSocials.length > 0) {
      return dbSocials.map((item: { platform: string; url: string }) => ({
        href: item.url,
        icon: socialIconMap[item.platform.toLowerCase()] || <Globe className="h-5 w-5" />,
        name: item.platform,
      }));
    }
    return worklyJobSocials.map((item, index) => ({
      ...item,
      name: `social-${index}`,
    }));
  }, [settingsData]);

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-4 pt-12 pb-10 sm:px-6 lg:px-8">
      {/* Subtle Footer Atmosphere */}
      <div className="bg-primary/3 pointer-events-none absolute -right-20 -bottom-20 -z-10 h-80 w-80 rounded-full blur-[100px]" />
      <div className="bg-accent/3 pointer-events-none absolute -top-20 -left-20 -z-10 h-80 w-80 rounded-full blur-[100px]" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-8">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <WJLogo />
          </div>

          <p className="text-muted-foreground/80 mb-5 max-w-sm text-xs leading-relaxed sm:text-sm">
            The {`world's`} largest professional network. Connect with industry leaders, learn
            essential skills, and get hired by top companies worldwide.
          </p>

          <div className="flex items-center gap-2.5">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-primary hover:text-primary border-border/40 text-muted-foreground hover:bg-primary/10 flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs active:scale-95"
                aria-label={`Link to ${social.name || idx}`}
              >
                <div className="h-5 w-5">{social.icon}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col">
            <h4 className="text-foreground/90 mb-4 text-[11px] font-extrabold tracking-widest uppercase sm:text-xs">
              {section.title}
            </h4>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-[13px] font-medium transition-colors duration-200 sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFooter;
