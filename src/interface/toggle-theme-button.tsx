import { useSchemeSetting } from '@vxrn/color-scheme';
import { Moon, Star, Sun } from '@xsolla-zk/icons';
import { isWeb, RichIcon } from '@xsolla-zk/react';
import { Appearance } from 'react-native';

const schemeSettings = ['light', 'dark', 'system'] as const;

export function ToggleThemeButton() {
  const { onPress, Icon } = useToggleTheme();

  return (
    <RichIcon size="$300" pressable onPress={onPress}>
      <RichIcon.Icon icon={Icon} />
    </RichIcon>
  );
}

export function useToggleTheme() {
  const [{ setting, scheme }, setSchemeSetting] = useSchemeSetting();
  const Icon = setting === 'system' ? Star : setting === 'dark' ? Sun : Moon;

  return {
    setting,
    scheme,
    Icon,
    onPress: () => {
      const next =
        setting === 'system'
          ? scheme === 'light'
            ? 'dark'
            : 'light'
          : schemeSettings[(schemeSettings.indexOf(setting) + 1) % 3];

      if (!isWeb) {
        Appearance.setColorScheme(next === 'system' ? scheme : next);
      }

      setSchemeSetting(next);
    },
  };
}
