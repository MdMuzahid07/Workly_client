import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Calendar,
  Edit,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Trash2,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { useState } from "react";
import TeamMemberProfileDetails from "./TeamMemberProfileDetails";

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  avatar: string;
  location: string;
  salary?: number;
  manager?: string;
  skills: string[];
}

interface TeamMemberManagementTabsProps {
  searchTerm: string;
  selectedDepartment: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
  teamMembers: TeamMember[];
  filteredTeamMembers: TeamMember[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStatusBadge: (status: TeamMember["status"]) => any;
  handleStatusChange: (
    memberId: string,
    newStatus: TeamMember["status"],
  ) => void;
  handleDeleteTeamMember: (memberId: string) => void;
}

const fakeTeamMember = {
  id: "user-001",
  fullName: "Sarah Chen",
  email: "sarah.chen@techflow.com",
  phone: "+1 (555) 234-5678",
  role: "EMPLOYER",
  isActive: true,
  isVerified: true,
  companyId: "company-001",
  department: "Engineering",
  employmentType: "Full-time",
  joinDate: "Jan 15, 2022",
  lastLogin: "2 hours ago",
  profile: {
    bio: "Passionate frontend developer with 8+ years of experience...",
    location: "San Francisco, CA",
    avatarUrl: "/avatars/sarah-chen.jpg",
    linkedInUrl: "https://linkedin.com/in/sarahchen",
    websiteUrl: "https://sarahchen.dev",
    skills: [
      { skillName: "React", experienceYears: 8 },
      { skillName: "TypeScript", experienceYears: 6 },
      { skillName: "Next.js", experienceYears: 4 },
      { skillName: "Node.js", experienceYears: 5 },
    ],
  },
};

const TeamMemberManagementTabs = ({
  searchTerm,
  selectedDepartment,
  activeTab,
  setActiveTab,
  teamMembers,
  filteredTeamMembers,
  getStatusBadge,
  handleStatusChange,
  handleDeleteTeamMember,
}: TeamMemberManagementTabsProps) => {
  const [teamMemberProfileOpen, setTeamMemberProfileOpen] = useState(false);

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="w-full overflow-x-auto">
          <TabsList className="bg-card grid w-full min-w-[400px] grid-cols-4 sm:min-w-0">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All ({teamMembers.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              Active ({teamMembers.filter((e) => e.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm">
              Pending (
              {teamMembers.filter((e) => e.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="inactive" className="text-xs sm:text-sm">
              Inactive (
              {teamMembers.filter((e) => e.status === "inactive").length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team member</TableHead>
                      <TableHead>Role & Department</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.fullName}
                              />
                              <AvatarFallback>
                                {member.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.fullName}</p>
                              <p className="text-muted-foreground flex items-center text-sm">
                                <MapPin className="mr-1 h-3 w-3" />
                                {member.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{member.role}</p>
                            <p className="text-muted-foreground text-sm">
                              {member.department}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="flex items-center text-sm">
                              <Mail className="mr-1 h-3 w-3" />
                              {member.email}
                            </p>
                            <p className="text-muted-foreground flex items-center text-sm">
                              <Phone className="mr-1 h-3 w-3" />
                              {member.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(member.joinDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(member.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  setTeamMemberProfileOpen(true);
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit team member
                              </DropdownMenuItem>
                              {member.status === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(member.id, "active")
                                  }
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {member.status === "active" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(member.id, "inactive")
                                  }
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  handleDeleteTeamMember(member.id)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="space-y-4 p-4 lg:hidden">
                {filteredTeamMembers.map((member) => (
                  <Card key={member.id} className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex min-w-0 flex-1 items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.fullName}
                          />
                          <AvatarFallback className="text-xs">
                            {member.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {member.fullName}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(member.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                setTeamMemberProfileOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit team member
                            </DropdownMenuItem>
                            {member.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(member.id, "active")
                                }
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {member.status === "active" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(member.id, "inactive")
                                }
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteTeamMember(member.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="text-muted-foreground flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span className="truncate">{member.location}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {new Date(member.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {member.department}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredTeamMembers.length === 0 && (
                <div className="py-12 text-center">
                  <Users className="text-muted-foreground mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
                  <h3 className="text-foreground mb-2 text-base font-medium sm:text-lg">
                    No team members found
                  </h3>
                  <p className="text-muted-foreground px-4 text-sm">
                    {searchTerm || selectedDepartment !== "all"
                      ? "Try adjusting your search or filters"
                      : "Add your first team member to get started"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <TeamMemberProfileDetails
        open={teamMemberProfileOpen}
        onOpenChange={(open) => setTeamMemberProfileOpen(open)}
        teamMember={fakeTeamMember}
      />
    </>
  );
};

export default TeamMemberManagementTabs;
