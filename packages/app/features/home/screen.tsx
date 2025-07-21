'use client';

import { RichIcon, ScreenStack } from '@app/ui';
import { Eye } from '@xsolla-zk/icons';
import { InlineInput } from '../../components/inline-input';
import { Input } from '../../components/input';
import { PasswordField } from '../../components/password-field';
import { TextArea } from '../../components/textarea';

export default function HomeScreen() {
  return (
    <ScreenStack gap="$space.200">
      {/* <Input lineHeight={20} rows={5} autoResize>
        <Input.StartSlot>
          <Text>222</Text>
        </Input.StartSlot>
        <Input.EndSlot>
          <Button>zz  pf,the
            <Button.Icon icon={Plus} />
          </Button>
        </Input.EndSlot>
      </Input> */}
      {/* <InlineInput /> */}
      <TextArea minRows={1} maxRows={3} />
      <TextArea minRows={2} maxRows={5} />
      {/* <TextArea rows={3}>
        <Input.StartSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.StartSlot>
        <Input.EndSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.EndSlot>
      </TextArea>

      <InlineInput size="$600" minRows={2} maxRows={3}>
        <Input.StartSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.StartSlot>
        <Input.EndSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.EndSlot>
      </InlineInput> */}
      <InlineInput size="$600" minRows={1} maxRows={2}>
        <Input.StartSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.StartSlot>
        <Input.EndSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.EndSlot>
      </InlineInput>

      <InlineInput size="$600" rows={4}>
        <Input.StartSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.StartSlot>
        <Input.EndSlot>
          <RichIcon pressable shape="squircle" size="$200" aria-label="toggle password visibility">
            <RichIcon.Icon icon={Eye} />
          </RichIcon>
        </Input.EndSlot>
      </InlineInput>
      <PasswordField />
    </ScreenStack>
  );
}
