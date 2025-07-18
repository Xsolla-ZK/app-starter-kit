// import { getComponentsConfig, getMappedStyles } from '@app/ui';
// import type { StyleProp } from '@tamagui/core';
// import type { ForwardedRef } from 'react';
// import { forwardRef, useRef, useState } from 'react';
// import type {
//   LayoutChangeEvent,
//   NativeSyntheticEvent,
//   TextInput,
//   TextInputContentSizeChangeEventData,
//   TextStyle,
// } from 'react-native';
// import { createInput } from '../input';
// import { InlineInputElement } from './inline-input.styled';
// import type { InlineInputProps } from './inline-input.types';

// const InlineInputBase = createInput(InlineInputElement);

// function extractTypographyValues(size: string) {
//   const config = getComponentsConfig();
//   const componentProps = config.inlineInput[size as keyof typeof config.inlineInput];

//   if (!componentProps) {
//     return {};
//   }

//   return getMappedStyles(componentProps) as TextStyle;
// }

// function getScaleConfig(size: string) {
//   const scaleConfigs = {
//     $600: { maxScale: 0.5 },
//     $500: { maxScale: 0.7 },
//     $400: { maxScale: 1.0 },
//   };

//   return scaleConfigs[size as keyof typeof scaleConfigs] || { maxScale: 1.0 };
// }

// export const InlineInput = InlineInputBase.styleable(
//   forwardRef((props: InlineInputProps, ref: ForwardedRef<TextInput>) => {
//     const { size = '$500', ...rest } = props;
//     const [scaledStyle, setScaledStyle] = useState<StyleProp<TextStyle>>({});
//     const [inputWidth, setInputWidth] = useState(0);
//     const _textInputRef = useRef<TextInput>(null);

//     const { fontSize: originalFontSize, lineHeight: originalLineHeight } =
//       extractTypographyValues(size);
//     const scaleConfig = getScaleConfig(size);

//     const handleLayout = (event: LayoutChangeEvent) => {
//       const { width } = event.nativeEvent.layout;
//       setInputWidth(width);
//     };

//     const handleContentSizeChange = (
//       event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
//     ) => {
//       if (scaleConfig.maxScale === 1.0) {
//         return;
//       }

//       const { contentSize } = event.nativeEvent;
//       const contentWidth = contentSize.width;

//       if (contentWidth > inputWidth && inputWidth > 0) {
//         const ratio = inputWidth / contentWidth;
//         const scale = Math.max(scaleConfig.maxScale, ratio);

//         setScaledStyle({
//           fontSize: Math.floor((originalFontSize ?? 16) * scale),
//           minHeight: originalLineHeight,
//           lineHeight: originalLineHeight,
//         });
//       } else {
//         setScaledStyle({
//           fontSize: originalFontSize,
//           minHeight: originalLineHeight,
//           lineHeight: originalLineHeight,
//         });
//       }
//     };

//     return (
//       <InlineInputElement
//         {...rest}
//         size={size}
//         style={
//           {
//             ...(scaledStyle as Record<string, unknown>),
//             overflowX: 'hidden',
//             whiteSpace: 'pre-wrap',
//             width: '100%',
//             wordBreak: 'break-word',
//             resize: 'none',
//           } as Record<string, unknown>
//         }
//         multiline
//         onLayout={handleLayout}
//         onContentSizeChange={handleContentSizeChange}
//         ref={ref}
//       />
//     );
//   }),
// );

import {
  getComponentsConfig,
  getTokenValue,
  isWeb,
  type Token,
  withStaticProperties,
} from '@app/ui';
import { forwardRef } from 'react';
import { Input, type InputProps } from '../input';
import { InputContext, InputEndSlot, InputStartSlot } from '../input/input.styled';

function extractTypographyValues(size: string) {
  const config = getComponentsConfig();
  const componentProps = config.input[size as keyof typeof config.input].label.typography;
  if (!componentProps) {
    return {};
  }

  return getTokenValue(
    `line-height.${componentProps?.split('.').slice(0, -1).join('.')}` as Token,
    'typography',
  );
}

const InlineInputBase = forwardRef<HTMLInputElement, InputProps>(function InlineInputBase(
  { rows, minRows, maxRows, size = '$500', ...props },
  ref,
) {
  if (typeof minRows === 'number' && typeof maxRows === 'number' && minRows > maxRows) {
    [minRows, maxRows] = [maxRows, minRows];
  }
  if (rows) {
    minRows = rows;
    maxRows = rows;
  }
  const calculatedMinHeight = minRows ? minRows * extractTypographyValues(size) : undefined;

  return (
    <Input
      size={size}
      rows={!isWeb ? (rows ?? maxRows) : rows}
      maxRows={maxRows}
      minRows={minRows}
      minHeight={!isWeb ? calculatedMinHeight : undefined}
      {...props}
      autoResize
      ref={ref}
    />
  );
});

export const InlineInput = withStaticProperties(InlineInputBase, {
  Props: InputContext.Provider,
  StartSlot: InputStartSlot,
  EndSlot: InputEndSlot,
});
