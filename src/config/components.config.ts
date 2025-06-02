import { initializeComponentsConfig } from '@xsolla-zk/react';
import { components } from './tokens/components';
import type { Conf } from './tamagui.config';

const _projectComponentsConfig = initializeComponentsConfig(components);

type ComponentsConfig = typeof _projectComponentsConfig;

declare module '@xsolla-zk/react' {
  interface ComponentsCustomConfig extends ComponentsConfig {}
  interface TamaguiCustomConfig extends Conf {}

  // for group types:
  // interface TypeOverride {
  //   groupNames(): 'message'
  // }
}
