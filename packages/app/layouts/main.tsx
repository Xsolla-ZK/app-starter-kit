'use client';

import { Stack } from '@app/ui';
import type { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  return <Stack paddingTop={200}>{children}</Stack>;
}
