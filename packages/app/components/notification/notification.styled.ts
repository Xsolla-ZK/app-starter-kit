import { Typography } from '@app/ui';
import { Stack, styled } from '@tamagui/core';
import {
  NOTIFICATION_CLOSE_COMPONENT_NAME,
  NOTIFICATION_DESCRIPTION_COMPONENT_NAME,
  NOTIFICATION_TITLE_COMPONENT_NAME,
} from '@xsolla-zk/constants';

export const NotificationTitle = styled(Typography, {
  name: NOTIFICATION_TITLE_COMPONENT_NAME,
  // Свойства overflow, textOverflow и whiteSpace удалены

  variants: {} as const,

  defaultVariants: {},
});

export const NotificationDescription = styled(Typography, {
  name: NOTIFICATION_DESCRIPTION_COMPONENT_NAME,
  // Свойства overflow, textOverflow и whiteSpace удалены

  variants: {} as const,

  defaultVariants: {},
});

export const NotificationCloseFrame = styled(Stack, {
  name: NOTIFICATION_CLOSE_COMPONENT_NAME,
});

export const VisuallyHidden = styled(Stack, {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  zIndex: -10000,
  overflow: 'hidden',
  opacity: 0.00000001,
  pointerEvents: 'none',

  variants: {
    preserveDimensions: {
      true: {
        position: 'relative',
        width: 'auto',
        height: 'auto',
      },
    },

    visible: {
      true: {
        position: 'relative',
        width: 'auto',
        height: 'auto',
        margin: 0,
        zIndex: 1,
        overflow: 'visible',
        opacity: 1,
        pointerEvents: 'auto',
      },
    },
  } as const,
});
