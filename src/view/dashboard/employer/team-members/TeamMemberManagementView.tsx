/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Badge } from '@/components/ui/badge';
import TeamMemberManagementSkeleton from '@/skeleton/dashboard/employer/team-members/TeamMemberManagementSkeleton';
import { useEffect, useState } from 'react';
import DashboardTeamMemberManagementHeader from '@/components/dashboard/dashboard-nav/header/DashboardTeamMemberManagementHeader';
import TeamMemberFiltersAndSearch from '@/components/dashboard/team-member/TeamMemberFiltersAndSearch';
import TeamMemberManagementTabs from '@/components/dashboard/team-member/TeamMemberManagementTabs';
import TeamMemberStatusCards from '@/components/dashboard/team-member/TeamMemberStatusCards';

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  location: string;
  salary?: number;
  manager?: string;
  skills: string[];
}

export function TeamMemberManagementView() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <DashboardTeamMemberManagementHeader
          isAddTeamMemberOpen={isAddTeamMemberOpen}
          setIsAddTeamMemberOpen={setIsAddTeamMemberOpen}
        />
        <TeamMemberManagementSkeleton />
      </div>
    );
  }

  // fake data
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john.doe@techflow.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior Frontend Developer',
      department: 'Engineering',
      joinDate: '2023-01-15',
      status: 'active',
      avatar: '/employee-1.jpg',
      location: 'San Francisco, CA',
      salary: 120000,
      manager: 'Jane Smith',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane.smith@techflow.com',
      phone: '+1 (555) 234-5678',
      role: 'Engineering Manager',
      department: 'Engineering',
      joinDate: '2022-03-20',
      status: 'active',
      avatar: '/employee-2.jpg',
      location: 'San Francisco, CA',
      salary: 150000,
      skills: ['Leadership', 'React', 'System Design'],
    },
    {
      id: '3',
      fullName: 'Mike Johnson',
      email: 'mike.johnson@techflow.com',
      phone: '+1 (555) 345-6789',
      role: 'UX Designer',
      department: 'Design',
      joinDate: '2023-02-10',
      status: 'active',
      avatar: '/employee-3.jpg',
      location: 'Remote',
      salary: 95000,
      manager: 'Sarah Wilson',
      skills: ['Figma', 'User Research', 'Prototyping'],
    },
    {
      id: '4',
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@techflow.com',
      phone: '+1 (555) 456-7890',
      role: 'Design Director',
      department: 'Design',
      joinDate: '2021-11-05',
      status: 'active',
      avatar: '/placeholder.svg',
      location: 'New York, NY',
      salary: 140000,
      skills: ['Design Strategy', 'Team Leadership', 'Brand Design'],
    },
    {
      id: '5',
      fullName: 'Alex Chen',
      email: 'alex.chen@techflow.com',
      phone: '+1 (555) 567-8901',
      role: 'Backend Developer',
      department: 'Engineering',
      joinDate: '2023-06-01',
      status: 'pending',
      avatar: '/placeholder.svg',
      location: 'Austin, TX',
      skills: ['Python', 'PostgreSQL', 'AWS'],
    },
  ]);

  const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR'];

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Engineering Manager',
    'UX Designer',
    'UI Designer',
    'Design Director',
    'Product Manager',
    'Marketing Manager',
  ];

  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesTab = activeTab === 'all' || member.status === activeTab;

    return matchesSearch && matchesDepartment && matchesTab;
  });

  const getStatusBadge = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleStatusChange = (memberId: string, newStatus: TeamMember['status']) => {
    setTeamMembers((prev) =>
      prev.map((member) => (member.id === memberId ? { ...member, status: newStatus } : member)),
    );
  };

  const handleDeleteTeamMember = (memberId: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  return (
    <div className="min-h-screen">
      <DashboardTeamMemberManagementHeader
        isAddTeamMemberOpen={isAddTeamMemberOpen}
        setIsAddTeamMemberOpen={setIsAddTeamMemberOpen}
      />

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <TeamMemberStatusCards teamMembers={teamMembers} departments={departments} />

        <TeamMemberFiltersAndSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          departments={departments}
        />

        <TeamMemberManagementTabs
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          teamMembers={teamMembers}
          filteredTeamMembers={filteredTeamMembers}
          getStatusBadge={getStatusBadge}
          handleStatusChange={handleStatusChange}
          handleDeleteTeamMember={handleDeleteTeamMember}
        />
      </div>
    </div>
  );
}

export default TeamMemberManagementView;
