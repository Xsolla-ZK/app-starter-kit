'use client';

import { config } from '@app/config';
import type { ColorScheme } from '@tamagui/next-theme';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { Provider } from 'app/provider';
import { useServerInsertedHTML } from 'next/navigation';
import { type ReactNode, useRef } from 'react';
import { StyleSheet } from 'react-native';

export function NextTamaguiProvider({ children }: { children: ReactNode }) {
  const [_theme, setTheme] = useRootTheme();
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
      forcedTheme="dark"
      onChangeTheme={(next) => {
        setTheme(next as ColorScheme);
      }}
    >
      <Provider config={config}>{children}</Provider>
    </NextThemeProvider>
  );
}
