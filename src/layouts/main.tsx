'use client';

import { ArrowLeft } from '@xsolla-zk/icons';
import { NavBar, RichIcon, View } from '@xsolla-zk/react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { ScreenStack } from '~/components/stacks/screen-stack';

const pageMappings: Record<string, string> = {
  '/': 'UI Kit Demo',
  '/typography': 'Typography',
  '/colors': 'Colors',
  '/modals-overlays': 'Modals & Overlays',
  '/size': 'Size',
};

const DynamicToggleThemeButton = dynamic(() => import('~/interface/toggle-theme-button').then((mod) => mod.ToggleThemeButton), {
  ssr: false,
});

export function MainLayout({ children }: { children: ReactNode }) {
  const { back, replace } = useRouter();
  const pathname = usePathname();

  const notHomePage = pathname !== '/';

  return (
    <View maxWidth={800} width="100%" marginHorizontal="auto">
      {/* <SafeAreaView edges={['top']}> */}
      <NavBar preset="prominent" backgroundColor="$layer.floor-1">
        {/* {isWeb && <Stack paddingTop={16} />} */}
        <NavBar.StartSlot>
          {(notHomePage) && (
            <RichIcon
              size="$300"
              pressable
              onPress={() => {
                if (notHomePage) {
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
          <DynamicToggleThemeButton />
        </NavBar.EndSlot>
      </NavBar>
      {/* </SafeAreaView> */}
      <ScreenStack>{children}</ScreenStack>
    </View>
  );
}
