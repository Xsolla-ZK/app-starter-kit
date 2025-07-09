import { Cross } from '@xsolla-zk/icons';
import { Dialog, type DialogProps, NavBar, RichIcon, SemanticText } from '@xsolla-zk/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView } from 'react-native';

const presets = {
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

type PresetKey = keyof typeof presets;

interface ModalProps extends PropsWithChildren {
  preset?: PresetKey;
  trigger: ReactNode;
  title?: string;
  footer?: ReactNode;
}

export function Modal({
  preset = 'bottom-sheet',
  trigger,
  children,
  title,
  footer,
  ...rest
}: ModalProps & DialogProps) {
  const resolvedTitle = title || presets[preset].title;

  return (
    <Dialog modal {...rest}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      {/* Mobile (Sheet) */}
      <Dialog.Adapt when="maxMd">
        <Dialog.Sheet modal position={0} animation="medium" snapPoints={presets[preset].snapPoints}>
          <Dialog.Sheet.Overlay
            animation="state"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Sheet.Content disableHideBottomOverflow preset={preset}>
            <Dialog.Sheet.ScrollView stickyHeaderIndices={[0]}>
              <Dialog.Sheet.Header blured>
                <NavBar preset="prominent">
                  <NavBar.Center>
                    <NavBar.Title>
                      <SemanticText variant={'headerM'} tag={'h3'}>
                        {resolvedTitle}
                      </SemanticText>
                    </NavBar.Title>
                  </NavBar.Center>
                  <NavBar.EndSlot>
                    <RichIcon size="$300" pressable onPress={() => rest.onOpenChange?.(false)}>
                      <RichIcon.Icon icon={Cross} />
                    </RichIcon>
                  </NavBar.EndSlot>
                </NavBar>
              </Dialog.Sheet.Header>

              <Dialog.Sheet.Body
                paddingHorizontal="$platform.layout.margin-horizontal.sm"
                $md={{ paddingHorizontal: '$platform.layout.margin-horizontal.md' }}
                $lg={{ paddingHorizontal: '$platform.layout.margin-horizontal.lg' }}
                $xl={{ paddingHorizontal: '$platform.layout.margin-horizontal.xl' }}
              >
                {children}
              </Dialog.Sheet.Body>
              {footer && (
                <Dialog.Sheet.Footer
                  paddingHorizontal="$platform.layout.margin-horizontal.sm"
                  $md={{ paddingHorizontal: '$platform.layout.margin-horizontal.md' }}
                  $lg={{ paddingHorizontal: '$platform.layout.margin-horizontal.lg' }}
                  $xl={{ paddingHorizontal: '$platform.layout.margin-horizontal.xl' }}
                >
                  {footer}
                </Dialog.Sheet.Footer>
              )}
            </Dialog.Sheet.ScrollView>
          </Dialog.Sheet.Content>
        </Dialog.Sheet>
      </Dialog.Adapt>

      {/* Desktop (Dialog) */}
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="medium"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          key="content"
          width={600}
          maxWidth="90%"
          animation="medium"
          enterStyle={{ opacity: 0, y: -10, scale: 0.95 }}
          exitStyle={{ opacity: 0, y: 10, scale: 0.95 }}
        >
          <ScrollView stickyHeaderIndices={[0]}>
            <Dialog.Header blured>
              <NavBar preset="prominent">
                <NavBar.Center>
                  <Dialog.Title asChild>
                    <NavBar.Title>
                      <SemanticText variant={'headerM'} tag={'h3'}>
                        {resolvedTitle}
                      </SemanticText>
                    </NavBar.Title>
                  </Dialog.Title>
                </NavBar.Center>
                <NavBar.EndSlot>
                  <RichIcon size="$300" pressable onPress={() => rest.onOpenChange?.(false)}>
                    <RichIcon.Icon icon={Cross} />
                  </RichIcon>
                </NavBar.EndSlot>
              </NavBar>
            </Dialog.Header>

            <Dialog.Body
              gap="$100"
              paddingHorizontal="$platform.layout.margin-horizontal.sm"
              $md={{ paddingHorizontal: '$platform.layout.margin-horizontal.md' }}
              $lg={{ paddingHorizontal: '$platform.layout.margin-horizontal.lg' }}
              $xl={{ paddingHorizontal: '$platform.layout.margin-horizontal.xl' }}
            >
              {children}
            </Dialog.Body>
            {/* Footer */}
            {footer && (
              <Dialog.Footer
                paddingHorizontal="$platform.layout.margin-horizontal.sm"
                $md={{ paddingHorizontal: '$platform.layout.margin-horizontal.md' }}
                $lg={{ paddingHorizontal: '$platform.layout.margin-horizontal.lg' }}
                $xl={{ paddingHorizontal: '$platform.layout.margin-horizontal.xl' }}
              >
                {footer}
              </Dialog.Footer>
            )}
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
