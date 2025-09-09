import { componentsTheme, themesInitializer } from '@xsolla-zk/config';
import { themes as themesDefault } from './tokens/themes';

export const themes = themesInitializer(themesDefault, componentsTheme);
