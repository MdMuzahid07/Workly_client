'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Briefcase, Calendar, DollarSign, MapPin, MoreHorizontal, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    isRemote: boolean;
    type: string;
    experience: string;
    salary: string;
    applications: number;
    postedDate: string;
    status: string;
    isFeatured: boolean;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

const DashboardJobCard = ({ job, onEdit, onDelete, onStatusChange }: JobCardProps) => {
  const router = useRouter();

  return (
    <>
      <div key={job.id} className="bg-card rounded-2xl border p-6 transition-all">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-foreground text-lg font-semibold">{job.title}</h3>
                <p className="text-muted-foreground text-sm">{job.company}</p>
              </div>
              <div className="flex items-center gap-2">
                {job.isFeatured && (
                  <Badge className="border-0 bg-blue-100 text-blue-700">Featured</Badge>
                )}
                <Badge
                  className={
                    job.status === 'active'
                      ? 'border-0 bg-green-100 text-green-700'
                      : job.status === 'draft'
                        ? 'border-0 bg-orange-100 text-orange-700'
                        : 'text-secondary-foreground border-0 bg-gray-100'
                  }
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Job Details */}
            <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
                {job.isRemote && (
                  <Badge variant="outline" className="ml-1 border-green-200 text-xs text-green-700">
                    Remote
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                <span>
                  {job.type} • {job.experience}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-border flex flex-wrap items-center justify-between gap-4 border-t pt-3">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {job.applications} applications
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Posted {job.postedDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border bg-transparent"
                  onClick={() => router.push(`/employer/applications?jobId=${job.id}`)}
                >
                  View Applications
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => router.push(`/jobs/${job.id}`)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(job.id)}>Edit Job</DropdownMenuItem>
                    {job.status === 'draft' && (
                      <DropdownMenuItem onClick={() => onStatusChange?.(job.id, 'ACTIVE')}>
                        Publish Job
                      </DropdownMenuItem>
                    )}
                    {job.status === 'active' && (
                      <DropdownMenuItem
                        className="text-orange-600"
                        onClick={() => onStatusChange?.(job.id, 'DRAFT')}
                      >
                        Move to Draft
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        if (job.status === 'active') {
                          onStatusChange?.(job.id, 'CLOSED');
                        } else {
                          onDelete?.(job.id);
                        }
                      }}
                    >
                      {job.status === 'active' ? 'Close Job' : 'Delete Job'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardJobCard;
