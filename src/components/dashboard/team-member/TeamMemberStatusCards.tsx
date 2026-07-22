import { Card, CardContent } from '@/components/ui/card';
import { UserCheck, Users, UserX } from 'lucide-react';

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

interface TeamMemberStatusCardsProps {
  teamMembers: TeamMember[];
  departments: string[];
}

const TeamMemberStatusCards = ({ teamMembers, departments }: TeamMemberStatusCardsProps) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                Total team members
              </p>
              <p className="text-primary text-xl font-bold sm:text-2xl">{teamMembers.length}</p>
            </div>
            <Users className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium sm:text-sm">Active</p>
              <p className="text-xl font-bold text-green-600 sm:text-2xl">
                {teamMembers.filter((m) => m.status === 'active').length}
              </p>
            </div>
            <UserCheck className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium sm:text-sm">Pending</p>
              <p className="text-xl font-bold text-yellow-600 sm:text-2xl">
                {teamMembers.filter((m) => m.status === 'pending').length}
              </p>
            </div>
            <UserX className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium sm:text-sm">Departments</p>
              <p className="text-primary text-xl font-bold sm:text-2xl">{departments.length}</p>
            </div>
            <Users className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMemberStatusCards;
