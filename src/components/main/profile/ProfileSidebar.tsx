/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-select";
import {
  Download,
  Edit3,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Settings,
  Share2,
  Star,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const ProfileSidebar = ({
  user,
  setIsEditModalOpen,
}: {
  user: any;
  setIsEditModalOpen: any;
}) => {
  return (
    <div className="hidden space-y-6 lg:col-span-4 lg:block">
      <Card className="bg-card rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            <Avatar className="ring-primary/20 h-32 w-32 rounded-full shadow-xl ring-4">
              <AvatarImage
                src={user.profile.avatarUrl || "/placeholder.svg"}
                alt={user.fullName}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                🐱
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <h2 className="text-foreground text-2xl font-bold">
                {user.fullName}
              </h2>
              {user.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Star className="mr-2 h-4 w-4 fill-current" />
                  Verified Professional
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {user.profile.bio}
            </p>

            <div className="w-full space-y-4 text-sm">
              <div className="bg-muted/50 flex items-center rounded-full p-3">
                <MapPin className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-foreground">{user.profile.location}</span>
              </div>
              <div className="bg-muted/50 flex items-center rounded-full p-3">
                <Mail className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-foreground truncate">{user.email}</span>
              </div>
              <div className="bg-muted/50 flex items-center rounded-full p-3">
                <Phone className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-foreground">{user.phone}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid w-full grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg font-semibold">
            <Globe className="text-primary mr-2 h-5 w-5" />
            Professional Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.profile.websiteUrl && (
            <a
              href={user.profile.websiteUrl}
              className="bg-muted/50 hover:bg-muted text-foreground hover:text-primary flex items-center rounded-full p-3 transition-colors"
            >
              <Globe className="text-primary mr-3 h-5 w-5" />
              <span className="font-medium">Personal Website</span>
            </a>
          )}
          {user.profile.linkedInUrl && (
            <a
              href={user.profile.linkedInUrl}
              className="bg-muted/50 hover:bg-muted text-foreground hover:text-primary flex items-center rounded-full p-3 transition-colors"
            >
              <Linkedin className="text-primary mr-3 h-5 w-5" />
              <span className="font-medium">LinkedIn Profile</span>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
