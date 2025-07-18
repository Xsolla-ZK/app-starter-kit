import {
  createStyledContext,
  type GetProps,
  RichIcon,
  type RichIconProps,
  SemanticText,
  Stack,
  styled,
  type TamaguiElement,
  withStaticProperties,
} from '@xsolla-zk/react';
import { forwardRef } from 'react';
import { ContentStack } from '../stacks/content-stack';

type PromoTextSizes = 'medium' | 'large';

type PromoTextContextType = {
  size: PromoTextSizes;
};

type PromoTextItemContextType = {
  tone: 'neutral' | 'brand' | 'brand-extra' | 'static-light' | 'negative';
};

const PromoTextContext = createStyledContext<PromoTextContextType>({
  size: 'medium',
});

const PromoTextItemContext = createStyledContext<PromoTextItemContextType>({
  tone: 'neutral',
});

const PromoFrame = styled(Stack, {
  context: PromoTextContext,
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '$space.100',

  variants: {
    size: {
      medium: {},
      large: {},
    },
  } as const,
  defaultVariants: {
    size: 'medium',
  },
});

const PromoTextComponent = PromoFrame.styleable(
  forwardRef<TamaguiElement, GetProps<typeof PromoFrame>>(({ children, ...props }, ref) => {
    return (
      <PromoFrame {...props} ref={ref}>
        {children}
      </PromoFrame>
    );
  }),
);

const ItemFrame = styled(
  ContentStack,
  {
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',

    variants: {
      tone: {
        neutral: {
          backgroundColor: '$background.neutral-high-inverted',
        },
        brand: {
          backgroundColor: '$background.brand-high',
        },
        'brand-extra': {
          backgroundColor: '$background.brand-extra-high',
        },
        'static-light': {
          backgroundColor: '$background.static-light-high',
        },
        negative: {
          backgroundColor: '$background.negative-high',
        },
      },
      size: {
        medium: {
          minHeight: 32,
          borderRadius: '$radius.400',
          $lg: {
            minHeight: 40,
            borderRadius: '$radius.500',
          },
          $xl: {
            minHeight: 48,
            borderRadius: '$radius.550',
          },
        },
        large: {
          minHeight: 48,
          borderRadius: '$radius.550',
          $lg: {
            minHeight: 56,
            borderRadius: '$radius.600',
          },
          $xl: {
            minHeight: 64,
          },
        },
      },
    } as const,
    defaultVariants: {
      size: 'medium',
      tone: 'neutral',
    },
  },
  {
    acceptsClassName: true,
  },
);

const ItemComponent = ItemFrame.styleable(
  forwardRef<TamaguiElement, GetProps<typeof ItemFrame>>(
    ({ children, size: sizeProp, tone, ...props }, ref) => {
      const { size: contextSize } = PromoTextContext.useStyledContext();
      const size = sizeProp ?? contextSize;
      const sharedProps = { size, tone };
      return (
        <PromoTextItemContext.Provider {...sharedProps}>
          <ItemFrame {...sharedProps} {...props} ref={ref}>
            {children}
          </ItemFrame>
        </PromoTextItemContext.Provider>
      );
    },
  ),
);

const ItemTextFrame = styled(SemanticText, {
  typographyOnly: true,

  variants: {
    tone: {
      neutral: {
        color: '$content.neutral-primary-inverted',
      },
      brand: {
        color: '$content.on-brand',
      },
      'brand-extra': {
        color: '$content.on-brand-extra',
      },
      'static-light': {
        color: '$content.static-dark-primary',
      },
      negative: {
        color: '$content.on-negative',
      },
    },
    size: {
      medium: {
        variant: 'headerM',
      },
      large: {
        variant: 'headerL',
      },
    },
  } as const,
});

const ItemText = ItemTextFrame.styleable(
  forwardRef<TamaguiElement, GetProps<typeof ItemTextFrame>>((props, ref) => {
    const { size } = PromoTextContext.useStyledContext();
    const { tone } = PromoTextItemContext.useStyledContext();
    return <ItemTextFrame tone={tone} size={size} {...props} ref={ref} />;
  }),
);

type IconProps = Omit<RichIconProps, 'size'> & {
  size?: PromoTextSizes;
};

const Icon = forwardRef<TamaguiElement, IconProps>(({ size: sizeProp, ...props }, ref) => {
  const { size } = PromoTextContext.useStyledContext();

  return (
    <RichIcon
      {...((sizeProp ?? size) === 'medium'
        ? {
            size: '$300',
            $lg: {
              size: '$400',
            },
            $xl: {
              size: '$500',
            },
          }
        : {
            size: '$500',
            $lg: {
              size: '$600',
            },
            $xl: {
              size: '$700',
            },
          })}
      {...props}
      ref={ref}
    />
  );
});

const PromoTextIcon = withStaticProperties(Icon, {
  Text: RichIcon.Text,
  Icon: RichIcon.Icon,
});

const Item = withStaticProperties(ItemComponent, {
  Text: ItemText,
});

export const PromoText = withStaticProperties(PromoTextComponent, {
  Props: PromoTextContext.Provider,
  Item,
  Icon: PromoTextIcon,
});

export type PromoTextItemProps = GetProps<typeof ItemFrame>;
