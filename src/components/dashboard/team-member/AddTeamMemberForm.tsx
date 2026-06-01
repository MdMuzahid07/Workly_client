import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const AddTeamMemberForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    location: "",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "HR",
  ];
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Engineering Manager",
    "UX Designer",
    "UI Designer",
    "Design Director",
    "Product Manager",
    "Marketing Manager",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[70vh] space-y-4 overflow-y-auto sm:space-y-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            required
            className="h-10 sm:h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            className="h-10 sm:h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="h-10 sm:h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="e.g., San Francisco, CA"
            className="h-10 sm:h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="department" className="text-sm font-medium">
            Department *
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, department: value }))
            }
          >
            <SelectTrigger className="h-10 sm:h-11">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium">
            Role *
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, role: value }))
            }
          >
            <SelectTrigger className="h-10 sm:h-11">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="joinDate" className="text-sm font-medium">
          Join Date
        </Label>
        <Input
          id="joinDate"
          type="date"
          value={formData.joinDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, joinDate: e.target.value }))
          }
          className="h-10 sm:h-11"
        />
      </div>

      <div className="flex flex-col justify-end space-y-3 pt-4 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-full bg-transparent sm:w-auto"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Add team member
        </Button>
      </div>
    </form>
  );
};

export default AddTeamMemberForm;
