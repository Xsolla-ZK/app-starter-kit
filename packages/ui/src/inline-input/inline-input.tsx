import {
  Input,
  type InputProps,
  isWeb,
  useAutoResizeFont,
  useComposedRefs,
  withStaticProperties,
} from '@app/ui';
import { forwardRef, useMemo, useRef } from 'react';
import { Text } from 'react-native';
import { InputContext, InputEndSlot, InputStartSlot } from '../input/input.styled';

const InlineInputBase = forwardRef<HTMLInputElement, InputProps>(function InlineInputBase(
  { rows, minRows: propMinRows, maxRows: propMaxRows, size = '$500', ...props },
  forwardedRef,
) {
  let minRows = propMinRows;
  let maxRows = propMaxRows;

  if (typeof minRows === 'number' && typeof maxRows === 'number' && minRows > maxRows) {
    console.warn('[InlineInput] `minRows` > `maxRows` — значения будут переупорядочены');
    [minRows, maxRows] = [maxRows, minRows];
  }

  if (rows) {
    minRows = rows;
    maxRows = rows;
  }

  const ref = useRef<HTMLInputElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  const { onLayout, handleTextLayout, fontSize, text, setText, lineHeight } = useAutoResizeFont(
    ref,
    {
      enabled: true,
      fontScaling: true,
      size,
      maxRows,
    },
  );

  const calculatedMinHeight = useMemo(() => {
    return minRows && lineHeight ? minRows * lineHeight : undefined;
  }, [minRows, lineHeight]);

  return (
    <>
      {!isWeb && (
        <Text
          style={{
            position: 'absolute',
            opacity: 0,
            top: -9999,
            left: -9999,
            fontSize,
          }}
          onLayout={handleTextLayout}
          numberOfLines={3}
        >
          {text || ' '}
        </Text>
      )}
      <Input
        fontSize={fontSize}
        value={text}
        onChangeText={setText}
        size={size}
        rows={!isWeb ? (rows ?? maxRows) : rows}
        multiline
        maxRows={maxRows}
        minRows={minRows}
        minHeight={!isWeb ? calculatedMinHeight : undefined}
        {...props}
        autoResize
        ref={composedRefs}
        onLayout={onLayout}
      />
    </>
  );
});

export const InlineInput = withStaticProperties(InlineInputBase, {
  Props: InputContext.Provider,
  StartSlot: InputStartSlot,
  EndSlot: InputEndSlot,
});
