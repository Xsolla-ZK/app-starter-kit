import { useColorScheme } from '@vxrn/color-scheme';
import { NotificationProvider, NotificationViewport, TamaguiProvider } from '@xsolla-zk/react';
import { config } from '../config/tamagui.config';
import type { ReactNode } from 'react';
import { CustomSnackBar } from '~/components/snack-bar/snack-bar';
import { CustomToast } from '~/components/toast/toast';

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [scheme] = useColorScheme();

  return (
    <TamaguiProvider disableInjectCSS config={config} defaultTheme={scheme}>
      <NotificationProvider swipeDirection="vertical">
        {children}
        <CustomToast />
        <CustomSnackBar />
        <NotificationViewport name="toast" top={20} left={0} right={0} />
        <NotificationViewport name="snack-bar" multipleNotifications bottom={0} right={0} />
      </NotificationProvider>
    </TamaguiProvider>
  );
};
