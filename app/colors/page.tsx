'use client';

import { Button, Chips, Input, MaskedInput, SemanticText, Stack } from '@xsolla-zk/react';
import { useState } from 'react';
import { ContentStack } from '~/components/stacks/content-stack';

const modes = {
  phone: {
    title: 'Phone',
    component: () => (
      <MaskedInput
        mask={{
          prefix: '+7 ',
          lockPrefix: true,
          includePrefixInRawValue: true,
          type: 'custom',
          format: '(999) 999-99 99',
        }}
      />
    ),
  },
  email: {
    title: 'Email',
    component: () => <Input placeholder="Email" type="email" />,
  },
};

type Modes = keyof typeof modes;

export default function ColorsScreen() {
  const [value, setValue] = useState<Modes>('phone');
  return (
    <>
      <ContentStack>
        <SemanticText variant="paragraphS" color="$content.neutral-secondary">
          UI kit features an extensible, semantic color system: components automatically adapt to
          your chosen color tokens, and you’re free to plug in custom hues for even more design
          flexibility
        </SemanticText>
      </ContentStack>

      <Stack
        padding="$100"
        gap="$350"
        borderRadius="$550"
        borderWidth="$stroke.100"
        borderColor="$border.neutral-tertiary"
        backgroundColor="$layer.floor-1"
      >
        <Chips value={value} onValueChange={(val) => setValue(val as Modes)} singleMode>
          {Object.keys(modes).map((mode) => (
            <Chips.Item key={mode} fullWidth flex={1} value={mode}>
              <Chips.Item.Text>{modes[mode as Modes].title}</Chips.Item.Text>
            </Chips.Item>
          ))}
        </Chips>

        {modes[value].component()}

        <Stack gap="$100">
          <Button>
            <Button.Text>Continue</Button.Text>
          </Button>
          <Button variant="secondary">
            <Button.Text>Skip</Button.Text>
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
