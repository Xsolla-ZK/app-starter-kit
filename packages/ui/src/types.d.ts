import type { Config, ProjectComponentsConfig } from '@app/config';

declare module '@xsolla-zk/react' {
  interface ComponentsCustomConfig extends ProjectComponentsConfig {}
  interface TamaguiCustomConfig extends Config {}

  // for group types:
  // interface TypeOverride {
  //   groupNames(): 'message'
  // }
}
