import { Portal } from '@tamagui/portal';
import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import {
  ReprogapateNotificationProvider,
  useNotificationProviderContext,
} from './provider/notification-provider';

export function NotificationPortal({ children, zIndex }: { children: ReactNode; zIndex?: number }) {
  let content = children;
  const context = useNotificationProviderContext();
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    content = (
      <ReprogapateNotificationProvider context={context}>
        {children}
      </ReprogapateNotificationProvider>
    );
  }
  return <Portal zIndex={zIndex || Number.MAX_SAFE_INTEGER}>{content}</Portal>;
}
