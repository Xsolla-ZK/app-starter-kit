'use client';

import '@tamagui/polyfill-dev';
import '@xsolla-zk/react/reset.css';

import {
  CustomToast,
  NotificationProvider,
  NotificationViewport,
  TamaguiProvider,
  type TamaguiProviderProps,
} from '@app/ui';
import { useColorScheme } from 'react-native';

export function Provider({
  children,
  defaultTheme,
  ...rest
}: TamaguiProviderProps & { defaultTheme?: string }) {
  const colorScheme = useColorScheme();
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <TamaguiProvider defaultTheme={theme} {...rest}>
      <NotificationProvider duration={20000}>
        {children}
        <CustomToast />
        {/* <CustomSnackBar /> */}
        <NotificationViewport name="toast" top={300} left={0} right={0} />
        {/* <NotificationViewport name="snack-bar" multipleNotifications bottom={0} right={0} /> */}
      </NotificationProvider>

      {/* <CustomToast />
        <CustomSnackBar />
        <NotificationViewport name="toast" top={20} left={0} right={0} />
        <NotificationViewport name="snack-bar" multipleNotifications bottom={0} right={0} />
      </NotificationProvider> */}
    </TamaguiProvider>
  );
}
