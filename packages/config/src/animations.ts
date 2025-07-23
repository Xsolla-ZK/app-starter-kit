import { createAnimations } from '@tamagui/animations-moti';
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
  state: {
    type: 'timing',
    duration: 100,
    easing: easings.easeOutQuad,
  },
  pop: {
    type: 'timing',
    duration: 100,
    easing: easings.pop,
  },
  bounceIn: {
    type: 'timing',
    duration: 120,
    easing: easings.bounceIn,
  },
  bounceOut: {
    type: 'timing',
    duration: 120,
    easing: easings.bounceOut,
  },
  bounceReturn: {
    type: 'timing',
    duration: 240,
    easing: easings.bounceReturn,
  },
  fade: {
    type: 'timing',
    duration: 120,
    easing: easings.fade,
  },
  colorChange: {
    type: 'timing',
    duration: 120,
    easing: easings.fade,
  },
  tabSwitch: {
    type: 'timing',
    duration: 450,
    easing: easings.tabSwitch,
  },
  medium: {
    type: 'timing',
    duration: 300,
    easing: easings.easeIn,
  },
  promoText: {
    type: 'spring',
    stiffness: 87370,
    damping: 150,
    mass: 1,
  },
});
