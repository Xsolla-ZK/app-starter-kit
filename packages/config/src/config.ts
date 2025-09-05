import { settings, shorthands } from '@xsolla-zk/config';
import { type CreateTamaguiProps, wrapTokensWithPx } from '@xsolla-zk/react';
import { animations } from './animations';
import { themes } from './themes';
import { fonts } from './tokens/fonts';
import { media } from './tokens/media/web';
import { web } from './tokens/platform';
import { tokens } from './tokens/tokens';

export const tokensConfig = {
  shorthands,
  animations,
  fonts,
  themes,
  tokens: wrapTokensWithPx(
    {
      ...tokens,
      platform: web,
    },
    ['platform', 'stroke'],
  ),
  media,
  settings,
  selectionStyles: (theme) => ({
    backgroundColor: theme['background.brand-high'],
    color: theme['content.on-brand'],
  }),
} satisfies CreateTamaguiProps;
