/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Bell,
  BellRing,
  Briefcase,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import NotificationCard from "../../components/main/notification/NotificationCard";

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
      return "bg-primary/10 border-green-200";
    case "SYSTEM_ANNOUNCEMENT":
      return "bg-yellow-50 border-yellow-200";
    default:
      return "bg-muted/50 border-border";
  }
};

const NotificationView = () => {
  const [activeTab, setActiveTab] = useState("all");

  // fake data
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

  const markAsRead = (id: string) => {};

  const markAllAsRead = () => {};

  const deleteNotification = (id: string) => {};

  return (
    <div className="bg-primary/2 min-h-screen md:pt-24">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-7xl">
          {/* Filter Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6 overflow-x-auto"
          >
            <TabsList className="grid w-full min-w-[400px] grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="all" className="cursor-pointer text-sm">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="cursor-pointer text-sm">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="cursor-pointer text-sm"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger value="messages" className="cursor-pointer text-sm">
                Messages
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  getNotificationColor={getNotificationColor}
                  getNotificationIcon={getNotificationIcon}
                  deleteNotification={deleteNotification}
                  markAsRead={markAsRead}
                />
                // <NotificationCardSkeleton key={index} />
              ))
            ) : (
              // Fallback for no notifications
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
