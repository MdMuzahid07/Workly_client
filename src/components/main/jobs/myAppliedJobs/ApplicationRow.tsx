import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Application, ApplicationStatus } from "@/data/mockApplications";
import { Building2, MoreVertical } from "lucide-react";
import Image from "next/image";

const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100/50 text-yellow-700 border-yellow-200/50 dark:bg-yellow-900/20 dark:text-yellow-500";
    case "under_review":
      return "bg-blue-100/50 text-blue-700 border-blue-200/50 dark:bg-blue-900/20 dark:text-blue-500";
    case "interviewing":
      return "bg-purple-100/50 text-purple-700 border-purple-200/50 dark:bg-purple-900/20 dark:text-purple-500";
    case "offer":
      return "bg-green-100/50 text-green-700 border-green-200/50 dark:bg-green-900/20 dark:text-green-500";
    case "accepted":
      return "bg-emerald-100/50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/20 dark:text-emerald-500";
    case "rejected":
      return "bg-red-100/50 text-red-700 border-red-200/50 dark:bg-red-900/20 dark:text-red-500";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusLabel = (status: ApplicationStatus) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const ApplicationRow = ({ app }: { app: Application }) => {
  return (
    <TableRow className="group hover:bg-muted/40 border-none transition-colors">
      <TableCell className="py-4 pl-6">
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground group-hover:bg-background flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border p-1.5 text-[10px] font-semibold transition-colors">
            {app.company.logo ? (
              <Image
                src={app.company.logo}
                alt={app.company.name}
                className="h-full w-full object-contain"
                fill
              />
            ) : (
              <Building2 className="h-5 w-5 opacity-40" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-foreground group-hover:text-primary text-sm font-bold transition-colors">
              {app.title}
            </span>
            <span className="text-muted-foreground text-[11px] font-medium tracking-tight uppercase">
              {app.company.name}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden py-4 md:table-cell">
        <span className="text-muted-foreground text-sm font-medium">
          {app.location}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${getStatusColor(app.status)}`}
          >
            {getStatusLabel(app.status)}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="hidden py-4 text-right md:table-cell">
        <span className="text-muted-foreground text-sm font-semibold">
          {new Date(app.appliedDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </TableCell>
      <TableCell className="py-4 pr-6 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:bg-muted h-8 w-8 rounded-full p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-xl p-2">
            <DropdownMenuItem className="h-10 cursor-pointer rounded-lg font-medium">
              View Status
            </DropdownMenuItem>
            <DropdownMenuItem className="h-10 cursor-pointer rounded-lg font-medium">
              Company Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive h-10 cursor-pointer rounded-lg font-medium">
              Withdraw Application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
