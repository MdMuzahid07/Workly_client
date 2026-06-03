/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardAdminPlansHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminPlansHeader";
import AdvancedPlanBuilderDialog from "@/components/dashboard/plans/AdvancedPlanBuilderDialog";
import EditPlanDialog from "@/components/dashboard/plans/EditPlanDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cloud, Rocket, ShieldCheck } from "lucide-react";
import { useState } from "react";
import AdminPlansSkeleton from "@/skeleton/dashboard/admin/AdminPlansSkeleton";
import { CustomPlanBanner } from "./components/CustomPlanBanner";
import { PlanCard } from "./components/PlanCard";
import { PlanStatsGrid } from "./components/PlanStatsGrid";
import {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useTogglePlanStatusMutation,
} from "@/redux/feature/plan/planApi";
import { toast } from "sonner";

const AdminPlansManagementView = () => {
  const [activeTab, setActiveTab] = useState("employer");

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
      toast.success("Plan status toggled successfully!");
    } catch (err) {
      console.error("Failed to toggle status:", err);
      toast.error("Failed to toggle plan status. Please try again.");
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
      }).unwrap();
      toast.success("Plan updated successfully!");
    } catch (err) {
      console.error("Failed to edit plan:", err);
      toast.error("Failed to edit plan features. Please try again.");
    }
  };

  const handleCreatePlan = async (newPlan: any) => {
    try {
      const prefix = activeTab === "employer" ? "emp_" : "cand_";
      const cleanName =
        prefix + newPlan.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");

      await createPlan({
        name: cleanName,
        price: parseFloat(newPlan.price),
        description: newPlan.description,
        features: newPlan.features,
        maxActiveJobs: newPlan.maxActiveJobs,
        maxUsers: newPlan.maxUsers,
        interval: "month",
        isActive: true,
      }).unwrap();
      toast.success("Custom plan deployed successfully!");
    } catch (err) {
      console.error("Failed to create plan:", err);
      toast.error("Failed to deploy new custom plan. Please try again.");
    }
  };

  const mapPlanForCard = (p: any) => {
    const nameLower = p.name.toLowerCase();
    let icon = Cloud;
    let color = "bg-slate-500";
    let featured = false;

    if (nameLower.includes("starter")) {
      icon = Rocket;
      color = "bg-primary";
      featured = true;
    } else if (nameLower.includes("pro")) {
      icon = ShieldCheck;
      color = "bg-indigo-600";
      featured = true;
    } else if (
      nameLower.includes("elite") ||
      nameLower.includes("enterprise")
    ) {
      icon = ShieldCheck;
      color = "bg-violet-600";
    }

    let parsedFeatures: string[] = [];
    if (Array.isArray(p.features)) {
      parsedFeatures = p.features;
    } else if (typeof p.features === "string") {
      try {
        parsedFeatures = JSON.parse(p.features);
      } catch {
        parsedFeatures = [];
      }
    }

    const readableName = p.name
      .replace("emp_", "")
      .replace("cand_", "")
      .split("_")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      id: p.id,
      dbName: p.name,
      name: readableName,
      description: p.description || "",
      price: p.price,
      currency: p.currency || "BDT",
      interval: p.interval || "month",
      active: p.isActive,
      maxActiveJobs: p.maxActiveJobs,
      maxUsers: p.maxUsers,
      subscriberCount: p.name.includes("free")
        ? 842
        : p.name.includes("starter")
          ? 382
          : 154,
      color,
      icon,
      featured,
      features: parsedFeatures,
    };
  };

  const activePlansList = plans.map(mapPlanForCard);

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
