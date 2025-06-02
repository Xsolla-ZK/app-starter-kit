import { Cross, Eye, EyeSlash } from '@xsolla-zk/icons';
import {
  Button,
  Field,
  getComponentsConfig,
  Input,
  OTPField,
  RichIcon,
  SegmentedControl,
  SemanticText,
  Stack,
} from '@xsolla-zk/react';
import { forwardRef, useState } from 'react';
import type { FieldSizes, InputProps } from '@xsolla-zk/react';
import { ContentStack } from '~/components/stacks/content-stack';

const fieldSizes = Object.keys(getComponentsConfig().field) as FieldSizes[];

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

export function SizeScreen() {
  const [size, setSize] = useState<FieldSizes>('$500');
  return (
    <>
      <ContentStack>
        <SemanticText variant="paragraphS" color="$content.neutral-secondary">
          Our component sizing system uses a consistent numeric scale in 100-point
          increments—ranging from very small to extra-large—with 500 as the default “medium” or most
          typical size.
        </SemanticText>
        <SemanticText variant="paragraphS" color="$content.neutral-secondary">
          Every component ships in multiple harmonized sizes that interoperate seamlessly, and the
          numeric naming makes it easy to extend or add new dimensions without relying on subjective
          labels like “small”, “medium”, or “large”
        </SemanticText>
      </ContentStack>

      <Stack gap="$space.350">
        <SegmentedControl
          size={size}
          value={size}
          onValueChange={(value) => {
            setSize(value);
          }}
        >
          {fieldSizes.map((size) => (
            <SegmentedControl.Item key={size} value={size}>
              <SegmentedControl.Item.Text>{size}</SegmentedControl.Item.Text>
            </SegmentedControl.Item>
          ))}
        </SegmentedControl>
        <Field size={size}>
          <Field.Row>
            <Field.Label htmlFor="name">Name</Field.Label>
          </Field.Row>
          <Field.Control id="name" autoSave="off" />
        </Field>
        <Field size={size}>
          <Field.Row>
            <Field.Label htmlFor="phone-telephone">Phone</Field.Label>
          </Field.Row>
          <Field.Control id="phone-telephone" />
        </Field>
        <Field size={size}>
          <Field.Row>
            <Field.Label>Password</Field.Label>
          </Field.Row>
          <Field.Control>
            <PasswordField autoComplete="off" autoSave="off" />
          </Field.Control>
        </Field>
        <Field size={size}>
          <Field.Row>
            <Field.Label>Confirmation code</Field.Label>
          </Field.Row>
          <Field.Control autoSave="off">
            <OTPField maxLength={1} />
          </Field.Control>
        </Field>
        <Button size={size}>
          <Button.Text>Get the code</Button.Text>
        </Button>
      </Stack>
    </>
  );
}
