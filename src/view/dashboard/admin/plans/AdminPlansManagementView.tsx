/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardAdminPlansHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminPlansHeader";
import AdvancedPlanBuilderDialog from "@/components/dashboard/plans/AdvancedPlanBuilderDialog";
import EditPlanDialog from "@/components/dashboard/plans/EditPlanDialog";
import { Cloud, Rocket, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CustomPlanBanner } from "./components/CustomPlanBanner";
import { PlanCard } from "./components/PlanCard";
import { PlanStatsGrid } from "./components/PlanStatsGrid";

const AdminPlansManagementView = () => {
  // Modal States
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [isAdvancedBuilderOpen, setIsAdvancedBuilderOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Mock data for plans
  const [plans, setPlans] = useState([
    {
      id: "1",
      name: "Starter",
      description: "Perfect for small teams and startups testing the waters.",
      price: 0,
      currency: "USD",
      interval: "month",
      active: true,
      maxActiveJobs: 2,
      maxUsers: 1,
      subscriberCount: 452,
      color: "bg-slate-500",
      icon: Cloud,
      features: [
        "2 Active Job Listings",
        "Basic Analytics",
        "Public Company Profile",
        "Standard Support",
        "7 Days Visibility",
      ],
    },
    {
      id: "2",
      name: "Professional",
      description:
        "Advanced tools for growing companies with consistent hiring needs.",
      price: 99.0,
      currency: "USD",
      interval: "month",
      active: true,
      maxActiveJobs: 15,
      maxUsers: 5,
      subscriberCount: 1240,
      color: "bg-primary",
      icon: Rocket,
      featured: true,
      features: [
        "15 Active Job Listings",
        "Advanced Analytics Dashboard",
        "Candidate Search & Filters",
        "Priority Support",
        "30 Days Visibility",
        "Custom Branding Options",
      ],
    },
    {
      id: "3",
      name: "Enterprise",
      description:
        "Custom solutions for large scale operations and high-volume recruitment.",
      price: 499.0,
      currency: "USD",
      interval: "month",
      active: true,
      maxActiveJobs: null,
      maxUsers: null,
      subscriberCount: 156,
      color: "bg-indigo-600",
      icon: ShieldCheck,
      features: [
        "Unlimited Job Listings",
        "AI-Powered Matchmaking",
        "Full API Access",
        "Dedicated Account Manager",
        "Custom Retention Periods",
        "White-label Solution",
      ],
    },
  ]);

  const handleToggleStatus = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const handleEditPlan = (updatedPlan: any) => {
    setPlans(
      plans.map((p) =>
        p.id === updatedPlan.id
          ? { ...updatedPlan, price: parseFloat(updatedPlan.price) }
          : p,
      ),
    );
  };

  const handleCreatePlan = (newPlan: any) => {
    setPlans([...plans, newPlan]);
  };

  return (
    <div className="min-h-screen min-w-0 pt-16 lg:pt-20">
      <DashboardAdminPlansHeader
        onCreatePlanClick={() => setIsAdvancedBuilderOpen(true)}
      />

      <div className="mx-auto max-w-full min-w-0 space-y-12 px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <PlanStatsGrid />

        {/* Plans Management Grid */}
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
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
