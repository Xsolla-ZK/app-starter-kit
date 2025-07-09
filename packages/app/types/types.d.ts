import type { config } from '@app/config';

export type Conf = typeof config;

declare module '@app/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
