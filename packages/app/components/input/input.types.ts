import type {
  ComponentsConfig,
  GetProps,
  StackStyle,
  StylableComponent,
  VariantSpreadExtras,
} from '@app/ui';
import type { ComponentProps, HTMLInputTypeAttribute, ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import type { InputElement } from './input.styled';

export type InputSizes = keyof ComponentsConfig['input'] | (string & {});

export type InputCSSVariables = Record<string, string>;

export type InputContextType = {
  size: InputSizes;
  error: boolean;
  disabled: boolean;
  focused: boolean;
};

export type InputVariantSpreadExtras<T extends StylableComponent> = VariantSpreadExtras<
  GetProps<T> & InputContextType
>;

export interface InputFrameProps {
  size?: InputSizes;
  error?: boolean;
  disabled?: boolean;
  focused?: boolean;
}

type ExcludePropsUnion =
  | 'secureTextEntry'
  | 'onChangeText'
  | 'editable'
  | 'keyboardType'
  | 'placeholderTextColor'
  | 'selectionColor'
  | 'numberOfLines'
  | 'multiline';

type DetailedInputProps = Omit<
  ComponentProps<'input'>,
  'className' | 'children' | 'value' | 'size' | ExcludePropsUnion
>;

export type InputElementBaseProps = GetProps<typeof InputElement>;

export type InputElementProps = DetailedInputProps &
  InputElementBaseProps &
  Omit<TextInputProps, ExcludePropsUnion> & {
    type?: HTMLInputTypeAttribute;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    tag?: 'input' | 'textarea';
    size?: InputSizes;
    error?: boolean;
    placeholderTextColor?: string;
    selectionColor?: string;
    caretColor?: string;
  };

export interface InputProps extends InputElementProps {
  frameStyles?: StackStyle;
  isFocused?: boolean;
  autoResize?: boolean;
  onFocusChange?: (value: boolean) => void;
  children?: ReactNode;
}
