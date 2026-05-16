/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationBar from "@/components/shared/PaginationBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetMyCompanyApplicationsQuery,
  useGetMyCompanyApplicationSummaryQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/feature/application/applicationApi";
import { useGetMyJobsQuery } from "@/redux/feature/job/jobApi";
import { useCreateConversationMutation } from "@/redux/feature/message/messageApi";
import { ApplicationStatus, EmployerApplication } from "@/types/application";
import debounce from "debounce";
import {
  CheckCircle,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  MoreVertical,
  Phone,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ApplicationFiltersAndSearch from "../../components/dashboard/applications/ApplicationFiltersAndSearch";
import ApplicationStatusCards from "../../components/dashboard/applications/ApplicationStatusCard";
import DashboardApplicationsHeader from "../../components/dashboard/dashboard-nav/header/DashboardJobApplicationsHeader";

const PDFViewerSheet = dynamic(
  () => import("@/components/shared/PDFViewerSheet"),
  {
    ssr: false,
  },
);

const STATUS_OPTIONS: Array<{ value: ApplicationStatus; label: string }> = [
  { value: "SUBMITTED", label: "Submitted" },
  { value: "REVIEWING", label: "Reviewing" },
  { value: "SHORTLISTED", label: "Shortlisted" },
  { value: "INTERVIEWED", label: "Interviewed" },
  { value: "OFFERED", label: "Offered" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
];

const TAB_STATUSES: Array<{ value: ApplicationStatus | "all"; label: string }> =
  [
    { value: "all", label: "All" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "REVIEWING", label: "Reviewing" },
    { value: "SHORTLISTED", label: "Shortlisted" },
    { value: "INTERVIEWED", label: "Interviewed" },
    { value: "REJECTED", label: "Rejected" },
  ];

const NEXT_STATUS: Partial<Record<ApplicationStatus, ApplicationStatus>> = {
  SUBMITTED: "REVIEWING",
  REVIEWING: "SHORTLISTED",
  SHORTLISTED: "INTERVIEWED",
  INTERVIEWED: "OFFERED",
  OFFERED: "ACCEPTED",
};

const statusLabels = Object.fromEntries(
  STATUS_OPTIONS.map((status) => [status.value, status.label]),
) as Record<ApplicationStatus, string>;

const getStatusColor = (status: ApplicationStatus) => {
  const colors: Record<ApplicationStatus, string> = {
    SUBMITTED: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    REVIEWING: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    SHORTLISTED: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
    INTERVIEWED: "bg-violet-500/10 text-violet-700 border-violet-500/20",
    OFFERED: "bg-green-500/10 text-green-700 border-green-500/20",
    ACCEPTED: "bg-primary/10 text-primary border-primary/20",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
    WITHDRAWN: "bg-muted text-muted-foreground border-border",
  };

  return colors[status];
};

const getApplicantName = (application: EmployerApplication) =>
  application.fullName || application.applicant.fullName || "Unknown applicant";

const getApplicantEmail = (application: EmployerApplication) =>
  application.email || application.applicant.email;

const getApplicantPhone = (application: EmployerApplication) =>
  application.phone || application.applicant.phone;

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (
      error as {
        data?: { message?: string; errorSources?: { message?: string } };
      }
    ).data;
    return data?.errorSources?.message || data?.message || fallback;
  }

  return fallback;
};

