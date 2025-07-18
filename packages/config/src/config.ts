import { settings, shorthands } from '@xsolla-zk/config';
import type { CreateTamaguiProps } from '@xsolla-zk/react';
import { animations } from './animations';
import { themes } from './themes';
import { fonts } from './tokens/fonts';
import { media } from './tokens/media/web';
import { web } from './tokens/platform';
import { tokens } from './tokens/tokens';
import { typography } from './tokens/typography';

export const tokensConfig = {
  shorthands,
  // animations: baseAnimations,
  animations,
  fonts,
  themes,
  tokens: {
    ...tokens,
    platform: web,
    typography,
  },
  media,
  settings,
  selectionStyles: (theme) => ({
    backgroundColor: theme['background.brand-high'],
    color: theme['content.on-brand'],
  }),
} satisfies CreateTamaguiProps;
