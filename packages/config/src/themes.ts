import { componentsTheme, composeThemes, createTheme } from '@xsolla-zk/config';
import { themes as themesDefault } from './tokens/themes';

const baseTheme = createTheme((tokens) => ({
  background: tokens['layer.floor-0'],
  color: tokens['content.neutral-primary'],
}));

export const themes = composeThemes(themesDefault, {
  base: baseTheme,
  components: componentsTheme,
});
