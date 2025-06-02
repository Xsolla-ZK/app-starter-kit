import { settings } from '@xsolla-zk/config';
import { sharedConfig } from '@xsolla-zk/config';
import { fonts } from './tokens/fonts';
import { media } from './tokens/media/web';
import { web } from './tokens/platform';
import { themes } from './tokens/themes';
import { tokens } from './tokens/tokens';
import { typography } from './tokens/typography';
import type { CreateTamaguiProps } from '@xsolla-zk/react';

export const tokensConfig = {
  ...sharedConfig,
  fonts,
  themes,
  tokens: {
    ...tokens,
    platform: web,
    typography,
  },
  media,
  settings,
} satisfies CreateTamaguiProps;
