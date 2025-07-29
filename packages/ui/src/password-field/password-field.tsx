import { Input, type InputProps, RichIcon } from '@app/ui';
import { Cross, Eye, EyeSlash } from '@xsolla-zk/icons';
import { forwardRef, useCallback, useEffect, useState } from 'react';

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(function PasswordField(
  { value, onChangeText, ...props },
  ref,
) {
  const [localValue, setValue] = useState(() => value ?? '');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setValue(value ?? '');
  }, [value]);

  const handleChange: InputProps['onChangeText'] = (currentValue) => {
    setValue(currentValue);
    onChangeText?.(currentValue);
  };

  const handleClear = useCallback(() => {
    setValue('');
    onChangeText?.('');
  }, [onChangeText]);

  const handleClickShowPassword = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <Input
      type={show ? 'text' : 'password'}
      value={localValue}
      onChangeText={handleChange}
      {...props}
      ref={ref}
    >
      <Input.EndSlot>
        <RichIcon
          pressable
          shape="squircle"
          size="$200"
          aria-label="toggle password visibility"
          onPress={handleClickShowPassword}
        >
          <RichIcon.Icon icon={show ? EyeSlash : Eye} />
        </RichIcon>
        {Boolean(localValue) && (
          <RichIcon pressable shape="squircle" size="$200" onPress={handleClear}>
            <RichIcon.Icon icon={Cross} />
          </RichIcon>
        )}
      </Input.EndSlot>
    </Input>
  );
});
