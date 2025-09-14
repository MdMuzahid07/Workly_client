/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Bell,
  BellRing,
  Briefcase,
  Calendar,
  CheckCircle2,
  MessageSquare,
  MoreVertical,
  X,
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  type:
    | "APPLICATION_RECEIVED"
    | "APPLICATION_STATUS_CHANGE"
    | "NEW_JOB_MATCH"
    | "MESSAGE_RECEIVED"
    | "INTERVIEW_SCHEDULED"
    | "SYSTEM_ANNOUNCEMENT";
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  metadata?: {
    jobTitle?: string;
    companyName?: string;
    senderName?: string;
    applicationStatus?: string;
  };
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "APPLICATION_RECEIVED":
    case "APPLICATION_STATUS_CHANGE":
      return <Briefcase className="text-primary h-5 w-5" />;
    case "MESSAGE_RECEIVED":
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case "INTERVIEW_SCHEDULED":
      return <Calendar className="h-5 w-5 text-orange-500" />;
    case "NEW_JOB_MATCH":
      return <BellRing className="h-5 w-5 text-green-500" />;
    case "SYSTEM_ANNOUNCEMENT":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    default:
      return <Bell className="text-muted-foreground h-5 w-5" />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "APPLICATION_RECEIVED":
    case "APPLICATION_STATUS_CHANGE":
      return "bg-primary/10 border-primary/20";
    case "MESSAGE_RECEIVED":
      return "bg-blue-50 border-blue-200";
    case "INTERVIEW_SCHEDULED":
      return "bg-orange-50 border-orange-200";
    case "NEW_JOB_MATCH":
      return "bg-green-50 border-green-200";
    case "SYSTEM_ANNOUNCEMENT":
      return "bg-yellow-50 border-yellow-200";
    default:
      return "bg-muted/50 border-border";
  }
};

const NotificationView = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - replace with actual API calls
  const notifications: Notification[] = [
    {
      id: "1",
      type: "APPLICATION_STATUS_CHANGE",
      title: "Application Status Updated",
      message:
        'Your application for Frontend Developer at TechFlow Inc. has been moved to "Interview" stage.',
      isRead: false,
      timestamp: "2 hours ago",
      metadata: {
        jobTitle: "Frontend Developer",
        companyName: "TechFlow Inc.",
        applicationStatus: "Interview",
      },
    },
    {
      id: "2",
      type: "MESSAGE_RECEIVED",
      title: "New Message",
      message: "Sarah Johnson sent you a message about your application.",
      isRead: false,
      timestamp: "3 hours ago",
      metadata: {
        senderName: "Sarah Johnson",
        companyName: "TechFlow Inc.",
      },
    },
    {
      id: "3",
      type: "INTERVIEW_SCHEDULED",
      title: "Interview Scheduled",
      message:
        "Your interview for Backend Engineer position has been scheduled for tomorrow at 2:00 PM.",
      isRead: true,
      timestamp: "1 day ago",
      metadata: {
        jobTitle: "Backend Engineer",
        companyName: "DataVision Labs",
      },
    },
    {
      id: "4",
      type: "NEW_JOB_MATCH",
      title: "New Job Match",
      message: "We found 3 new jobs that match your preferences.",
      isRead: true,
      timestamp: "2 days ago",
    },
    {
      id: "5",
      type: "APPLICATION_RECEIVED",
      title: "Application Received",
      message:
        "Your application for Full Stack Developer at InnovateCorp has been received.",
      isRead: true,
      timestamp: "3 days ago",
      metadata: {
        jobTitle: "Full Stack Developer",
        companyName: "InnovateCorp",
      },
    },
    {
      id: "6",
      type: "SYSTEM_ANNOUNCEMENT",
      title: "Platform Update",
      message:
        "New features have been added to improve your job search experience.",
      isRead: true,
      timestamp: "1 week ago",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    if (activeTab === "applications")
      return [
        "APPLICATION_RECEIVED",
        "APPLICATION_STATUS_CHANGE",
        "INTERVIEW_SCHEDULED",
      ].includes(notification.type);
    if (activeTab === "messages")
      return notification.type === "MESSAGE_RECEIVED";
    return true;
  });

  const markAsRead = (id: string) => {
    // Handle marking notification as read - integrate with your API
    console.log("Marking notification as read:", id);
  };

  const markAllAsRead = () => {
    // Handle marking all notifications as read - integrate with your API
    console.log("Marking all notifications as read");
  };

  const deleteNotification = (id: string) => {
    // Handle deleting notification - integrate with your API
    console.log("Deleting notification:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-6xl">
          {/* Filter Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="all" className="text-sm">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-sm">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="applications" className="text-sm">
                Applications
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-sm">
                Messages
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`bg-white transition-all ${
                    !notification.isRead
                      ? "ring-primary/20 bg-primary/5 ring-2"
                      : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Notification Icon */}
                      <div
                        className={`rounded-full p-2 ${getNotificationColor(notification.type)}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Notification Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center space-x-2">
                              <h3
                                className={`text-sm font-semibold ${
                                  !notification.isRead
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="bg-primary h-2 w-2 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-2 text-sm">
                              {notification.message}
                            </p>
                            {notification.metadata && (
                              <div className="mb-2 flex flex-wrap gap-2">
                                {notification.metadata.jobTitle && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {notification.metadata.jobTitle}
                                  </Badge>
                                )}
                                {notification.metadata.companyName && (
                                  <Badge variant="outline" className="text-xs">
                                    {notification.metadata.companyName}
                                  </Badge>
                                )}
                                {notification.metadata.applicationStatus && (
                                  <Badge variant="default" className="text-xs">
                                    {notification.metadata.applicationStatus}
                                  </Badge>
                                )}
                              </div>
                            )}
                            <p className="text-muted-foreground text-xs">
                              {notification.timestamp}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="ml-4 flex items-center space-x-1">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.isRead && (
                                  <DropdownMenuItem
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() =>
                                    deleteNotification(notification.id)
                                  }
                                  className="text-destructive"
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Bell className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    No notifications
                  </h3>
                  <p className="text-muted-foreground">
                    {activeTab === "unread"
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
