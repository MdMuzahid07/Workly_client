/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DashboardAdminPlansHeader from '@/components/dashboard/dashboard-nav/header/DashboardAdminPlansHeader';
import AdvancedPlanBuilderDialog from '@/components/dashboard/plans/AdvancedPlanBuilderDialog';
import EditPlanDialog from '@/components/dashboard/plans/EditPlanDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  useCreatePlanMutation,
  useGetPlansQuery,
  useTogglePlanStatusMutation,
  useUpdatePlanMutation,
} from '@/redux/feature/plan/planApi';
import AdminPlansSkeleton from '@/skeleton/dashboard/admin/AdminPlansSkeleton';
import { Cloud, Rocket, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CustomPlanBanner } from './components/CustomPlanBanner';
import { PlanCard } from './components/PlanCard';
import { PlanStatsGrid } from './components/PlanStatsGrid';

const AdminPlansManagementView = () => {
  const [activeTab, setActiveTab] = useState('employer');

  // Modal States
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [isAdvancedBuilderOpen, setIsAdvancedBuilderOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Dynamic API integration
  const { data: plansRes, isLoading } = useGetPlansQuery({
    type: activeTab as any,
  });
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [togglePlanStatus] = useTogglePlanStatusMutation();

  const plans = plansRes?.data || [];

  if (isLoading) {
    return <AdminPlansSkeleton />;
  }

  const handleToggleStatus = async (id: string) => {
    try {
      await togglePlanStatus(id).unwrap();
      toast.success('Plan status toggled successfully!');
    } catch (err) {
      console.error('Failed to toggle status:', err);
      toast.error('Failed to toggle plan status. Please try again.');
    }
  };

  const handleEditPlan = async (updatedPlan: any) => {
    try {
      const original = plans.find((p: any) => p.id === updatedPlan.id);
      await updatePlan({
        id: updatedPlan.id,
        name: original?.name || updatedPlan.name,
        price: parseFloat(updatedPlan.price),
        description: updatedPlan.description,
        features: updatedPlan.features,
        firstTimeDiscountPercent: updatedPlan.firstTimeDiscountPercent,
      }).unwrap();
      toast.success('Plan updated successfully!');
    } catch (err) {
      console.error('Failed to edit plan:', err);
      toast.error('Failed to edit plan features. Please try again.');
    }
  };

  const handleCreatePlan = async (newPlan: any) => {
    try {
      const prefix = activeTab === 'employer' ? 'emp_' : 'cand_';
      const cleanName = prefix + newPlan.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

      await createPlan({
        name: cleanName,
        planType: activeTab === 'employer' ? 'EMPLOYER' : 'JOB_SEEKER',
        isCustom: true,
        price: parseFloat(newPlan.price),
        description: newPlan.description,
        features: newPlan.features,
        maxActiveJobs: newPlan.maxActiveJobs,
        maxUsers: newPlan.maxUsers,
        interval: 'month',
        isActive: true,
      }).unwrap();
      toast.success('Custom plan deployed successfully!');
    } catch (err) {
      console.error('Failed to create plan:', err);
      toast.error('Failed to deploy new custom plan. Please try again.');
    }
  };

  const mapPlanForCard = (p: any) => {
    const nameLower = p.name.toLowerCase();
    let icon = Cloud;
    let color = 'bg-slate-500';
    let featured = false;

    if (nameLower.includes('starter')) {
      icon = Rocket;
      color = 'bg-primary';
      featured = true;
    } else if (nameLower.includes('pro')) {
      icon = ShieldCheck;
      color = 'bg-indigo-600';
      featured = true;
    } else if (nameLower.includes('elite') || nameLower.includes('enterprise')) {
      icon = ShieldCheck;
      color = 'bg-violet-600';
    }

    let parsedFeatures: string[] = [];
    let planFeatures: any = {};
    if (typeof p.features === 'object' && p.features !== null) {
      planFeatures = p.features;
    } else if (typeof p.features === 'string') {
      try {
        planFeatures = JSON.parse(p.features);
      } catch {
        planFeatures = {};
      }
    }

    if (Array.isArray(planFeatures)) {
      parsedFeatures = planFeatures;
    } else if (Array.isArray(planFeatures.displayFeatures)) {
      parsedFeatures = planFeatures.displayFeatures;
    } else {
      // Robust Fallback: dynamically generate readable feature list from plan keys!
      parsedFeatures = [];
      if (p.planType === 'JOB_SEEKER') {
        const apps = planFeatures.maxMonthlyApplications;
        const resumes = planFeatures.maxResumes;
        if (apps !== undefined && apps !== null) {
          parsedFeatures.push(
            apps >= 9999 ? 'Unlimited job applications' : `${apps} job applications per month`,
          );
        }
        if (resumes !== undefined && resumes !== null) {
          parsedFeatures.push(
            resumes >= 9999 ? 'Unlimited CV uploads' : `${resumes} active CV uploads`,
          );
        }
        if (planFeatures.canMessageEmployer) {
          parsedFeatures.push('Direct messaging to HR');
        }
        if (planFeatures.isFeaturedProfile) {
          parsedFeatures.push('Featured candidate profile');
        }
        if (planFeatures.canViewProfileAnalytics) {
          parsedFeatures.push('Profile view analytics');
        }
      } else {
        const jobs = planFeatures.maxActiveJobs ?? p.maxActiveJobs;
        const usersCount = planFeatures.maxUsers ?? p.maxUsers;
        if (jobs !== undefined && jobs !== null) {
          parsedFeatures.push(
            jobs >= 9999 ? 'Unlimited active jobs' : `${jobs} active job listings`,
          );
        }
        if (usersCount !== undefined && usersCount !== null) {
          parsedFeatures.push(
            usersCount >= 9999 ? 'Unlimited user accounts' : `${usersCount} user accounts`,
          );
        }
        if (planFeatures.canMessage) {
          parsedFeatures.push('Direct candidate messaging');
        }
        if (planFeatures.canViewAnalytics) {
          parsedFeatures.push('Advanced analytics dashboard');
        }
      }
    }

    const firstTimeDiscountPercent = Number(planFeatures?.firstTimeDiscountPercent || 0);

    const readableName = p.name
      .replace('emp_', '')
      .replace('cand_', '')
      .split('_')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      id: p.id,
      dbName: p.name,
      name: readableName,
      description: p.description || '',
      price: p.price,
      currency: p.currency || 'BDT',
      interval: p.interval || 'month',
      active: p.isActive,
      maxActiveJobs: p.maxActiveJobs,
      maxUsers: p.maxUsers,
      planType: p.planType,
      maxMonthlyApplications: planFeatures?.maxMonthlyApplications ?? null,
      maxResumes: planFeatures?.maxResumes ?? null,
      firstTimeDiscountPercent,
      subscriberCount: p.subscriberCount ?? 0,
      color,
      icon,
      featured,
      features: parsedFeatures,
    };
  };

  const activePlansList = plans.map(mapPlanForCard);

  return (
    <div className="min-h-screen min-w-0 pt-16 lg:pt-20">
      <DashboardAdminPlansHeader onCreatePlanClick={() => setIsAdvancedBuilderOpen(true)} />

      <div className="animate-in fade-in mx-auto max-w-full min-w-0 space-y-10 px-4 py-8 duration-500 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <PlanStatsGrid plans={activePlansList} />

        {/* Stateful Tab Selector for Employer vs Candidate Packages */}
        <div className="border-border/50 flex justify-center border-b pt-4 pb-6">
          <div className="bg-card flex items-center gap-1 rounded-full border p-1.5">
            <Button
              onClick={() => setActiveTab('employer')}
              className={cn(
                'h-auto gap-1.5 rounded-full px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all',
                activeTab === 'employer'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground bg-transparent',
              )}
            >
              Employer Packages
            </Button>
            <Button
              onClick={() => setActiveTab('candidate')}
              className={cn(
                'h-auto gap-1.5 rounded-full px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all',
                activeTab === 'candidate'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground bg-transparent',
              )}
            >
              Candidate Packages
            </Button>
          </div>
        </div>

        {/* Plans Management Grid */}
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {activePlansList.map((plan: any) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={(p) => {
                setSelectedPlan(p);
                setIsEditPlanOpen(true);
              }}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>

        {/* Action Banner */}
        <CustomPlanBanner onClick={() => setIsAdvancedBuilderOpen(true)} />
      </div>

      {/* Dialogs */}
      <EditPlanDialog
        open={isEditPlanOpen}
        onOpenChange={setIsEditPlanOpen}
        plan={selectedPlan}
        onSuccess={handleEditPlan}
      />
      <AdvancedPlanBuilderDialog
        open={isAdvancedBuilderOpen}
        onOpenChange={setIsAdvancedBuilderOpen}
        onSuccess={handleCreatePlan}
      />
    </div>
  );
};

export default AdminPlansManagementView;
