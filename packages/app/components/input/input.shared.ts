import type { StaticConfigPublic } from '@app/ui';
import { Text } from '@app/ui';

export const inputSharedStyledOptions = {
  isInput: true,
  accept: {
    placeholderTextColor: 'color',
    selectionColor: 'color',
  } as const,

  validStyles: Text.staticConfig.validStyles,
} satisfies StaticConfigPublic;
