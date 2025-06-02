import { Grid2x2 } from '@xsolla-zk/icons';
import { getSafeTokenValue, RichIcon, SemanticText, Stack } from '@xsolla-zk/react';
import { useRouter } from 'one';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { IconProp, RichIconSizes } from '@xsolla-zk/react';
import { Card } from '~/components/card/card';
import { ContentStack } from '~/components/stacks/content-stack';

const Logo1 = memo(LogoXSollaZK) as IconProp;

export function HomeScreen() {
  const { push } = useRouter();

  return (
    <>
      <Stack
        borderRadius="$radius.550"
        borderColor="$border.neutral-tertiary"
        gap="$space.350"
        borderWidth="$stroke.100"
        paddingVertical="$space.400"
        backgroundColor="$layer.floor-1"
      >
        <Stack position="relative" width={160} marginHorizontal="auto">
          <RichIcon
            size="$800"
            shape="squircle"
            rotate="5deg"
            backgroundColor="$background.brand-high"
          >
            <RichIcon.Icon icon={Grid2x2} color="$content.on-brand" />
          </RichIcon>
          <RichIcon
            size="$800"
            shape="squircle"
            rotate="-5deg"
            backgroundColor="$background.brand-extra-high"
            position="absolute"
          >
            <RichIcon.Icon icon={Logo1} />
          </RichIcon>
        </Stack>
        <ContentStack>
          <SemanticText variant="headerS" textAlign="center">
            Explore the Xsolla ZK UI Kit
          </SemanticText>
          <SemanticText variant="paragraphS" textAlign="center" color="$content.neutral-secondary">
            Discover ready-made components, responsive layouts, and themes in action — quickly
            customize and integrate them into your project
          </SemanticText>
        </ContentStack>
      </Stack>
      {/* <Input placeholder="Search" size="$500">
        <Input.StartSlot>
          <RichIcon size="$200" shape="squircle">
            <RichIcon.Icon icon={Search} />
          </RichIcon>
        </Input.StartSlot>
      </Input> */}
      <Stack gap="$space.100">
        <Card onPress={() => push('/colors')}>Colors</Card>
        <Card onPress={() => push('/typography')}>Typography</Card>
        <Card onPress={() => push('/modals-overlays')}>Modals & Overlays</Card>
        <Card onPress={() => push('/size')}>Size</Card>
      </Stack>
    </>
  );
}

function LogoXSollaZK({ size }: { size?: RichIconSizes }) {
  const sizeValue = getSafeTokenValue(size) || 24;
  return (
    <Svg viewBox="0 0 24 24" width={sizeValue} height={sizeValue} fill="none">
      <Path
        d="M11.1769 2.94678L20.7242 8.11436L12.7562 20.9991L2.67188 9.69378L11.1769 2.94678Z"
        fill="white"
      />
      <Path
        d="M11.9608 11.9084L20.7272 8.14893L12.7561 20.9979L2.6748 9.72829L11.9608 11.9084Z"
        fill="#D2CEFD"
      />
      <Path d="M11.2139 2.94354L20.7247 8.11432L12.7932 20.9959L11.2139 2.94354Z" fill="#E7E6FE" />
      <Path d="M11.9971 11.9053L20.7269 8.14893L12.7923 20.9947L11.9971 11.9053Z" fill="#AA9CFC" />
    </Svg>
  );
}
