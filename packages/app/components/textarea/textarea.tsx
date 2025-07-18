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

const TextAreaBase = forwardRef<HTMLInputElement, InputProps>(function TextAreaBase(
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
      minHeight={!isWeb ? calculatedMinHeight : undefined}
      {...props}
      maxRows={maxRows}
      minRows={minRows}
      rows={!isWeb ? (rows ?? maxRows) : rows}
      whiteSpace="pre-wrap"
      ref={ref}
    />
  );
});

export const TextArea = withStaticProperties(TextAreaBase, {
  Props: InputContext.Provider,
  StartSlot: InputStartSlot,
  EndSlot: InputEndSlot,
});
