'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { NotificationItem, NotificationType } from '@/types/notification';
import { CheckCircle2, MoreVertical, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface NotificationCardProps {
  notification: NotificationItem;
  getNotificationColor: (type: NotificationType) => string;
  getNotificationIcon: (type: NotificationType) => ReactNode;
  deleteNotification: (id: string) => void;
  markAsRead: (id: string) => void;
}

interface NotificationMeta {
  jobTitle?: string;
  companyName?: string;
  applicationStatus?: string;
}

const getMetadata = (raw: unknown): NotificationMeta => {
  if (raw !== null && typeof raw === 'object') {
    return raw as NotificationMeta;
  }
  return {};
};

const formatTime = (isoString?: string) => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
};

const NotificationCard = ({
  notification,
  getNotificationColor,
  getNotificationIcon,
  deleteNotification,
  markAsRead,
}: NotificationCardProps) => {
  const meta = getMetadata(notification.metadata);
  const displayTime = formatTime(notification.createdAt);

  return (
    <Card
      className={`group bg-card relative overflow-hidden rounded-2xl border transition-all hover:shadow-sm ${
        !notification.isRead
          ? 'border-primary/40 bg-primary/5 ring-primary/10 ring-1'
          : 'border-border/60'
      }`}
    >
      <CardContent className="p-3.5 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Notification Icon */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border p-2 shadow-2xs sm:h-11 sm:w-11 ${getNotificationColor(
              notification.type,
            )}`}
          >
            {getNotificationIcon(notification.type)}
          </div>

          {/* Notification Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`text-xs font-bold tracking-tight sm:text-sm ${
                      !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="bg-primary h-2 w-2 shrink-0 animate-pulse rounded-full" />
                  )}
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed font-medium sm:text-sm">
                  {notification.message}
                </p>

                {(meta.jobTitle || meta.companyName || meta.applicationStatus) && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pt-1">
                    {meta.jobTitle && (
                      <Badge
                        variant="secondary"
                        className="rounded-md text-[10px] font-bold sm:text-xs"
                      >
                        {meta.jobTitle}
                      </Badge>
                    )}
                    {meta.companyName && (
                      <Badge
                        variant="outline"
                        className="rounded-md text-[10px] font-semibold sm:text-xs"
                      >
                        {meta.companyName}
                      </Badge>
                    )}
                    {meta.applicationStatus && (
                      <Badge
                        variant="default"
                        className="rounded-md text-[10px] font-black tracking-wider uppercase sm:text-xs"
                      >
                        {meta.applicationStatus}
                      </Badge>
                    )}
                  </div>
                )}

                <p className="text-muted-foreground/70 pt-1 text-[10px] font-medium sm:text-xs">
                  {displayTime}
                </p>
              </div>

              {/* Actions Dropdown */}
              <div className="flex shrink-0 items-center gap-1">
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => markAsRead(notification.id)}
                    className="hover:bg-muted text-primary h-8 w-8 rounded-full"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
                    {!notification.isRead && (
                      <DropdownMenuItem
                        className="cursor-pointer rounded-lg p-2 text-xs font-medium"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle2 className="text-primary mr-2 h-3.5 w-3.5" />
                        Mark as read
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg p-2 text-xs font-medium"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
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
