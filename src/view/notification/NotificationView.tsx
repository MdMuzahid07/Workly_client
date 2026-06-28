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
import NotificationsSkeleton from "@/skeleton/notification/NotificationsSkeleton";
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

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  createdAt: string;
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
      return <Briefcase className="text-primary h-4 w-4 sm:h-5 sm:w-5" />;
    case "MESSAGE_RECEIVED":
      return <MessageSquare className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />;
    case "INTERVIEW_SCHEDULED":
      return <Calendar className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5" />;
    case "NEW_JOB_MATCH":
      return <BellRing className="h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" />;
    case "SYSTEM_ANNOUNCEMENT":
      return <BellRing className="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />;
    default:
      return <Bell className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "APPLICATION_RECEIVED":
    case "APPLICATION_STATUS_CHANGE":
      return "bg-primary/10 border-primary/20";
    case "MESSAGE_RECEIVED":
      return "bg-blue-500/10 border-blue-500/20";
    case "INTERVIEW_SCHEDULED":
      return "bg-orange-500/10 border-orange-500/20";
    case "NEW_JOB_MATCH":
      return "bg-emerald-500/10 border-emerald-500/20";
    case "SYSTEM_ANNOUNCEMENT":
      return "bg-amber-500/10 border-amber-500/20";
    default:
      return "bg-muted border-border/60";
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
    createdAt: n.createdAt || "",
    timestamp: n.createdAt
      ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
      : "",
    metadata: (n.metadata as Record<string, string | undefined>) ?? undefined,
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
    <div className="min-h-screen">
      <DashboardNotificationHeader />

      {isNotifLoading ? (
        <NotificationsSkeleton />
      ) : (
        <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full space-y-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="bg-card border-border/60 flex h-auto w-full gap-1 rounded-full border p-1 shadow-2xs sm:h-11">
                <TabsTrigger
                  value="all"
                  className="w-full flex-1 cursor-pointer rounded-full py-2 text-xs font-bold transition-all sm:py-2.5 sm:text-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="w-full flex-1 cursor-pointer rounded-full py-2 text-xs font-bold transition-all sm:py-2.5 sm:text-sm"
                >
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="w-full flex-1 cursor-pointer rounded-full py-2 text-xs font-bold transition-all sm:py-2.5 sm:text-sm"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="w-full flex-1 cursor-pointer rounded-full py-2 text-xs font-bold transition-all sm:py-2.5 sm:text-sm"
                >
                  Messages
                </TabsTrigger>
              </TabsList>

              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAll}
                  className="h-9 shrink-0 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 sm:text-sm"
                >
                  <BellRing className="mr-2 h-3.5 w-3.5" />
                  Mark all read
                </Button>
              )}
            </div>
          </Tabs>

          <div className="space-y-3 sm:space-y-4">
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
              <Card className="bg-card rounded-2xl border-2 border-dashed py-16 text-center shadow-xs sm:py-24">
                <CardContent className="flex flex-col items-center gap-3 p-4 sm:gap-4">
                  <div className="bg-primary/10 rounded-full p-4 sm:p-5">
                    <Bell className="text-primary h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="text-foreground text-base font-bold tracking-tight sm:text-xl">
                    No notifications
                  </h3>
                  <p className="text-muted-foreground max-w-sm text-xs font-medium opacity-80 sm:text-sm">
                    {activeTab === "unread"
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationView;
