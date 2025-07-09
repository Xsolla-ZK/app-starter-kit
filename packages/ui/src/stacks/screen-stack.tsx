import type { GetProps, TamaguiElement } from '@xsolla-zk/react';
import { Stack } from '@xsolla-zk/react';
import { forwardRef } from 'react';

export const ScreenStack = forwardRef<TamaguiElement, GetProps<typeof Stack>>((props, ref) => (
  <Stack
    gap="$space.350"
    paddingVertical="$space.350"
    {...props}
    paddingHorizontal="$platform.layout.margin-horizontal.sm"
    $md={{ paddingHorizontal: '$platform.layout.margin-horizontal.md' }}
    $lg={{ paddingHorizontal: '$platform.layout.margin-horizontal.lg' }}
    $xl={{ paddingHorizontal: '$platform.layout.margin-horizontal.xl' }}
    ref={ref}
  />
));
