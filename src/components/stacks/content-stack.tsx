import { Stack } from '@xsolla-zk/react';
import { forwardRef } from 'react';
import type { GetProps, TamaguiElement } from '@xsolla-zk/react';

export const ContentStack = forwardRef<TamaguiElement, GetProps<typeof Stack>>((props, ref) => (
  <Stack
    {...props}
    paddingHorizontal="$platform.layout.content-compensation.sm"
    $md={{ paddingHorizontal: '$platform.layout.content-compensation.md' }}
    $lg={{ paddingHorizontal: '$platform.layout.content-compensation.lg' }}
    $xl={{ paddingHorizontal: '$platform.layout.content-compensation.xl' }}
    ref={ref}
  />
));
