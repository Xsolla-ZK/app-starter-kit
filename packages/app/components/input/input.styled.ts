import type { GetProps, StyledContext } from '@app/ui';
import { createStyledContext, getComponentsConfig, getMappedStyles, Stack, styled } from '@app/ui';
import {
  INPUT_COMPONENT_NAME,
  INPUT_END_SLOT_COMPONENT_NAME,
  INPUT_START_SLOT_COMPONENT_NAME,
} from '@xsolla-zk/constants';
import type { ReactNode } from 'react';
import { createElement } from 'react';
import { TextInput } from 'react-native';
import { inputSharedStyledOptions } from './input.shared';
import type { InputContextType, InputSizes } from './input.types';

export const InputContext = createStyledContext<InputContextType>({
  size: '$500',
  error: false,
  disabled: false,
  focused: false,
});

export const InputFrame = styled(Stack, {
  name: INPUT_COMPONENT_NAME,
  context: InputContext,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  borderColor: '$borderColor',
  backgroundColor: '$background',
  // animation: 'state',
  // animateOnly: ['border', 'background'],

  variants: {
    focused: {
      true: {
        backgroundColor: '$backgroundFocus',
        borderColor: '$borderColorFocus',
        caretColor: '$borderColorFocus',
      },
    },
    isTextarea: {
      true: {
        alignItems: 'flex-start',
      },
    },
    size: (val: InputSizes, _extras) => {
      const config = getComponentsConfig();
      const componentProps = config.input[val as keyof typeof config.input];

      if (!componentProps) {
        return {};
      }

      return getMappedStyles(componentProps.frame);
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    size: '$500',
    disabled: false,
  },
});

const slotStyles = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'inherit',
} as const;

export const InputStartSlot = createInputSlot(INPUT_START_SLOT_COMPONENT_NAME, InputContext);

export const InputEndSlot = createInputSlot(INPUT_END_SLOT_COMPONENT_NAME, InputContext);

export const InputElement = styled(
  TextInput,
  {
    name: INPUT_COMPONENT_NAME,
    context: InputContext,

    alignSelf: 'stretch',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    outlineWidth: 0,
    backgroundColor: 'transparent',
    color: '$color',
    flex: 1,

    variants: {
      rows: {
        ':number': () => ({}),
      },
      maxRows: {
        ':number': () => ({}),
      },
      minRows: {
        ':number': () => ({}),
      },
      size: (val: InputSizes) => {
        const config = getComponentsConfig();
        const componentProps = config.input[val as keyof typeof config.input];

        if (!componentProps) {
          return {};
        }

        return getMappedStyles(componentProps.label);
      },
      disabled: {
        true: {},
      },
    } as const,
  },
  inputSharedStyledOptions,
);

export function createInputSlot(name: string, context: StyledContext<InputContextType>) {
  return function SlotComponent({
    children,
    ...props
  }: Omit<GetProps<typeof Stack>, 'children'> & {
    children: ReactNode | ((context: InputContextType) => ReactNode);
  }) {
    const ctx = context.useStyledContext();

    return createElement(
      styled(Stack, {
        name,
        ...slotStyles,
      }),
      {
        children: typeof children === 'function' ? children(ctx) : children,
        ...props,
      },
    );
  };
}
