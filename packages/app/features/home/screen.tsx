'use client';

import { RichIcon, ScreenStack } from '@app/ui';
import { Eye } from '@xsolla-zk/icons';
import { InlineInput } from '../../components/inline-input';
import { Input } from '../../components/input';

export default function HomeScreen() {
  // 1. Используем useRef для немедленного доступа к размерам layout

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
      {/* <Input rows={5} /> */}
      {/* <TextArea minRows={3} maxRows={1} /> */}
      {/* <TextArea multiline minRows={2} maxRows={5} /> */}
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
      </TextArea> */}
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
      </InlineInput>

      {/* <PasswordField /> */}
    </ScreenStack>
  );
}
