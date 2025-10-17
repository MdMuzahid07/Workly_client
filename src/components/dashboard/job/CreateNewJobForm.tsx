/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";

const CreateNewJobForm = ({ onClose }: any) => {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input id="title" placeholder="e.g. Senior Frontend Developer" />
        </div>

        {/* Job Type and Experience Level */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type">Job Type *</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level *</Label>
            <Select>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid-level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location and Remote */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input id="location" placeholder="e.g. San Francisco, CA" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remote">Work Mode *</Label>
            <Select>
              <SelectTrigger id="remote">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="salaryMin">Minimum Salary</Label>
            <Input id="salaryMin" type="number" placeholder="80000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salaryMax">Maximum Salary</Label>
            <Input id="salaryMax" type="number" placeholder="120000" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            className="min-h-[120px]"
          />
        </div>

        {/* Requirements */}
        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements *</Label>
          <Textarea
            id="requirements"
            placeholder="List the key requirements and qualifications..."
            className="min-h-[100px]"
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label htmlFor="skills">Required Skills</Label>
          <Input
            id="skills"
            placeholder="e.g. React, TypeScript, Node.js (comma separated)"
          />
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits</Label>
          <Textarea
            id="benefits"
            placeholder="List the benefits and perks..."
            className="min-h-[80px]"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            className="h-4 w-4 rounded text-green-600"
          />
          <Label htmlFor="featured" className="font-normal">
            Mark as featured job
          </Label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="bg-transparent"
        >
          Cancel
        </Button>
        <Button type="submit">Create Job Posting</Button>
      </div>
    </form>
  );
};

export default CreateNewJobForm;
