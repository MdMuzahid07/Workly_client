"use client";
import DashboardNotificationHeader from "@/components/dashboard/dashboard-nav/header/DashboardNotificationHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDeleteNotificationMutation,
  useGetMyNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/feature/notification/notificationApi";
import { useAppSelector } from "@/redux/hooks";
import type { NotificationType } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  BellRing,
  Briefcase,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import NotificationCard from "../../components/main/notification/NotificationCard";
import NotificationsSkeleton from "@/skeleton/notification/NotificationsSkeleton";

interface Notification {
  id: string;
  type: NotificationType;
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
      return <BellRing className="h-5 w-5 text-yellow-500" />;
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
  const { user } = useAppSelector((s) => s.auth) || {};
  const skip = !user?.id;

  const { data: envelope, isLoading: isNotifLoading } =
    useGetMyNotificationsQuery(
      { page: 1, limit: 100 },
      { skip, refetchOnMountOrArgChange: true },
    );
  const raw = Array.isArray(envelope?.data) ? envelope!.data : [];

  const notifications: Notification[] = raw.map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    isRead: n.isRead,
    timestamp: n.createdAt
      ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
      : "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: (n.metadata as any) ?? undefined,
  }));

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

  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();
  const [deleteNotif] = useDeleteNotificationMutation();

  const markAsRead = async (id: string) => {
    try {
      await markRead(id).unwrap();
    } catch {
      // ignore
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await deleteNotif(id).unwrap();
    } catch {
      // ignore
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllRead().unwrap();
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardNotificationHeader />

      {isNotifLoading ? (
        <NotificationsSkeleton />
      ) : (
        <div className="space-y-6 px-4 py-8 sm:px-6">
          <div>
            {/* Filter Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="bg-muted/10 h-10 w-full max-w-lg rounded-full border p-1 sm:w-auto">
                  <TabsTrigger
                    value="all"
                    className="cursor-pointer rounded-full font-bold"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="cursor-pointer rounded-full font-bold"
                  >
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </TabsTrigger>
                  <TabsTrigger
                    value="applications"
                    className="cursor-pointer rounded-full font-bold"
                  >
                    Applications
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="cursor-pointer rounded-full font-bold"
                  >
                    Messages
                  </TabsTrigger>
                </TabsList>

                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleMarkAll}
                    className="h-10 rounded-full font-bold shadow-xs transition-all active:scale-95"
                  >
                    <BellRing className="mr-2 h-4 w-4" />
                    Mark all read
                  </Button>
                )}
              </div>
            </Tabs>

            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <NotificationCard
                    key={notif.id}
                    notification={notif}
                    getNotificationColor={getNotificationColor}
                    getNotificationIcon={getNotificationIcon}
                    deleteNotification={deleteNotification}
                    markAsRead={markAsRead}
                  />
                ))
              ) : (
                <Card className="bg-card rounded-xl border-2 border-dashed py-24 text-center">
                  <CardContent className="flex flex-col items-center gap-4 p-0">
                    <div className="bg-muted/20 rounded-full p-6">
                      <Bell className="text-muted-foreground/20 h-10 w-10" />
                    </div>
                    <h3 className="text-foreground text-lg font-black tracking-tight">
                      No notifications
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium opacity-80">
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
      )}
    </div>
  );
};

export default NotificationView;
