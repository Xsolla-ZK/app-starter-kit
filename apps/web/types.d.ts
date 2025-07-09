import type { config, projectComponentsConfig } from '@app/config';

type ComponentsConfig = typeof projectComponentsConfig;
type Conf = typeof config;

declare module '@xsolla-zk/react' {
  interface ComponentsCustomConfig extends ComponentsConfig {}
  interface TamaguiCustomConfig extends Conf {}

  // for group types:
  // interface TypeOverride {
  //   groupNames(): 'message'
  // }
}
