'use client';

import DashboardAdminLegalHeader from '@/components/dashboard/dashboard-nav/header/DashboardAdminLegalHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Edit3, Eye, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const AdminLegalOverview = () => {
  const legalPages = [
    {
      title: 'Privacy Policy',
      description: 'Data collection, usage, and protection rules.',
      href: '/admin/legal/privacy-policy',
      lastUpdated: 'Mar 14, 2026',
      status: 'Published',
    },
    {
      title: 'Terms of Service',
      description: 'General rules and conditions for using the platform.',
      href: '/admin/legal/terms-of-service',
      lastUpdated: 'Mar 14, 2026',
      status: 'Published',
    },
    {
      title: 'Accessibility Statement',
      description: 'Commitment to platform accessibility and WCAG standards.',
      href: '/admin/legal/accessibility-statement',
      lastUpdated: 'Mar 14, 2026',
      status: 'Published',
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookie usage and tracking.',
      href: '/admin/legal/cookie-policy',
      lastUpdated: 'Mar 14, 2026',
      status: 'Published',
    },
    {
      title: 'User Agreements',
      description: 'Legal agreements for different types of platform users.',
      href: '/admin/legal/user-agreements',
      lastUpdated: 'Mar 14, 2026',
      status: 'Published',
    },
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminLegalHeader title="Legal & Compliance" showSaveButton={false} />

      <div className="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {legalPages.map((page, index) => (
            <Card
              key={index}
              className="bg-card border-border/50 hover:border-primary/30 group relative overflow-hidden rounded-2xl border shadow-none transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-green-500 uppercase">
                    {page.status}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <div className="border-border/40 mt-6 flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="text-muted-foreground h-3.5 w-3.5" />
                    <span className="text-muted-foreground text-xs font-medium">
                      {page.lastUpdated}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={page.href.replace('/admin', '')} target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 hover:text-primary h-8 w-8 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={page.href}>
                      <Button size="sm" className="h-8 gap-2 rounded-lg font-bold">
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <Card className="bg-primary/5 border-primary/10 mt-12 rounded-2xl border border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Compliance Status</h4>
                <p className="text-muted-foreground text-sm">
                  All your legal documents are up to date and comply with the latest platform
                  standards.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-primary/20 bg-background hover:bg-primary/5 h-12 rounded-xl px-8 font-bold"
            >
              Review Compliance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLegalOverview;
