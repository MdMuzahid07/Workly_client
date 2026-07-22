/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Edit, MoreVertical, ToggleLeft, ToggleRight, TrendingUp } from 'lucide-react';

interface PlanCardProps {
  plan: any;
  onEdit: (plan: any) => void;
  onToggleStatus: (id: string) => void;
}

export function PlanCard({ plan, onEdit, onToggleStatus }: PlanCardProps) {
  return (
    <Card
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-xl border-2 transition-all ${
        plan.featured ? 'border-primary shadow-primary/5' : 'border-border'
      }`}
    >
      {plan.featured && (
        <div className="bg-primary absolute top-0 right-0 rounded-bl-xl px-4 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-sm">
          Popular
        </div>
      )}

      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm transition-transform ${plan.color}`}
          >
            <plan.icon className="h-6 w-6" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted h-8 w-8 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-xl border-2 p-2 shadow-lg">
              <DropdownMenuLabel className="px-3 pb-2 text-xs font-bold tracking-widest uppercase opacity-50">
                Plan Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer rounded-lg py-2.5 font-bold"
                onClick={() => onEdit(plan)}
              >
                <Edit className="text-primary mr-3 h-4 w-4" />
                Edit Features
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-lg py-2.5 font-bold"
                onClick={() => onToggleStatus(plan.id)}
              >
                {plan.active ? (
                  <>
                    <ToggleRight className="text-primary mr-3 h-4 w-4" />
                    Archive Plan
                  </>
                ) : (
                  <>
                    <ToggleLeft className="mr-3 h-4 w-4" />
                    Activate Plan
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-dashed" />
              <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5 font-bold">
                <TrendingUp className="mr-3 h-4 w-4 text-blue-500" />
                Usage Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <CardTitle className="text-xl font-bold tracking-tight">{plan.name}</CardTitle>
          <CardDescription className="mt-2 line-clamp-2 min-h-10 leading-relaxed font-medium opacity-80">
            {plan.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-7 pb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight">
            {plan.currency === 'BDT' || plan.currency === '৳'
              ? '৳'
              : plan.currency === 'USD'
                ? '$'
                : ''}
            {plan.price.toLocaleString('en-US')}
          </span>
          <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase opacity-40">
            /{plan.interval}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-primary text-[10px] font-bold tracking-widest uppercase opacity-80">
            Quotas & Limits:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {plan.planType === 'JOB_SEEKER' ? (
              <>
                <div className="bg-muted/30 border-border/50 rounded-xl border p-3 text-center">
                  <p className="text-muted-foreground mb-1 text-[9px] font-bold tracking-widest uppercase opacity-60">
                    Monthly Apps
                  </p>
                  <p className="text-lg font-bold">
                    {plan.maxMonthlyApplications === null || plan.maxMonthlyApplications >= 9999
                      ? '∞'
                      : plan.maxMonthlyApplications}
                  </p>
                </div>
                <div className="bg-muted/30 border-border/50 rounded-xl border p-3 text-center">
                  <p className="text-muted-foreground mb-1 text-[9px] font-bold tracking-widest uppercase opacity-60">
                    CV Uploads
                  </p>
                  <p className="text-lg font-bold">
                    {plan.maxResumes === null || plan.maxResumes >= 9999 ? '∞' : plan.maxResumes}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-muted/30 border-border/50 rounded-xl border p-3 text-center">
                  <p className="text-muted-foreground mb-1 text-[9px] font-bold tracking-widest uppercase opacity-60">
                    Active Jobs
                  </p>
                  <p className="text-lg font-bold">
                    {plan.maxActiveJobs === null ? '∞' : plan.maxActiveJobs}
                  </p>
                </div>
                <div className="bg-muted/30 border-border/50 rounded-xl border p-3 text-center">
                  <p className="text-muted-foreground mb-1 text-[9px] font-bold tracking-widest uppercase opacity-60">
                    Users
                  </p>
                  <p className="text-lg font-bold">
                    {plan.maxUsers === null ? '∞' : plan.maxUsers}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-primary text-[10px] font-bold tracking-widest uppercase opacity-80">
            Included Entitlements:
          </p>
          <ul className="grid gap-3">
            {plan.features.slice(0, 6).map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="line-clamp-1 text-sm font-bold opacity-80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/20 flex flex-col gap-5 border-t-2 border-dashed p-7">
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            <span className="text-foreground text-sm">{plan.subscriberCount}</span> Active
          </div>
          <Badge
            className={`rounded-full border-2 px-4 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm ${
              plan.active
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
                : 'bg-muted text-muted-foreground border-border'
            }`}
          >
            {plan.active ? 'Live' : 'Draft'}
          </Badge>
        </div>
        <Button
          onClick={() => onEdit(plan)}
          className={`h-11 w-full rounded-xl font-bold tracking-widest uppercase transition-all ${
            plan.featured
              ? 'bg-primary hover:bg-primary/90 shadow-sm'
              : 'bg-background hover:bg-muted text-foreground border-2'
          }`}
          variant={plan.featured ? 'default' : 'outline'}
        >
          Manage Entitlements
        </Button>
      </CardFooter>
    </Card>
  );
}
