import { Stack, styled } from '@app/ui';

export const BoardFrame = styled(Stack, {
  variants: {
    pressable: {
      true: {
        role: 'button',
        cursor: 'pointer',
      },
      false: {},
    },
    blured: {
      true: {
        backdropFilter: 'blur(200px)',
      },
      false: {},
    },
  } as const,
});

export const BoardOverlay = styled(Stack, {
  tag: 'span',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none',
  opacity: 0,
  zIndex: 2,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$border.neutral-primary',
  borderRadius: 'inherit',
  mixBlendMode: 'overlay',
  // animation: 'state',
  // animateOnly: ['opacity'],
  backgroundColor: '$overlay.static-light',

  '$group-hover': {
    opacity: 0.5,
  },
  '$group-press': {
    opacity: 0.3,
    backgroundColor: '$background.static-dark-high',
  },
});
