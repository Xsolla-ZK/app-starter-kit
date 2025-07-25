'use client';

import { config } from '@app/config';
import type { ColorScheme } from '@tamagui/next-theme';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { Provider } from 'app/provider';
import { useServerInsertedHTML } from 'next/navigation';
import { type ReactNode, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  NotificationProvider,
  NotificationViewport,
} from './../../../../packages/app/components/notification';
import { CustomToasts } from '../../../../packages/app/components/toasts/toasts';

export function NextTamaguiProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useRootTheme();
  const injected = useRef(false);

  useServerInsertedHTML(() => {
    if (!injected.current) {
      injected.current = true;
      // @ts-ignore
      const rnwStyle = StyleSheet.getSheet();
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
          <style
            dangerouslySetInnerHTML={{
              __html: config.getCSS({
                exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
              }),
            }}
          />
        </>
      );
    }
  });

  return (
    <NextThemeProvider
      skipNextHead
      onChangeTheme={(next) => {
        setTheme(next as ColorScheme);
      }}
    >
      <Provider config={config} defaultTheme={theme ?? 'light'}>
        <NotificationProvider duration={5000}>
          {children}
          <CustomToasts />
          {/* <CustomSnackBar /> */}
          <NotificationViewport
            name="toast"
            top="50%"
            left="50%"
            transform={[{ translateX: '-50%' }, { translateY: '-50%' }]}
          />
          {/* <NotificationViewport name="snack-bar" bottom={0} right={0} /> */}
        </NotificationProvider>
      </Provider>
    </NextThemeProvider>
  );
}
