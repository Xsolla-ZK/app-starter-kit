import { ArrowLeft } from '@xsolla-zk/icons';
import { NavBar, RichIcon, View } from '@xsolla-zk/react';
import { usePathname, useRouter } from 'one';
import type { ReactNode } from 'react';
import { ScreenStack } from '~/components/stacks/screen-stack';
import { ToggleThemeButton } from '~/interface/toggle-theme-button';

const pageMappings: Record<string, string> = {
  '/': 'UI Kit Demo',
  '/typography': 'Typography',
  '/colors': 'Colors',
  '/modals-overlays': 'Modals & Overlays',
  '/size': 'Size',
};

export function MainLayout({ children }: { children: ReactNode }) {
  const { back, replace, canGoBack } = useRouter();
  const pathname = usePathname();

  const canBack = canGoBack();
  const notHomePage = pathname !== '/';

  return (
    <View maxWidth={800} width="100%" marginHorizontal="auto">
      {/* <SafeAreaView edges={['top']}> */}
      <NavBar preset="prominent" backgroundColor="$layer.floor-1">
        {/* {isWeb && <Stack paddingTop={16} />} */}
        <NavBar.StartSlot>
          {(canBack || notHomePage) && (
            <RichIcon
              size="$300"
              pressable
              onPress={() => {
                if (!canBack && notHomePage) {
                  replace('/');
                } else {
                  back();
                }
              }}
            >
              <RichIcon.Icon icon={ArrowLeft} />
            </RichIcon>
          )}
        </NavBar.StartSlot>
        <NavBar.Center>
          <NavBar.Title>{pageMappings[pathname]}</NavBar.Title>
        </NavBar.Center>
        <NavBar.EndSlot>
          <ToggleThemeButton />
        </NavBar.EndSlot>
      </NavBar>
      {/* </SafeAreaView> */}
      <ScreenStack>{children}</ScreenStack>
    </View>
  );
}
