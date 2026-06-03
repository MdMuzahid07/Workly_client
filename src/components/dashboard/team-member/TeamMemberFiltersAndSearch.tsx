import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface TeamMemberFiltersAndSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  departments: string[];
}

const TeamMemberFiltersAndSearch = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  departments,
}: TeamMemberFiltersAndSearchProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search team members by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-10 sm:h-11"
              />
            </div>
          </div>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="h-10 w-full sm:h-11 sm:w-48">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberFiltersAndSearch;
