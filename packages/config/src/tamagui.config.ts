import { createTamagui } from '@xsolla-zk/react';
import { tokensConfig } from './config';

export const config = createTamagui(tokensConfig);

export type Config = typeof config;
