import type { CreateTamaguiProps } from '@tamagui/core';
import { settings, sharedConfig } from '@xsolla-zk/config';
import { themes } from './themes';
import { fonts } from './tokens/fonts';
import { media } from './tokens/media/web';
import { web } from './tokens/platform';
import { tokens } from './tokens/tokens';
import { typography } from './tokens/typography';
// import { sharpGrotesk } from './custom-fonts';

// const customFonts = createCustomFont(fonts, {
//   display: {
//     family: sharpGrotesk.style.fontFamily,
//   },
//   text: {
//     family: onest.style.fontFamily,
//   }
// })

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
  selectionStyles: (theme) => ({
    backgroundColor: theme['background.brand-high'],
    color: theme['content.on-brand'],
  }),
} satisfies CreateTamaguiProps;
