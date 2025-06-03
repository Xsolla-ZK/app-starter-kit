import { useThemeSetting, useRootTheme } from '@tamagui/next-theme';
import { Sun, Moon, Star } from '@xsolla-zk/icons';
import { RichIcon, useIsomorphicLayoutEffect } from '@xsolla-zk/react';
import { useState } from 'react';

const schemeSettings = ['light', 'dark', 'system'] as const;

export function ToggleThemeButton() {
  const themeSetting = useThemeSetting();
  const [theme] = useRootTheme();

  const [clientTheme, setClientTheme] = useState<string | undefined>('light');

  const Icon =
    themeSetting.current === 'system' ? Star : themeSetting.current === 'dark' ? Sun : Moon;

  useIsomorphicLayoutEffect(() => {
    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme);
  }, [themeSetting.current, themeSetting.resolvedTheme]);

  return (
    <RichIcon size="$300" pressable onPress={themeSetting.toggle}>
      <RichIcon.Icon icon={Icon} />
    </RichIcon>
  );
}
