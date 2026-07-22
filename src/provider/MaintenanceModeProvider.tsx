'use client';

import { useSocket } from '@/provider/SocketProvider';
import systemApi from '@/redux/feature/system/systemApi';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export function MaintenanceModeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth?.user);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const { socket } = useSocket();
  const warningToastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleWarning = ({
      gracePeriodMs,
      message,
    }: {
      gracePeriodMs: number;
      message: string;
    }) => {
      if (isAdmin) return;

      const seconds = Math.round(gracePeriodMs / 1000);
      warningToastId.current = toast.warning(`Platform entering maintenance in ${seconds}s`, {
        description: message,
        duration: gracePeriodMs,
      });
    };

    const handleChange = ({
      enabled,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _message,
    }: {
      enabled: boolean;
      _message?: string | null;
    }) => {
      // Invalidate tags to keep queries in sync
      dispatch(systemApi.util.invalidateTags(['admin']));

      if (!isAdmin) {
        if (warningToastId.current) {
          toast.dismiss(warningToastId.current);
          warningToastId.current = null;
        }

        if (enabled) {
          router.push('/maintenance');
        } else {
          toast.success('Maintenance complete', {
            description: 'Platform is back online.',
          });
          router.push('/');
        }
      }
    };

    socket.on('maintenance:warning', handleWarning);
    socket.on('maintenance:change', handleChange);

    return () => {
      socket.off('maintenance:warning', handleWarning);
      socket.off('maintenance:change', handleChange);
    };
  }, [isAdmin, router, dispatch, socket]);

  return <>{children}</>;
}

export default MaintenanceModeProvider;
