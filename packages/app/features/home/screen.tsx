'use client';

import {
  Accordion,
  Button,
  Cell,
  type CellProps,
  Chips,
  ContentStack,
  type GetProps,
  type IconProp,
  List,
  Pimple,
  PromoText,
  type PromoTextItemProps,
  RichIcon,
  type RichIconProps,
  ScrollView,
  SemanticText,
  Separator,
  Stack,
  styled,
  Tabs,
  type TamaguiComponent,
  Text,
  Typography,
} from '@app/ui';
import { BankCard, ChevronDown, Plus } from '@xsolla-zk/icons';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { XSollaZKDiamond } from '../../components/icons/xsolla-zk-diamond';
import { TextArea } from '../../components/textarea';
import { PasswordField } from '../../components/password-field';
import { InlineInput } from '../../components/inline-input';

const contentBlank =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis imperdiet nibh. In nunc eros, fermentum at massa id, egestas pulvinar lorem. Morbi nisi orci, feugiat in gravida et, efficitur ac metus. Nam euismod, magna eget cursus pretium, risus metus rutrum diam, nec hendrerit risus elit nec risus. Vivamus sed lorem mollis, malesuada tellus quis, condimentum nulla. Mauris ornare leo eget volutpat consectetur. Duis sed mattis nisi. Vivamus id mi tincidunt, consequat enim et, ultrices magna. Mauris porttitor ornare porta. Maecenas maximus dignissim ipsum, sodales ultricies felis auctor sed. Aliquam convallis efficitur quam, quis faucibus justo rutrum scelerisque.';

type TextItem = (
  | {
      type: 'icon';
      icon: IconProp;
      iconProps?: RichIconProps;
    }
  | {
      type: 'text';
      text: string;
    }
) &
  PromoTextItemProps;

const promoText = [
  {
    type: 'text',
    text: 'Welcome',
    tone: 'neutral',
    size: 'large',
  },
  {
    type: 'text',
    text: 'to',
    tone: 'neutral',
    size: 'large',
  },
  {
    type: 'text',
    text: 'App',
    tone: 'brand',
    size: 'large',
  },
  {
    type: 'text',
    text: 'Starter',
    tone: 'brand',
    size: 'large',
  },
  {
    type: 'text',
    text: 'Kit',
    tone: 'brand',
    size: 'large',
  },
  {
    type: 'icon',
    icon: XSollaZKDiamond,
    iconProps: {
      shape: 'squircle',
      backgroundColor: '$background.brand-extra-high',
    },
    tone: 'brand',
    size: 'large',
  },
] satisfies TextItem[];

const AnimatedPromoItem = createAnimatedComponent(Stack, { delay: 0 });

const ExternalLink = styled(Text, {
  tag: 'a',
  color: '$content.brand-extra-secondary',
});

const tabs = [
  {
    value: '1',
    icon: Plus,
    text: 'Tab First',
    content: 'Content for tab 1',
  },
  {
    value: '2',
    icon: Plus,
    text: 'Tab Second',
    content: 'Content for tab 2',
  },
  {
    value: '3',
    icon: Plus,
    text: 'Tab Third',
    content: 'Content for tab 3',
  },
];
function TabsStory() {
  return (
    <Tabs
      defaultValue="1"
      size="$300"
      $md={{ size: '$400' }}
      $lg={{ size: '$500' }}
      $xl={{ size: '$700' }}
    >
      <Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Tab key={tab.text} value={tab.value}>
            <Tabs.Tab.Icon icon={tab.icon} />
            <Tabs.Tab.Text>{tab.text}</Tabs.Tab.Text>
            <Stack paddingLeft="$100">
              <Pimple backgroundColor="$background.neutral-high">
                <Pimple.Text>{index + 1}</Pimple.Text>
              </Pimple>
            </Stack>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />
      {tabs.map((tab) => (
        <Tabs.Content key={tab.content} value={tab.value}>
          <Stack padding="$300">
            <Typography preset="display.500.accent">{tab.content}</Typography>
          </Stack>     
        </Tabs.Content>
      ))}   
    </Tabs>
  );
}

function CellStory(props: CellProps) {
  return (
    <Cell {...props}>
      <Cell.Slot>
        <RichIcon size="$500">
          <RichIcon.Icon icon={BankCard} />
        </RichIcon>
      </Cell.Slot>
      <Cell.Content>
        <List>
          <List.Row>
            <List.Title>Title</List.Title>
            <List.TitleValue>Value</List.TitleValue>
          </List.Row>
          <List.Row>
            <List.Subtitle>Subtitle</List.Subtitle>
            <List.SubtitleValue>Value</List.SubtitleValue>
          </List.Row>
        </List>
      </Cell.Content>
      <Cell.Slot>
        <RichIcon size="$500">
          <RichIcon.Icon icon={Plus} />
        </RichIcon>
      </Cell.Slot>
    </Cell>
  );
}

