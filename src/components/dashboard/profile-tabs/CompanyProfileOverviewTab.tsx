'use client';
import { SectionCard } from '@/components/main/profile/SectionCard';
import { TabsContent } from '@radix-ui/react-tabs';
import { Briefcase, Eye, Rocket, Target, Users } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import WKTextArea from '../../form/WkTextArea';

import type { CompanyProfile } from '@/types/company-profile';

const CompanyProfileOverviewTab = ({
  currentProfile,
  isEditing,
  updateField,
  editedProfile,
}: {
  currentProfile: CompanyProfile;
  isEditing: boolean;
  updateField: (field: string, value: unknown) => void;
  editedProfile: Partial<CompanyProfile>;
}) => {
  const methods = useForm({
    mode: 'onChange',
    values: {
      description: editedProfile?.description || '',
      mission: editedProfile?.mission || '',
    },
  });

  const stats = useMemo(
    () => [
      {
        label: 'Total Jobs',
        value: currentProfile?.stats?.totalJobs || 0,
        icon: Briefcase,
        color: '',
        iconColor: 'text-blue-600',
      },
      {
        label: 'Applications',
        value: currentProfile?.stats?.totalApplications || 0,
        icon: Target,
        color: '',
        iconColor: 'text-emerald-600',
      },
      {
        label: 'Team members',
        value: currentProfile?.stats?.totalTeamMembers || 0,
        icon: Users,
        color: '',
        iconColor: 'text-orange-600',
      },
      {
        label: 'Profile Views',
        value: currentProfile?.stats?.profileViews || 0,
        icon: Eye,
        color: '',
        iconColor: 'text-purple-600',
      },
    ],
    [currentProfile?.stats],
  );

  useEffect(() => {
    const subscription = methods.watch(
      (value: { description?: string; mission?: string }, { name }) => {
        if (name && value[name] !== undefined) {
          updateField(name, value[name]);
        }
      },
    );
    return () => subscription.unsubscribe();
  }, [methods, updateField]);

  return (
    <TabsContent value="overview" className="space-y-10 focus:outline-none">
      {/* Premium Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-card relative overflow-hidden rounded-xl border p-4 shadow-xs backdrop-blur-md sm:p-6`}
          >
            <div className="relative z-10 flex flex-col gap-2 sm:gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-white/80 backdrop-blur-sm sm:h-12 sm:w-12 dark:bg-black/20`}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-muted-foreground truncate text-[11px] font-semibold tracking-wider uppercase sm:text-xs">
                  {stat.label}
                </p>
                <h4 className="text-foreground mt-0.5 text-xl font-bold tracking-tight sm:text-3xl">
                  {stat.value.toLocaleString()}
                </h4>
              </div>
            </div>
            {/* Decorative background shape */}
            <div className="bg-primary/5 absolute -right-4 -bottom-4 h-24 w-24 rounded-full blur-2xl" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <FormProvider {...methods}>
          <SectionCard
            title="About the Company"
            isCompleted={!!currentProfile?.description}
            className="h-full"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Rocket className="text-primary h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-foreground text-sm font-semibold">Company Story & Vision</p>
                  <p className="text-muted-foreground text-xs">
                    Share your {`company's`} history, goals, and what makes it unique.
                  </p>
                </div>
              </div>

              {isEditing ? (
                <WKTextArea
                  name="description"
                  label="Description"
                  placeholder="Tell potential candidates who you are..."
                  className="min-h-[250px] resize-none"
                />
              ) : (
                <div className="text-muted-foreground bg-muted/30 min-h-[150px] rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {currentProfile?.description || 'No description provided yet.'}
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Our Mission Statement"
            isCompleted={!!currentProfile?.mission}
            className="h-full"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-foreground text-sm font-semibold">Purpose & Values</p>
                  <p className="text-muted-foreground text-xs">
                    What drives your team every day? Define your core mission.
                  </p>
                </div>
              </div>

              {isEditing ? (
                <WKTextArea
                  name="mission"
                  label="Mission"
                  placeholder="What is your company's core mission?"
                  className="min-h-[250px] resize-none"
                />
              ) : (
                <div className="text-muted-foreground bg-muted/30 min-h-[150px] rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {currentProfile?.mission || "Mission statement hasn't been defined."}
                </div>
              )}
            </div>
          </SectionCard>
        </FormProvider>
      </div>
    </TabsContent>
  );
};

export default CompanyProfileOverviewTab;
