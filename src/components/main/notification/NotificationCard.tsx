"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CheckCircle2, MoreVertical, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import type { NotificationItem, NotificationType } from "@/types/notification";
import type { ReactNode } from "react";

interface NotificationCardProps {
  notification: NotificationItem;
  getNotificationColor: (type: NotificationType) => string;
  getNotificationIcon: (type: NotificationType) => ReactNode;
  deleteNotification: (id: string) => void;
  markAsRead: (id: string) => void;
}

/** Safely cast the opaque metadata to a displayable record */
interface NotificationMeta {
  jobTitle?: string;
  companyName?: string;
  applicationStatus?: string;
}

const getMetadata = (raw: unknown): NotificationMeta => {
  if (raw !== null && typeof raw === "object") {
    return raw as NotificationMeta;
  }
  return {};
};

const NotificationCard = ({
  notification,
  getNotificationColor,
  getNotificationIcon,
  deleteNotification,
  markAsRead,
}: NotificationCardProps) => {
  const meta = getMetadata(notification.metadata);

  return (
    <Card
      key={notification.id}
      className={`bg-card rounded-xl border shadow-xs transition-all ${
        !notification.isRead ? "bg-primary/5 ring-primary/20 ring-2" : ""
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
                {(meta.jobTitle ||
                  meta.companyName ||
                  meta.applicationStatus) && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {meta.jobTitle && (
                      <Badge variant="secondary" className="text-xs">
                        {meta.jobTitle}
                      </Badge>
                    )}
                    {meta.companyName && (
                      <Badge variant="outline" className="text-xs">
                        {meta.companyName}
                      </Badge>
                    )}
                    {meta.applicationStatus && (
                      <Badge variant="default" className="text-xs">
                        {meta.applicationStatus}
                      </Badge>
                    )}
                  </div>
                )}
                <p className="text-muted-foreground text-xs">
                  {notification.createdAt}
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
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-card w-40 space-y-3 rounded-2xl p-4 shadow"
                  >
                    {!notification.isRead && (
                      <DropdownMenuItem
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark as read
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive flex cursor-pointer items-center gap-2"
                      onClick={() => deleteNotification(notification.id)}
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
  );
};

export default NotificationCard;
