import type {
  ComponentsConfig,
  GetComponentTone,
  GetProps,
  IconsPosition,
  StylableComponent,
  VariantSpreadExtras,
} from '@app/ui';
import type { BUTTON_COMPONENT_NAME } from '@xsolla-zk/constants';
import type { ButtonFrame } from './button.styled';

export type ButtonVariants = 'primary' | 'secondary' | 'tertiary';
export type ButtonSizes = keyof ComponentsConfig['button'] | (string & {});
export type ButtonTone = GetComponentTone<typeof BUTTON_COMPONENT_NAME>;
export type ButtonVariantSpreadExtras<T extends StylableComponent> = VariantSpreadExtras<
  GetProps<T> & ButtonContextType
>;

export type ButtonContextType = Partial<IconsPosition> & {
  size: ButtonSizes;
  disabled: boolean;
  variant: ButtonVariants;
  tone: ButtonTone;
};

type ButtonSharedProps = GetProps<typeof ButtonFrame>;

export type ButtonProps = ButtonSharedProps & {
  // type?: HTMLButtonElement['type'];
};
