/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import WKSelect from '@/components/form/WkSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Send, X } from 'lucide-react';

const JobApplyForm = ({
  form,
  EXPERIENCE_OPTIONS,
  handleFileChange,
  formatFileSize,
  handleRemoveFile,
  handleSubmit,
  isSubmitting,
  resumeFile,
  existingResumes,
}: {
  form: any;
  EXPERIENCE_OPTIONS: { label: string; value: string }[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatFileSize: (bytes: number) => string;
  handleRemoveFile: () => void;

  handleSubmit: (data: any) => void;
  isSubmitting: boolean;
  resumeFile: File | null;

  existingResumes?: any[];
}) => {
  return (
    <Card className="bg-card rounded-2xl border shadow-none">
      <CardHeader className="border-border/50 border-b p-6 sm:px-8">
        <CardTitle className="text-xl font-bold tracking-tight">Your Information</CardTitle>
        <CardDescription className="text-sm font-medium opacity-80">
          Please provide your details to apply for this position
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Personal Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Professional Info Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Professional Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="currentRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Job Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Frontend Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EXPERIENCE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourportfolio.com" {...field} />
                    </FormControl>
                    <FormDescription>Link to your portfolio or GitHub profile</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Resume Selection Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Resume (PDF)</h3>

              <FormField
                control={form.control}
                name="resumeFile"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Upload Resume</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        {!resumeFile ? (
                          <div className="relative">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                handleFileChange(e);
                                form.setValue('resumeUrl', '');
                              }}
                              className="sr-only"
                              id="resume-upload"
                              {...field}
                            />
                            <label
                              htmlFor="resume-upload"
                              className="border-border bg-card hover:bg-accent flex cursor-pointer items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-300"
                            >
                              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                                <FileUp className="h-6 w-6" />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-bold tracking-tight sm:text-base">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-muted-foreground mt-1 text-xs font-medium">
                                  PDF or Word document up to 10MB
                                </p>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className="border-border bg-card flex items-center justify-between rounded-lg border px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                <FileUp className="text-primary h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{resumeFile.name}</p>
                                <p className="text-muted-foreground text-xs">
                                  {formatFileSize(resumeFile.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={handleRemoveFile}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <div className="text-muted-foreground relative mb-6 flex items-center py-2 text-xs font-bold tracking-widest uppercase">
                  <div className="border-border grow border-t"></div>
                  <span className="mx-4 shrink">OR SELECT EXISTING</span>
                  <div className="border-border grow border-t"></div>
                </div>
                <WKSelect
                  name="resumeUrl"
                  label="Select Existing Resume"
                  className="w-full"
                  placeholder="Choose a previously uploaded resume..."
                  options={(existingResumes || []).map((r: any) => ({
                    value: r.fileUrl,
                    label: `${r.fileName} ${r.isDefault ? '(Default)' : ''}`,
                  }))}
                />
                {form.watch('resumeUrl') && resumeFile && (
                  <p className="text-muted-foreground mt-3 text-xs font-medium">
                    Note: You have both selected an existing resume and uploaded a new one. The new
                    uploaded file will be prioritized. Please remove it if you wish to use the
                    selected existing resume.
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Cover Letter Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Cover Letter</h3>
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why are you interested in this role? *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your interest in this position and how your experience aligns with our needs..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Minimum 20 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer font-normal">
                      I agree to the terms and conditions and privacy policy
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 mt-4 h-12 w-full rounded-xl font-bold tracking-wide shadow-none transition-all"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="border-background border-t-primary/50 mr-2 h-5 w-5 animate-spin rounded-full border-2" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Application
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobApplyForm;
