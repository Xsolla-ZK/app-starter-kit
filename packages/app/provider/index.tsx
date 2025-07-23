'use client';

import '@tamagui/polyfill-dev';
import '@xsolla-zk/react/reset.css';

import { config } from '@app/config';
import { PortalProvider, TamaguiProvider, type TamaguiProviderProps } from '@app/ui';
import { useColorScheme } from 'react-native';

export function Provider({
  children,
  defaultTheme,
  ...rest
}: TamaguiProviderProps & { defaultTheme?: string }) {
  const colorScheme = useColorScheme();
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <PortalProvider shouldAddRootHost>{children}</PortalProvider>
    </TamaguiProvider>
  );
}
