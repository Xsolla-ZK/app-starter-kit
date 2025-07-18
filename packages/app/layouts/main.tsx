'use client';

import { getMappedStyles, ScreenStack, styled, View } from '@app/ui';
import type { PropsWithChildren } from 'react';

const MainWrapper = styled(View, {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  ...getMappedStyles({
    gap: {
      base: '$platform.layout.gutter.sm',
      $md: '$platform.layout.gutter.md',
      $lg: '$platform.layout.gutter.lg',
      $xl: '$platform.layout.gutter.xl',
    },
  }),
});

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <MainWrapper>
      <ScreenStack width="100%" height="100%">
        {children}
      </ScreenStack>
    </MainWrapper>
  );
}
