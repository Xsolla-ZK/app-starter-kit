'use client';

import { type InputProps, RichIcon, ScreenStack } from '@app/ui';
import { Cross, Eye, EyeSlash } from '@xsolla-zk/icons';
import { forwardRef, useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

const PasswordField = forwardRef<HTMLInputElement, InputProps>(function PasswordField(
  { value, onChangeText, ...props },
  ref,
) {
  const [localValue, setValue] = useState(() => value ?? '');

  const [show, setShow] = useState(false);

  const handleChange: InputProps['onChangeText'] = (value) => {
    setValue(value);
    onChangeText?.(value);
  };

  const handleClear = () => {
    setValue('');

    onChangeText?.('');
  };

  const handleClickShowPassword = () => {
    setShow((prev) => !prev);
  };

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

export default function HomeScreen() {
  return (
    <ScreenStack gap="$space.200">
      <Input placeholder="Base" />
      {/* <PasswordField /> */}
      <Button size="$700">
        <Button.Text>Button</Button.Text>
      </Button>
    </ScreenStack>
  );
}
