import { Input, type InputProps, isWeb, useComposedRefs, withStaticProperties } from '@app/ui';
import { forwardRef, useMemo, useRef } from 'react';
import { useAutoResizeFont } from '../../../app/components/hooks';
import { InputContext, InputEndSlot, InputStartSlot } from '../input/input.styled';

const TextAreaBase = forwardRef<HTMLInputElement, InputProps>(function InlineInputBase(
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

  const { lineHeight } = useAutoResizeFont(ref, {
    enabled: true,
    fontScaling: false,
    size,
    maxRows,
  });

  const calculatedMinHeight = useMemo(() => {
    return minRows && lineHeight ? minRows * lineHeight : undefined;
  }, [minRows, lineHeight]);

  return (
    <Input
      size={size}
      rows={!isWeb ? (rows ?? maxRows) : rows}
      multiline
      maxRows={maxRows}
      minRows={minRows}
      minHeight={!isWeb ? calculatedMinHeight : undefined}
      ref={composedRefs}
      {...props}
    />
  );
});

export const TextArea = withStaticProperties(TextAreaBase, {
  Props: InputContext.Provider,
  StartSlot: InputStartSlot,
  EndSlot: InputEndSlot,
});
