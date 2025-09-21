"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

const ThemeShowcase: React.FC = () => {
  const { theme, setTheme, isDark, isLight, isSystem } = useTheme();

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-foreground text-4xl font-bold">
          Workly Job Theme System
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Professional green theme with your brand color #37DF72. Experience
          seamless light and dark mode transitions.
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="text-brand border-brand">
            Brand Color: #37DF72
          </Badge>
          <Badge variant="secondary">Current: {theme}</Badge>
        </div>
      </div>

      <Separator />

      {/* Theme Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Controls</CardTitle>
          <CardDescription>
            Switch between light, dark, and system themes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={isLight ? "default" : "outline"}
              onClick={() => setTheme("light")}
            >
              Light
            </Button>
            <Button
              variant={isDark ? "default" : "outline"}
              onClick={() => setTheme("dark")}
            >
              Dark
            </Button>
            <Button
              variant={isSystem ? "default" : "outline"}
              onClick={() => setTheme("system")}
            >
              System
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Your brand colors in action across different UI elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="bg-primary flex h-16 items-center justify-center rounded-lg">
                <span className="text-primary-foreground font-medium">
                  Primary
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Brand Green</p>
            </div>
            <div className="space-y-2">
              <div className="bg-secondary flex h-16 items-center justify-center rounded-lg">
                <span className="text-secondary-foreground font-medium">
                  Secondary
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Light Accent</p>
            </div>
            <div className="space-y-2">
              <div className="bg-accent flex h-16 items-center justify-center rounded-lg">
                <span className="text-accent-foreground font-medium">
                  Accent
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Vibrant Green</p>
            </div>
            <div className="space-y-2">
              <div className="bg-muted flex h-16 items-center justify-center rounded-lg">
                <span className="text-muted-foreground font-medium">Muted</span>
              </div>
              <p className="text-muted-foreground text-sm">Subtle Tint</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Status Indicators</CardTitle>
          <CardDescription>
            Success, warning, and error states with your theme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-success/10 border-success/20 flex items-center space-x-3 rounded-lg border p-4">
              <CheckCircle className="text-success h-5 w-5" />
              <div>
                <p className="text-success font-medium">Success</p>
                <p className="text-muted-foreground text-sm">
                  Operation completed
                </p>
              </div>
            </div>
            <div className="bg-warning/10 border-warning/20 flex items-center space-x-3 rounded-lg border p-4">
              <AlertTriangle className="text-warning h-5 w-5" />
              <div>
                <p className="text-warning font-medium">Warning</p>
                <p className="text-muted-foreground text-sm">Please review</p>
              </div>
            </div>
            <div className="bg-destructive/10 border-destructive/20 flex items-center space-x-3 rounded-lg border p-4">
              <XCircle className="text-destructive h-5 w-5" />
              <div>
                <p className="text-destructive font-medium">Error</p>
                <p className="text-muted-foreground text-sm">
                  Something went wrong
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>
            Inputs, buttons, and controls with theme styling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>

          <div className="flex gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>

      {/* Cards and Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Cards and Layout</CardTitle>
          <CardDescription>
            How your content looks in different card styles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="job-card">
              <CardHeader>
                <CardTitle className="text-lg">Frontend Developer</CardTitle>
                <CardDescription>TechFlow Inc.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Join our team to build amazing web applications with React and
                  TypeScript.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="company-card">
              <CardHeader>
                <CardTitle className="text-lg">TechFlow Inc.</CardTitle>
                <CardDescription>Technology Company</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Leading software development company specializing in web
                  applications.
                </p>
                <div className="flex gap-2">
                  <Badge className="status-active">Active</Badge>
                  <Badge variant="outline">250 Employees</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Dashboard Stats</CardTitle>
                <CardDescription>Key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Jobs</span>
                    <span className="text-brand font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Applications</span>
                    <span className="text-brand font-medium">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs and Navigation</CardTitle>
          <CardDescription>Tabbed interface with theme styling</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="py-8 text-center">
                <Info className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">Overview Tab</h3>
                <p className="text-muted-foreground">
                  This is how your content looks in tabs with the theme applied.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="jobs" className="mt-6">
              <div className="py-8 text-center">
                <h3 className="mb-2 text-lg font-medium">Jobs Tab</h3>
                <p className="text-muted-foreground">
                  Job management interface with consistent theming.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <div className="py-8 text-center">
                <h3 className="mb-2 text-lg font-medium">Settings Tab</h3>
                <p className="text-muted-foreground">
                  Configuration options with your brand colors.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeShowcase;
