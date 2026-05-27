/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardAdminPlansHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminPlansHeader";
import AdvancedPlanBuilderDialog from "@/components/dashboard/plans/AdvancedPlanBuilderDialog";
import EditPlanDialog from "@/components/dashboard/plans/EditPlanDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cloud, Rocket, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CustomPlanBanner } from "./components/CustomPlanBanner";
import { PlanCard } from "./components/PlanCard";
import { PlanStatsGrid } from "./components/PlanStatsGrid";

const AdminPlansManagementView = () => {
  const [activeTab, setActiveTab] = useState("employer");

  // Modal States
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [isAdvancedBuilderOpen, setIsAdvancedBuilderOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Mock data for employer plans
  const [employerPlans, setEmployerPlans] = useState([
    {
      id: "emp_free",
      name: "Free Package",
      description:
        "Get started with professional local recruiting at zero cost.",
      price: 0,
      currency: "BDT",
      interval: "month",
      active: true,
      maxActiveJobs: 1,
      maxUsers: 1,
      subscriberCount: 842,
      color: "bg-slate-500",
      icon: Cloud,
      features: [
        "1 Active Job Listing",
        "Basic Recruiting Tools",
        "Standard Resume Search",
        "Email Support",
      ],
    },
    {
      id: "emp_starter",
      name: "Starter Package",
      description:
        "Best for growing teams and focused local recruiting campaigns.",
      price: 4999,
      currency: "BDT",
      interval: "month",
      active: true,
      maxActiveJobs: 5,
      maxUsers: 2,
      subscriberCount: 382,
      color: "bg-primary",
      icon: Rocket,
      featured: true,
      features: [
        "5 Active Job Listings",
        "Priority Support",
        "Instant Candidate Alerts",
        "Advanced Applicant Filters",
      ],
    },
    {
      id: "emp_pro",
      name: "Professional Package",
      description: "The ultimate recruiting solution with high discount rates.",
      price: 14999,
      currency: "BDT",
      interval: "month",
      active: true,
      maxActiveJobs: 15,
      maxUsers: 5,
      subscriberCount: 154,
      color: "bg-indigo-600",
      icon: ShieldCheck,
      features: [
        "15 Active Job Listings",
        "Featured Postings Badge",
        "Full HR Pipeline Tool",
        "1-on-1 Recruiting Counsel",
      ],
    },
  ]);

  // Mock data for candidate plans
  const [candidatePlans, setCandidatePlans] = useState([
    {
      id: "cand_free",
      name: "Free Seeker",
      description:
        "Standard job search and profile builder for everyday candidates.",
      price: 0,
      currency: "BDT",
      interval: "month",
      active: true,
      maxActiveJobs: 40,
      maxUsers: 1,
      subscriberCount: 1420,
      color: "bg-slate-400",
      icon: Cloud,
      features: [
        "Up to 40 Job Applications/mo",
        "Single Resume Upload",
        "Standard Profile Search",
        "In-App Notifications",
      ],
    },
    {
      id: "cand_pro",
      name: "Pro Candidate",
      description:
        "Perfect for active job seekers looking for profile boosts and direct HR connections.",
      price: 199,
      currency: "BDT",
      interval: "month",
      active: true,
      maxActiveJobs: 120,
      maxUsers: 5,
      subscriberCount: 680,
      color: "bg-primary",
      icon: Rocket,
      featured: true,
      features: [
        "Up to 120 Job Applications/mo",
        "Multiple Resumes Uploads",
        "Priority Profile Boost",
        "Direct Messaging to HRs",
        "Who Viewed My Profile Tracker",
      ],
    },
    {
      id: "cand_elite",
      name: "Elite Seeker",
      description:
        "Complete career acceleration package including mock interviews and direct counseling.",
      price: 499,
      currency: "BDT",
      interval: "month",
      active: true,
      maxActiveJobs: 9999,
      maxUsers: 9999,
      subscriberCount: 290,
      color: "bg-violet-600",
      icon: ShieldCheck,
      features: [
        "Unlimited Job Applications",
        "Unlimited Resume Uploads",
        "5x Profile Featured Boost",
        "1-on-1 Monthly Counseling",
        "1 Mock Interview prep/mo",
      ],
    },
  ]);

  const handleToggleStatus = (id: string) => {
    if (activeTab === "employer") {
      setEmployerPlans(
        employerPlans.map((p) =>
          p.id === id ? { ...p, active: !p.active } : p,
        ),
      );
    } else {
      setCandidatePlans(
        candidatePlans.map((p) =>
          p.id === id ? { ...p, active: !p.active } : p,
        ),
      );
    }
  };

  const handleEditPlan = (updatedPlan: any) => {
    if (activeTab === "employer") {
      setEmployerPlans(
        employerPlans.map((p) =>
          p.id === updatedPlan.id
            ? { ...updatedPlan, price: parseFloat(updatedPlan.price) }
            : p,
        ),
      );
    } else {
      setCandidatePlans(
        candidatePlans.map((p) =>
          p.id === updatedPlan.id
            ? { ...updatedPlan, price: parseFloat(updatedPlan.price) }
            : p,
        ),
      );
    }
  };

  const handleCreatePlan = (newPlan: any) => {
    if (activeTab === "employer") {
      setEmployerPlans([...employerPlans, newPlan]);
    } else {
      setCandidatePlans([...candidatePlans, newPlan]);
    }
  };

  const activePlansList =
    activeTab === "employer" ? employerPlans : candidatePlans;

  return (
    <div className="min-h-screen min-w-0 pt-16 lg:pt-20">
      <DashboardAdminPlansHeader
        onCreatePlanClick={() => setIsAdvancedBuilderOpen(true)}
      />

      <div className="animate-in fade-in mx-auto max-w-full min-w-0 space-y-10 px-4 py-8 duration-500 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <PlanStatsGrid />

        {/* Stateful Tab Selector for Employer vs Candidate Packages */}
        <div className="border-border/50 flex justify-center border-b pt-4 pb-6">
          <div className="bg-muted/50 flex items-center gap-1 rounded-2xl border p-1.5">
            <Button
              onClick={() => setActiveTab("employer")}
              className={cn(
                "h-auto gap-1.5 rounded-xl px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all",
                activeTab === "employer"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground bg-transparent",
              )}
            >
              Employer Packages
            </Button>
            <Button
              onClick={() => setActiveTab("candidate")}
              className={cn(
                "h-auto gap-1.5 rounded-xl px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all",
                activeTab === "candidate"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground bg-transparent",
              )}
            >
              Candidate Packages
            </Button>
          </div>
        </div>

        {/* Plans Management Grid */}
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {activePlansList.map((plan) => (
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
