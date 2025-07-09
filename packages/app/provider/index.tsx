'use client';

import '@tamagui/polyfill-dev';
import '@xsolla-zk/react/reset.css';

import { TamaguiProvider, type TamaguiProviderProps } from '@app/ui';
import { useColorScheme } from 'react-native';
// import { useColorScheme } from 'react-native';

export function Provider({
  children,
  defaultTheme,
  ...rest
}: TamaguiProviderProps & { defaultTheme?: string }) {
  const colorScheme = useColorScheme();
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <TamaguiProvider defaultTheme={theme} {...rest}>
      {/* <NotificationProvider swipeDirection="vertical"> */}
      {children}
      {/* <CustomToast />
        <CustomSnackBar />
        <NotificationViewport name="toast" top={20} left={0} right={0} />
        <NotificationViewport name="snack-bar" multipleNotifications bottom={0} right={0} />
      </NotificationProvider> */}
    </TamaguiProvider>
  );
}
