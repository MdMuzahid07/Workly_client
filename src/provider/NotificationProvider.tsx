'use client';

import React, { useEffect } from 'react';
import { useSocket } from './SocketProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import notificationApi from '../redux/feature/notification/notificationApi';
import messageApi from '../redux/feature/message/messageApi';
import { playReceived } from '../lib/notificationSound';
import { toast } from 'sonner';

interface RealtimeNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  jobId?: string | null;
  applicationId?: string | null;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth) || {};

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: RealtimeNotification) => {
      // 1. Check if it's a message notification
      if (notification.type === 'MESSAGE_RECEIVED') {
        const isMessagesPage =
          pathname === '/employer/messages' || pathname === '/dashboard/messages';
        if (isMessagesPage) return; // Suppress on messages page to let MessageView handle it

        // Play the incoming chime sound (complying with mute/volume settings)
        playReceived();

        // Display a toast with a Reply action
        const conversationId = notification.metadata?.conversationId as string;
        toast.info(notification.title, {
          description: notification.message,
          duration: 5000,
          action: {
            label: 'Reply',
            onClick: () => {
              const targetUrl =
                user?.role === 'EMPLOYER'
                  ? `/employer/messages?conversationId=${conversationId}`
                  : `/dashboard/messages?conversationId=${conversationId}`;
              router.push(targetUrl);
            },
          },
        });

        // Invalidate message API and notification API tags to sync unread counts & lists
        dispatch(messageApi.util.invalidateTags(['Conversations']));
        dispatch(notificationApi.util.invalidateTags(['notifications']));
        return;
      }

      // 2. Handle normal notification types (job applications, status change, etc.)
      playReceived();

      toast.info(notification.title, {
        description: notification.message,
        duration: 5000,
        action: {
          label: 'View',
          onClick: () => {
            if (
              notification.type === 'APPLICATION_RECEIVED' ||
              notification.type === 'APPLICATION_STATUS_CHANGE'
            ) {
              const target =
                user?.role === 'EMPLOYER' ? '/employer/jobs' : '/dashboard/applied-jobs';
              router.push(target);
            }
          },
        },
      });

      dispatch(notificationApi.util.invalidateTags(['notifications']));
    };

    socket.on('notification:new', handleNewNotification);

    return () => {
      socket.off('notification:new', handleNewNotification);
    };
  }, [socket, dispatch, pathname, router, user]);

  return <>{children}</>;
};

export default NotificationProvider;
