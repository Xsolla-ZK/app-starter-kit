import type { ColorTokens, LoaderProps, TamaguiElement, ThemeName, Token } from '@app/ui';
import {
  getComponentsConfig,
  getTokenValue,
  Loader,
  useIconsPosition,
  withStaticProperties,
} from '@app/ui';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { ButtonContext, ButtonFrame, ButtonIcon, ButtonText } from './button.styled';
import type { ButtonContextType, ButtonProps } from './button.types';

const ButtonComponent = ButtonFrame.styleable<ButtonProps>(
  forwardRef(
    ({ children, isLoading, tone = 'brand', ...props }, ref: ForwardedRef<TamaguiElement>) => {
      const iconsPosition = useIconsPosition(children, ButtonIcon);

      return (
        <ButtonFrame
          isLoading={isLoading}
          theme={tone as unknown as ThemeName}
          tone={tone}
          {...iconsPosition}
          {...props}
          ref={ref}
        >
          {isLoading ? <ButtonLoader /> : children}
        </ButtonFrame>
      );
    },
  ),
  {
    disableTheme: true,
  },
);

const getLoaderColors = (ctx: ButtonContextType): LoaderProps => {
  const { tone, variant } = ctx;
  if (variant === 'primary') {
    return {
      mainColor: `$border.${tone}-primary` as ColorTokens,
      spinColor: `$content.on-${tone}` as ColorTokens,
    };
  }

  return {
    mainColor: `$border.${tone}-secondary` as ColorTokens,
    spinColor: `$content.${tone}-primary` as ColorTokens,
  };
};

function ButtonLoader() {
  const ctx = ButtonContext.useStyledContext();

  const config = getComponentsConfig();
  const size = config.button[ctx.size as keyof typeof config.button];

  return (
    <Loader
      {...getLoaderColors(ctx)}
      size={size ? (getTokenValue(size.icon.size as Token, 'size') as number) : undefined}
    />
  );
}

export const Button = withStaticProperties(ButtonComponent, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
});
