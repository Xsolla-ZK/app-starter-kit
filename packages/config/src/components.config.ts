import { initializeComponentsConfig } from '@xsolla-zk/react';
import { components } from './tokens/components';

export const initProjectComponentsConfig = () => initializeComponentsConfig(components);

export type ProjectComponentsConfig = typeof components;
