import { getComponentsConfig, getMappedStyles } from '@app/ui';
import type { StyleProp } from '@tamagui/core';
import type { ForwardedRef } from 'react';
import { forwardRef, useRef, useState } from 'react';
import type {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextStyle,
} from 'react-native';
import { createInput } from '../input';
import { InlineInputElement } from './inline-input.styled';
import type { InlineInputProps } from './inline-input.types';

const InlineInputBase = createInput(InlineInputElement);

function extractTypographyValues(size: string) {
  const config = getComponentsConfig();
  const componentProps = config.inlineInput[size as keyof typeof config.inlineInput];

  if (!componentProps) {
    return {};
  }

  return getMappedStyles(componentProps) as TextStyle;
}

function getScaleConfig(size: string) {
  const scaleConfigs = {
    $600: { maxScale: 0.5 },
    $500: { maxScale: 0.7 },
    $400: { maxScale: 1.0 },
  };

  return scaleConfigs[size as keyof typeof scaleConfigs] || { maxScale: 1.0 };
}

export const InlineInput = InlineInputBase.styleable(
  forwardRef((props: InlineInputProps, ref: ForwardedRef<TextInput>) => {
    const { size = '$500', ...rest } = props;
    const [scaledStyle, setScaledStyle] = useState<StyleProp<TextStyle>>({});
    const [inputWidth, setInputWidth] = useState(0);
    const _textInputRef = useRef<TextInput>(null);

    const { fontSize: originalFontSize, lineHeight: originalLineHeight } =
      extractTypographyValues(size);
    const scaleConfig = getScaleConfig(size);

    const handleLayout = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setInputWidth(width);
    };

    const handleContentSizeChange = (
      event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
      if (scaleConfig.maxScale === 1.0) {
        return;
      }

      const { contentSize } = event.nativeEvent;
      const contentWidth = contentSize.width;

      if (contentWidth > inputWidth && inputWidth > 0) {
        const ratio = inputWidth / contentWidth;
        const scale = Math.max(scaleConfig.maxScale, ratio);

        setScaledStyle({
          fontSize: Math.floor((originalFontSize ?? 16) * scale),
          minHeight: originalLineHeight,
          lineHeight: originalLineHeight,
        });
      } else {
        setScaledStyle({
          fontSize: originalFontSize,
          minHeight: originalLineHeight,
          lineHeight: originalLineHeight,
        });
      }
    };

    return (
      <InlineInputElement
        {...rest}
        size={size}
        style={
          {
            ...(scaledStyle as Record<string, unknown>),
            overflowX: 'hidden',
            whiteSpace: 'pre-wrap',
            width: '100%',
            wordBreak: 'break-word',
            resize: 'none',
          } as Record<string, unknown>
        }
        multiline
        onLayout={handleLayout}
        onContentSizeChange={handleContentSizeChange}
        ref={ref}
      />
    );
  }),
);
