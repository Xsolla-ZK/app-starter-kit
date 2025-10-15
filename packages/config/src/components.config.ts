import { initializeComponentsConfig } from '@xsolla-zk/react';
import { components } from './tokens/components';
import { shapes } from './tokens/shapes';

// by default using components config using tokens from @xsolla-zk/config
// export const initProjectComponentsConfig = () => initializeComponentsConfig();

// if you need to use custom components config, you can do it looks like this
const componentsConfig = {
  ...components,
  const_shapes: shapes,
};

export const initProjectComponentsConfig = () => initializeComponentsConfig(componentsConfig);

export type ProjectComponentsConfig = typeof components;
