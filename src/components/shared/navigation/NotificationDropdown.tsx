'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
} from '@/redux/feature/notification/notificationApi';
import { useAppSelector } from '@/redux/hooks';
import type { NotificationType } from '@/types/notification';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Bell,
  BellRing,
  Briefcase,
  Calendar,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CompactNotificationCard from './CompactNotificationCard';

interface NotificationMetadata {
  jobId?: string;
  applicationId?: string;
  conversationId?: string;
  jobTitle?: string;
  companyName?: string;
  senderName?: string;
  applicationStatus?: string;
}

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  jobId?: string | null;
  applicationId?: string | null;
  metadata?: NotificationMetadata;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'APPLICATION_RECEIVED':
    case 'APPLICATION_STATUS_CHANGE':
      return <Briefcase className="text-primary h-5 w-5" />;
    case 'MESSAGE_RECEIVED':
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case 'INTERVIEW_SCHEDULED':
      return <Calendar className="h-5 w-5 text-orange-500" />;
    case 'NEW_JOB_MATCH':
      return <BellRing className="h-5 w-5 text-green-500" />;
    case 'SYSTEM_ANNOUNCEMENT':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    default:
      return <Bell className="text-muted-foreground h-5 w-5" />;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'APPLICATION_RECEIVED':
    case 'APPLICATION_STATUS_CHANGE':
      return 'bg-primary/10 border-primary/20';
    case 'MESSAGE_RECEIVED':
      return 'bg-blue-50 border-blue-200';
    case 'INTERVIEW_SCHEDULED':
      return 'bg-orange-50 border-orange-200';
    case 'NEW_JOB_MATCH':
      return 'bg-primary/10 border-green-200';
    case 'SYSTEM_ANNOUNCEMENT':
      return 'bg-yellow-50 border-yellow-200';
    default:
      return 'bg-muted/50 border-border';
  }
};

const NotificationDropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth) || {};
  const isEmployer = user?.role === 'EMPLOYER' || (user?.role as number) === 1;

  const skip = !user?.id;
  const { data: unreadEnvelope } = useGetUnreadCountQuery(undefined, { skip });
  const unreadCount = unreadEnvelope?.data?.unreadCount ?? 0;

  const { data: listEnvelope } = useGetMyNotificationsQuery({ page: 1, limit: 5 }, { skip });

  const [markRead] = useMarkNotificationReadMutation();

  const recentNotifications: Notification[] = useMemo(() => {
    const raw = Array.isArray(listEnvelope?.data) ? listEnvelope!.data : [];
    return raw.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      isRead: n.isRead,
      timestamp: n.createdAt ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : '',
      jobId: n.jobId,
      applicationId: n.applicationId,
      metadata: (n.metadata as NotificationMetadata) ?? undefined,
    }));
  }, [listEnvelope]);

  const notificationUrl = isEmployer ? '/employer/notifications' : '/dashboard/notifications';

  const markAsRead = async (id: string) => {
    try {
      await markRead(id).unwrap();
    } catch {
      // ignore; UI will recover on next fetch/socket tick
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.isRead) {
        await markAsRead(notification.id);
      }
    } catch {
      // ignore
    }

    setIsOpen(false);

    let targetUrl = notificationUrl;

    const jobId = notification.jobId || notification.metadata?.jobId;
    const conversationId = notification.metadata?.conversationId;

    switch (notification.type) {
      case 'APPLICATION_RECEIVED':
        targetUrl = isEmployer ? '/employer/applications' : '/dashboard/applied-jobs';
        break;
      case 'APPLICATION_STATUS_CHANGE':
        targetUrl = '/dashboard/applied-jobs';
        break;
      case 'MESSAGE_RECEIVED':
        targetUrl = isEmployer ? '/employer/messages' : '/dashboard/messages';
        if (conversationId) {
          targetUrl += `?conversationId=${conversationId}`;
        }
        break;
      case 'INTERVIEW_SCHEDULED':
        targetUrl = isEmployer ? '/employer/applications' : '/dashboard/applied-jobs';
        break;
      case 'NEW_JOB_MATCH':
        if (jobId) {
          targetUrl = `/jobs/${jobId}`;
        } else {
          targetUrl = isEmployer ? '/employer/jobs' : '/dashboard/recommended-jobs';
        }
        break;
      case 'JOB_VIEWED':
      case 'PROFILE_VIEWED':
        targetUrl = isEmployer ? '/employer/analytics' : '/dashboard/profile-views';
        break;
      case 'JOB_CLOSED':
      case 'JOB_EXPIRING':
        if (jobId) {
          targetUrl = `/jobs/${jobId}`;
        } else {
          targetUrl = isEmployer ? '/employer/jobs' : '/dashboard/saved-jobs';
        }
        break;
      case 'PROFILE_INCOMPLETE':
        targetUrl = isEmployer ? '/employer/company-profile' : '/dashboard/profile';
        break;
      case 'SYSTEM_ANNOUNCEMENT':
      default:
        targetUrl = notificationUrl;
        break;
    }

    router.push(targetUrl);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteNotification = (id: string) => {
    // TODO: Implement delete notification API call
    console.log('Delete notification:', id);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-9999 mt-6 w-80 overflow-hidden rounded-2xl p-0 sm:w-96"
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
                        onClick={() => handleNotificationClick(notification)}
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
                <Link href={notificationUrl} onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="text-primary hover:bg-accent w-full justify-between"
                  >
                    <span className="text-sm font-medium">All Notifications</span>
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