function AccordionStory() {
  return (
    <Accordion gap="$200" type="single" withBoard toggleable width="100%">
      <Accordion.Item value="1" backgroundColor="$overlay.neutral">
        <Accordion.Header asChild>
          <Accordion.Trigger>
            {({ open }) => (
              <>
                <Typography preset="compact.300.default">Header</Typography>
                <Button
                  size="$200"
                  tone="neutral"
                  variant="secondary"
                  animation="medium"
                  rotate={open ? '180deg' : '0deg'}
                  tag="div"
                >
                  <Button.Icon icon={ChevronDown} />
                </Button>
              </>
            )}
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
            <Typography>{contentBlank}</Typography>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView paddingVertical="$space.350">
      <Stack flex={1} justifyContent="flex-end">
        <PromoText justifyContent="center" size="large">
          {promoText.map((item, idx) => {
            if (item.type === 'icon') {
              return (
                <AnimatedPromoItem key={item.icon.toString()} delay={idx * 150}>
                  <PromoText.Icon {...item.iconProps}>
                    <PromoText.Icon.Icon icon={item.icon} />
                  </PromoText.Icon>
                </AnimatedPromoItem>
              );
            }

            return (
              <AnimatedPromoItem key={item.text} delay={idx * 150}>
                <PromoText.Item tone={item.tone}>
                  <PromoText.Item.Text>{item.text}</PromoText.Item.Text>
                </PromoText.Item>
              </AnimatedPromoItem>
            );
          })}
        </PromoText>
      </Stack>
      <Stack flex={1} gap={16} alignItems="center">
        <ContentStack alignItems="center">
          <SemanticText variant="headerL" textAlign="center">
            Hello and welcome to the App Starter Kit
          </SemanticText>
          <SemanticText variant="paragraphS" color="$content.neutral-secondary" textAlign="center">
            Enjoy the UI kit and start building your app!
          </SemanticText>
          <SemanticText variant="paragraphS" color="$content.neutral-secondary" textAlign="center">
            If you want to learn more about the UI kit, check out the docs:
          </SemanticText>
          <ExternalLink href="https://ui-kit.xsollazk.com/" target="_blank">
            XSolla ZK - UI Kit
          </ExternalLink>
        </ContentStack>
        <Chips singleMode flexWrap="wrap">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Chips.Item key={`wrap-${idx}`} value={`wrap-${idx}`} fullWidth flex={1}>
              <Chips.Item.Icon icon={Plus} />
              <Chips.Item.Text>Chip{idx}</Chips.Item.Text>
            </Chips.Item>
          ))}
        </Chips>
        <CellStory size="large" width="100%" withBoard />
        <AccordionStory />
        <ContentStack />
         <Stack width="100%" gap={30}>  
          <TextArea  rows={5} />
          <TextArea  minRows={3} maxRows={4} />
          <InlineInput minRows={2} maxRows={5} /> 
          <InlineInput rows={5} />
          <PasswordField/>
       </Stack>
      </Stack>
    </ScrollView>
  );
}

type CreateAnimatedComponentOptions = {
  delay?: number;
};

type AnimatedComponentProps<T extends TamaguiComponent> = GetProps<T> &
  CreateAnimatedComponentOptions;

function createAnimatedComponent<T extends TamaguiComponent>(
  Component: T,
  { delay: defaultDelay }: CreateAnimatedComponentOptions,
) {
  const AnimatedItem = Animated.createAnimatedComponent(Component);

  const config = {
    stiffness: 87370,
    damping: 150,
    mass: 1,
  };

  function WrappedComponent({ style, delay, ...props }: AnimatedComponentProps<T>) {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);
    const currentDelay = delay ?? defaultDelay;

    useEffect(() => {
      opacity.value = withDelay(currentDelay, withSpring(1, config));
      scale.value = withDelay(currentDelay, withSpring(1, config));
    }, []);

    const animatedStyle = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
      }),
      [opacity, scale],
    );

    return <AnimatedItem style={{ ...style, ...animatedStyle }} {...props} asChild />;
  }

  return WrappedComponent as TamaguiComponent<AnimatedComponentProps<T>>;
}
