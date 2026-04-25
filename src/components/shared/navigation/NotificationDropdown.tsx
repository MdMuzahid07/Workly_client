"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  BellRing,
  Briefcase,
  Calendar,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import CompactNotificationCard from "./CompactNotificationCard";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const NotificationDropdown = () => {
  const { user } = useAppSelector((state) => state.auth) || {};
  const isEmployer = user?.role === "EMPLOYER" || (user?.role as number) === 1;

  // TODO: Replace with actual API call when notification API is ready
  // For now using mock data
  const notifications: Notification[] = useMemo(() => {
    // Mock notifications - replace with actual API call
    return [
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
    ];
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 5);
  const notificationUrl = isEmployer
    ? "/employer/notifications"
    : "/dashboard/notifications";

  const markAsRead = (id: string) => {
    // TODO: Implement mark as read API call
    console.log("Mark as read:", id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteNotification = (id: string) => {
    // TODO: Implement delete notification API call
    console.log("Delete notification:", id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-8 w-8">
        <Button
          variant="ghost"
          size="icon"
          className="bg-background text-muted-foreground hover:bg-accent/50 hover:text-foreground relative rounded-full border border-transparent transition-all duration-200"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full"
            >
              <span className="text-primary-foreground text-xs font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-9999 mt-6 w-80 rounded-2xl p-0 sm:w-96"
        sideOffset={8}
      >
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>

        <div className="flex max-h-[450px] flex-col">
          <ScrollArea className="max-h-[350px] flex-1">
            <div className="space-y-2 p-3">
              {recentNotifications.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="text-muted-foreground mb-2 h-8 w-8" />
                  <p className="text-sm">No notifications</p>
                  <p className="text-xs">{`You're`} all caught up!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {recentNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CompactNotificationCard
                        id={notification.id}
                        icon={getNotificationIcon(notification.type)}
                        title={notification.title}
                        message={notification.message}
                        timestamp={notification.timestamp}
                        isRead={notification.isRead}
                        onClick={() => markAsRead(notification.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </ScrollArea>

          {recentNotifications.length > 0 && (
            <div className="bg-background sticky bottom-0 border-t">
              <div className="p-2">
                <Link href={notificationUrl}>
                  <Button
                    variant="ghost"
                    className="text-primary hover:bg-accent w-full justify-between"
                  >
                    <span className="text-sm font-medium">
                      All Notifications
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
