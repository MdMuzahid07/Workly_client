import { ReactNode } from 'react';
import MainLayoutClient from '@/components/main/MainLayoutClient';

export default function layout({ children }: { children: ReactNode }) {
  return <MainLayoutClient>{children}</MainLayoutClient>;
}
