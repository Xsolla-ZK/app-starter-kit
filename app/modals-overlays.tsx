import { Image } from '@tamagui/image-next';
import { ArrowLeft, Cross } from '@xsolla-zk/icons';
import {
  Button,
  Dialog,
  NavBar,
  RichIcon,
  SemanticText,
  Sheet,
  Stack,
  useNotificationController,
} from '@xsolla-zk/react';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import type { PropsWithChildren } from 'react';
import { Card } from '~/components/card/card';
import { ContentStack } from '~/components/stacks/content-stack';

export function ModalsOverlaysScreen() {
  const notify = useNotificationController();
  return (
    <>
      <ContentStack>
        <SemanticText variant="paragraphS" color="$content.neutral-secondary">
          UI kit includes both blocking modal dialogs for focused interactions and non-blocking
          overlays—like toasts and snackbars—for lightweight notifications
        </SemanticText>
      </ContentStack>
      <Stack>
        <ContentStack>
          <SemanticText variant="headerS">Modals</SemanticText>
        </ContentStack>
        <Stack gap="$space.100">
          <Modal preset="bottom-sheet">
            <Card>Bottom Sheet</Card>
          </Modal>
          <Modal preset="fullscreen">
            <Card>Fullscreen</Card>
          </Modal>
          <Modal preset="popup">
            <Card>Popup</Card>
          </Modal>
        </Stack>
      </Stack>
      <ContentStack>
        <SemanticText variant="headerS">Overlays</SemanticText>
      </ContentStack>
      <Stack flexDirection="row" gap="$space.100">
        <Button
          tone="neutral"
          variant="secondary"
          flex={1}
          onPress={() =>
            notify.show('Snack Bar', {
              message:
                'Provides contextual, non-blocking notifications—offering users extra information or actions without interrupting their workflow.',
              viewportName: 'snack-bar',
              duration: 10000,
              customData: {
                status: 'info',
              },
            })
          }
        >
          <Button.Text>Snack Bar</Button.Text>
        </Button>
        <Button
          tone="neutral"
          variant="secondary"
          flex={1}
          onPress={() =>
            notify.show('Short communication', {
              viewportName: 'toast',
            })
          }
        >
          <Button.Text>Toast</Button.Text>
        </Button>
      </Stack>
    </>
  );
}

const modes = {
  fullscreen: {
    title: 'Fullscreen',
    snapPoints: [100],
  },
  'bottom-sheet': {
    title: 'Bottom Sheet',
    snapPoints: undefined,
  },
  popup: {
    title: 'Popup',
    snapPoints: [70],
  },
};

