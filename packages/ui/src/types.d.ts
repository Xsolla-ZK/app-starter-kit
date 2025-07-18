import type { config } from '@app/config';

export type Conf = typeof config;

declare module '@xsolla-zk/react' {
  interface TamaguiCustomConfig extends Conf {}
}
