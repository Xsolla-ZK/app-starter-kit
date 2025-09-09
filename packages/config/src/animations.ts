import { createAnimations } from '@tamagui/animations-moti';
import { defaultAnimationsConfig } from '@xsolla-zk/config';
import { Easing } from 'react-native-reanimated';

const easings = {
  easeIn: Easing.in(Easing.ease),
  easeOutQuad: Easing.bezier(0.11, 0, 0.5, 0),
  pop: Easing.bezier(0.39, 0.57, 0.56, 1),
  bounceReturn: Easing.bezier(0, 0, 0.5, 1.25),
  bounceIn: Easing.bezier(0, -0.5, 1, 0.5),
  bounceOut: Easing.bezier(0.75, -0.5, 1, 1),
  fade: Easing.bezier(0.39, 0.575, 0.565, 1),
  tabSwitch: Easing.bezier(0.33, 1, 0.68, 1),
};

export const animations = createAnimations({
  ...defaultAnimationsConfig,
  promoText: {
    type: 'spring',
    stiffness: 87370,
    damping: 150,
    mass: 1,
  },
});