function Modal({
  children,
  preset = 'bottom-sheet',
}: PropsWithChildren<{ preset?: keyof typeof modes }>) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [footerSize, setFooterSize] = useState(0);

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild onPress={() => setOpen(true)}>
        {children}
      </Dialog.Trigger>
      <Dialog.Adapt when="maxMd">
        <Dialog.Sheet modal position={0} animation="medium" snapPoints={modes[preset].snapPoints}>
          <Dialog.Sheet.Overlay
            animation="state"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Sheet.Content disableHideBottomOverflow preset={preset}>
            <Dialog.Sheet.ScrollView
              stickyHeaderIndices={[0]}
              contentContainerStyle={{ paddingBottom: footerSize }}
            >
              <Dialog.Sheet.Header blured>
                <NavBar preset="prominent">
                  {step > 0 && (
                    <NavBar.StartSlot>
                      <RichIcon size="$300" pressable onPress={() => setStep((prev) => prev - 1)}>
                        <RichIcon.Icon icon={ArrowLeft} />
                      </RichIcon>
                    </NavBar.StartSlot>
                  )}
                  <NavBar.Center>
                    <NavBar.Title>{modes[preset].title}</NavBar.Title>
                  </NavBar.Center>
                  <NavBar.EndSlot>
                    <RichIcon size="$300" pressable onPress={() => setOpen(false)}>
                      <RichIcon.Icon icon={Cross} />
                    </RichIcon>
                  </NavBar.EndSlot>
                </NavBar>
              </Dialog.Sheet.Header>
              <Dialog.Sheet.Body
                paddingHorizontal="$platform.layout.margin-horizontal.sm"
                $md={{
                  paddingHorizontal: '$platform.layout.margin-horizontal.md',
                }}
                $lg={{
                  paddingHorizontal: '$platform.layout.margin-horizontal.lg',
                }}
                $xl={{
                  paddingHorizontal: '$platform.layout.margin-horizontal.xl',
                }}
              >
                <ContentStack>
                  <SemanticText variant="paragraphM">
                    The Modal Screen is perfect for presenting supplementary information, controls,
                    or form inputs—enhancing the user experience by offering quick, intuitive access
                    to additional functionality
                  </SemanticText>
                </ContentStack>
                <Stack borderRadius="$radius.600" backgroundColor="$overlay.brand-extra">
                  <Image
                    src="/blanks/modal-blank.png"
                    aspectRatio={1 / 1}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Stack>
              </Dialog.Sheet.Body>
            </Dialog.Sheet.ScrollView>
            <Sheet.Footer
              // blured
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              zIndex={1}
              paddingHorizontal="$platform.layout.margin-horizontal.sm"
              $md={{
                paddingHorizontal: '$platform.layout.margin-horizontal.md',
              }}
              $lg={{
                paddingHorizontal: '$platform.layout.margin-horizontal.lg',
              }}
              $xl={{
                paddingHorizontal: '$platform.layout.margin-horizontal.xl',
              }}
              onLayout={(e) => {
                setFooterSize(e.nativeEvent.layout.height);
              }}
            >
              <Stack gap="$200" flexDirection="row">
                <Button
                  blured
                  tone="neutral"
                  variant="secondary"
                  onPress={() => setStep((prev) => prev - 1)}
                  flexGrow={1}
                  flexShrink={1}
                  flexBasis="auto"
                  zIndex={44}
                >
                  <Button.Text>Back</Button.Text>
                </Button>
                <Button
                  onPress={() => setStep((prev) => prev + 1)}
                  flexGrow={1}
                  flexShrink={1}
                  flexBasis="auto"
                >
                  <Button.Text>Next</Button.Text>
                </Button>
              </Stack>
            </Sheet.Footer>
          </Dialog.Sheet.Content>
        </Dialog.Sheet>
      </Dialog.Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animateOnly={['transform', 'opacity']}
          animation={[
            'medium',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          key="content"
          maxWidth={600}
          width="100%"
          animateOnly={['transform', 'opacity']}
          animation={[
            'medium',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        >
          <ScrollView
            stickyHeaderIndices={[0]}
            contentContainerStyle={{ paddingBottom: footerSize }}
          >
            <Dialog.Header blured>
              <NavBar preset="prominent">
                {step > 0 && (
                  <NavBar.StartSlot>
                    <RichIcon size="$300" pressable onPress={() => setStep((prev) => prev - 1)}>
                      <RichIcon.Icon icon={ArrowLeft} />
                    </RichIcon>
                  </NavBar.StartSlot>
                )}
                <NavBar.Center>
                  <Dialog.Title asChild>
                    <NavBar.Title>{modes[preset].title}</NavBar.Title>
                  </Dialog.Title>
                </NavBar.Center>
                <NavBar.EndSlot>
                  <RichIcon size="$300" pressable onPress={() => setOpen(false)}>
                    <RichIcon.Icon icon={Cross} />
                  </RichIcon>
                </NavBar.EndSlot>
              </NavBar>
            </Dialog.Header>
            <Dialog.Body
              gap="$100"
              paddingHorizontal="$platform.layout.margin-horizontal.sm"
              $md={{
                paddingHorizontal: '$platform.layout.margin-horizontal.md',
              }}
              $lg={{
                paddingHorizontal: '$platform.layout.margin-horizontal.lg',
              }}
              $xl={{
                paddingHorizontal: '$platform.layout.margin-horizontal.xl',
              }}
            >
              <ContentStack>
                <SemanticText variant="paragraphM">
                  The Modal Screen is perfect for presenting supplementary information, controls, or
                  form inputs—enhancing the user experience by offering quick, intuitive access to
                  additional functionality
                </SemanticText>
              </ContentStack>
              <Stack borderRadius="$radius.600" backgroundColor="$overlay.brand-extra">
                <Image
                  src="/blanks/modal-blank.png"
                  aspectRatio={1 / 1}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Stack>
            </Dialog.Body>
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
