'use client';

import React, { useEffect } from 'react';
import { useSocket } from './SocketProvider';
import { useAppDispatch } from '../redux/hooks';
import notificationApi from '../redux/feature/notification/notificationApi';
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

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: RealtimeNotification) => {
      // 1. Play the incoming chime sound (complying with mute/volume settings)
      playReceived();

      // 2. Display a beautiful toast notification using sonner
      toast.info(notification.title, {
        description: notification.message,
        duration: 5000,
        action: {
          label: 'View',
          onClick: () => {
            // Optional: Handle redirection on click
          },
        },
      });

      // 3. Invalidate RTK query cache to instantly update counts & dropdowns
      dispatch(notificationApi.util.invalidateTags(['notifications']));
    };

    socket.on('notification:new', handleNewNotification);

    return () => {
      socket.off('notification:new', handleNewNotification);
    };
  }, [socket, dispatch]);

  return <>{children}</>;
};

export default NotificationProvider;
