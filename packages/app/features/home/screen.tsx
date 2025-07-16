'use client';

import { ScreenStack } from '@app/ui';
import { InlineInput } from '../../components/inline-input';

export default function HomeScreen() {
  return (
    <ScreenStack gap="$space.200">
      {/* <Input lineHeight={20} rows={5} autoResize>
        <Input.StartSlot>
          <Text>222</Text>
        </Input.StartSlot>
        <Input.EndSlot>
          <Button>
            <Button.Icon icon={Plus} />
          </Button>
        </Input.EndSlot>
      </Input> */}
      <InlineInput />
    </ScreenStack>
  );
}