const DashboardJobApplicationView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<
    ApplicationStatus | "all"
  >("all");
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] =
    useState<EmployerApplication | null>(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState<
    string | null
  >(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [applicationToReject, setApplicationToReject] =
    useState<EmployerApplication | null>(null);

  const [resumeSheetOpen, setResumeSheetOpen] = useState(false);
  const [applicationForResume, setApplicationForResume] =
    useState<EmployerApplication | null>(null);

  const limit = 10;
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.clear();
  }, [debouncedSearch, searchValue]);

  const effectiveStatus = activeTab !== "all" ? activeTab : selectedStatus;

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit,
      q: searchQuery || undefined,
      jobId: selectedJob !== "all" ? selectedJob : undefined,
      status: effectiveStatus !== "all" ? effectiveStatus : undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    [currentPage, effectiveStatus, searchQuery, selectedJob],
  );

  const {
    data: applicationsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyCompanyApplicationsQuery(queryParams);
  const { data: summaryResponse } =
    useGetMyCompanyApplicationSummaryQuery(undefined);
  const { data: jobsResponse } = useGetMyJobsQuery({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const [createConversation, { isLoading: isCreatingChat }] =
    useCreateConversationMutation();
  const router = useRouter();

  const applications = (applicationsResponse?.data ||
    []) as EmployerApplication[];
  const meta = applicationsResponse?.meta || {
    page: currentPage,
    limit,
    total: 0,
    pages: 0,
  };
  const summary = summaryResponse?.data;
  const statusCounts = summary?.byStatus || {};
  const jobs = (
    (jobsResponse?.data || []) as Array<{ id: string; title: string }>
  ).map((job) => ({
    id: job.id,
    title: job.title,
  }));

  const handleClearFilters = () => {
    setSearchValue("");
    setSearchQuery("");
    setSelectedJob("all");
    setSelectedStatus("all");
    setActiveTab("all");
    setCurrentPage(1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ApplicationStatus | "all");
    setSelectedStatus("all");
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setSelectedStatus(value as ApplicationStatus | "all");
    setActiveTab("all");
    setCurrentPage(1);
  };

  const handleJobChange = (value: string) => {
    setSelectedJob(value);
    setCurrentPage(1);
  };

  const handleUpdateStatus = async (
    application: EmployerApplication,
    status: ApplicationStatus,
  ) => {
    const isRejecting = status === "REJECTED";

    // If it's a rejection, open the modal instead of updating directly
    if (isRejecting) {
      setApplicationToReject(application);
      setRejectModalOpen(true);
      return;
    }

    await performStatusUpdate(application, status);
  };

  const performStatusUpdate = async (
    application: EmployerApplication,
    status: ApplicationStatus,
    rejectionReason?: string,
  ) => {
    setUpdatingApplicationId(application.id);
    toast.loading("Updating application status...", {
      id: "application-status",
    });

    try {
      await updateApplicationStatus({
        id: application.id,
        status,
        rejectionReason,
      }).unwrap();
      toast.success("Application status updated", {
        id: "application-status",
      });
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to update application status"),
        {
          id: "application-status",
        },
      );
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  const confirmReject = async () => {
    if (!applicationToReject) return;
    await performStatusUpdate(
      applicationToReject,
      "REJECTED",
      "Rejected by employer",
    );
    setRejectModalOpen(false);
    setApplicationToReject(null);
  };

  const handleStartChat = async (application: EmployerApplication) => {
    try {
      toast.loading("Starting conversation...", { id: "create_chat" });
      const res = await createConversation({
        participantId: application.applicant.id,
        applicationId: application.id,
      }).unwrap();

      if (res.success) {
        toast.success("Conversation started!", { id: "create_chat" });
        router.push("/employer/messages");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to start conversation", {
        id: "create_chat",
      });
      console.error(err);
    }
  };

  const hasActiveFilters =
    searchValue !== "" ||
    selectedJob !== "all" ||
    selectedStatus !== "all" ||
    activeTab !== "all";

  return (
    <div className="mt-16 min-h-screen">
      <DashboardApplicationsHeader />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <ApplicationStatusCards
          totalApplications={summary?.total || 0}
          newThisWeek={summary?.newThisWeek || 0}
          inReview={summary?.inReview || 0}
          rejected={summary?.rejected || 0}
        />

        <ApplicationFiltersAndSearch
          searchQuery={searchValue}
          onSearchChange={setSearchValue}
          selectedJob={selectedJob}
          onJobChange={handleJobChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusFilterChange}
          onClearFilters={handleClearFilters}
          jobs={jobs}
          statuses={STATUS_OPTIONS}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="rounded-2xl border px-4 py-6 md:px-6 md:py-8">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="bg-card h-10 w-full flex-wrap justify-start border p-0">
              {TAB_STATUSES.map((tab) => (
                <TabsTrigger
                  className="min-w-32 rounded-full py-3"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label} (
                  {tab.value === "all"
                    ? summary?.total || 0
                    : statusCounts[tab.value as ApplicationStatus] || 0}
                  )
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Application List
                  </CardTitle>
                  <CardDescription>
                    {meta.total || 0} application{meta.total === 1 ? "" : "s"}{" "}
                    found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading || isFetching ? (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="py-16 text-center"
                            >
                              <span className="text-muted-foreground text-sm font-medium">
                                Loading applications...
                              </span>
                            </TableCell>
                          </TableRow>
                        ) : isError ? (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="py-16 text-center"
                            >
                              <div className="flex flex-col items-center gap-4">
                                <XCircle className="text-destructive h-10 w-10" />
                                <p className="text-muted-foreground text-sm font-medium">
                                  Failed to load applications.
                                </p>
                                <Button variant="outline" onClick={refetch}>
                                  Retry
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : applications.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="py-16 text-center"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <FileText className="text-muted-foreground/50 h-12 w-12" />
                                <p className="text-muted-foreground text-sm">
                                  No applications found
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          applications.map((application) => {
                            const applicantName = getApplicantName(application);
                            const applicantEmail =
                              getApplicantEmail(application);
                            const nextStatus = NEXT_STATUS[application.status];

                            return (
                              <TableRow
                                key={application.id}
                                className="hover:bg-muted/50"
                              >
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={
                                          application.applicant.profile
                                            ?.avatarUrl || undefined
                                        }
                                        alt={applicantName}
                                      />
                                      <AvatarFallback>
                                        {getInitials(applicantName)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-44">
                                      <p className="font-medium">
                                        {applicantName}
                                      </p>
                                      <p className="text-muted-foreground text-sm">
                                        {applicantEmail}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <p className="font-medium">
                                    {application.job.title}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <p className="text-sm">
                                    {application.job.location ||
                                      "Not specified"}
                                    {application.job.isRemote
                                      ? " (Remote)"
                                      : ""}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <p className="text-sm">
                                    {new Date(
                                      application.createdAt,
                                    ).toLocaleDateString(undefined, {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={getStatusColor(
                                      application.status,
                                    )}
                                  >
                                    {statusLabels[application.status]}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          setSelectedApplication(application)
                                        }
                                      >
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      {application.resumeUrl && (
                                        <DropdownMenuItem
                                          onClick={() => {
                                            setApplicationForResume(
                                              application,
                                            );
                                            setResumeSheetOpen(true);
                                          }}
                                        >
                                          <FileText className="mr-2 h-4 w-4" />
                                          View Resume
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuSeparator />
                                      {nextStatus && (
                                        <DropdownMenuItem
                                          disabled={
                                            updatingApplicationId ===
                                            application.id
                                          }
                                          onClick={() =>
                                            handleUpdateStatus(
                                              application,
                                              nextStatus,
                                            )
                                          }
                                        >
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Move to {statusLabels[nextStatus]}
                                        </DropdownMenuItem>
                                      )}
                                      {application.status !== "REJECTED" &&
                                        application.status !== "WITHDRAWN" && (
                                          <DropdownMenuItem
                                            disabled={
                                              updatingApplicationId ===
                                              application.id
                                            }
                                            onClick={() =>
                                              handleUpdateStatus(
                                                application,
                                                "REJECTED",
                                              )
                                            }
                                            className="text-destructive focus:text-destructive"
                                          >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject Application
                                          </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <PaginationBar
                    meta={{
                      page: meta.page || currentPage,
                      limit: meta.limit || limit,
                      total: meta.total || 0,
                      pages: meta.pages || 0,
                    }}
                    onPageChange={setCurrentPage}
                    className="border-t pt-6"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Sheet
        open={!!selectedApplication}
        onOpenChange={(open) => !open && setSelectedApplication(null)}
      >
        <SheetContent side="right" className="w-full p-0 sm:max-w-2xl">
          <ScrollArea className="h-full px-6 py-6">
            {selectedApplication && (
              <>
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    {getApplicantName(selectedApplication)}
                  </SheetTitle>
                  <SheetDescription>
                    Application for {selectedApplication.job.title}
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedApplication.status)}
                    >
                      {statusLabels[selectedApplication.status]}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      Applied{" "}
                      {new Date(
                        selectedApplication.createdAt,
                      ).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border p-4">
                      <div className="text-muted-foreground flex items-center gap-2 text-xs font-bold uppercase">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        {getApplicantEmail(selectedApplication)}
                      </p>
                    </div>
                    <div className="rounded-xl border p-4">
                      <div className="text-muted-foreground flex items-center gap-2 text-xs font-bold uppercase">
                        <Phone className="h-4 w-4" />
                        Phone
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        {getApplicantPhone(selectedApplication) ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border p-4">
                      <p className="text-muted-foreground text-xs font-bold uppercase">
                        Current Location
                      </p>
                      <p className="mt-2 text-sm font-medium">
                        {selectedApplication.currentLocation ||
                          selectedApplication.applicant.profile?.location ||
                          "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-xl border p-4">
                      <p className="text-muted-foreground text-xs font-bold uppercase">
                        Experience
                      </p>
                      <p className="mt-2 text-sm font-medium">
                        {selectedApplication.yearsOfExperience ?? 0} years
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border p-4">
                    <p className="text-muted-foreground text-xs font-bold uppercase">
                      Cover Letter
                    </p>
                    <p className="mt-3 text-sm leading-6 whitespace-pre-wrap">
                      {selectedApplication.coverLetter ||
                        "No cover letter provided."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {selectedApplication.resumeUrl && (
                      <Button
                        className="rounded-xl"
                        onClick={() => {
                          setApplicationForResume(selectedApplication);
                          setResumeSheetOpen(true);
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Resume
                      </Button>
                    )}
                    {NEXT_STATUS[selectedApplication.status] && (
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        disabled={
                          updatingApplicationId === selectedApplication.id
                        }
                        onClick={() =>
                          handleUpdateStatus(
                            selectedApplication,
                            NEXT_STATUS[
                              selectedApplication.status
                            ] as ApplicationStatus,
                          )
                        }
                      >
                        Move to{" "}
                        {
                          statusLabels[
                            NEXT_STATUS[
                              selectedApplication.status
                            ] as ApplicationStatus
                          ]
                        }
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      disabled={isCreatingChat}
                      onClick={() => handleStartChat(selectedApplication)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    {selectedApplication.status !== "REJECTED" &&
                      selectedApplication.status !== "WITHDRAWN" && (
                        <Button
                          variant="outline"
                          className="text-destructive hover:text-destructive rounded-xl"
                          disabled={
                            updatingApplicationId === selectedApplication.id
                          }
                          onClick={() =>
                            handleUpdateStatus(selectedApplication, "REJECTED")
                          }
                        >
                          Reject
                        </Button>
                      )}
                  </div>
                </div>
              </>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <AlertDialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this application? The candidate
              will be notified of this decision.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setApplicationToReject(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {applicationForResume && (
        <PDFViewerSheet
          isOpen={resumeSheetOpen}
          onClose={() => {
            setResumeSheetOpen(false);
            setTimeout(() => setApplicationForResume(null), 300);
          }}
          pdfUrl={applicationForResume.resumeUrl || ""}
          title={`${getApplicantName(applicationForResume)} - Resume`}
        />
      )}
    </div>
  );
};

export default DashboardJobApplicationView;
