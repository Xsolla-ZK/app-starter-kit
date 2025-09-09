import { Checkmark, Cross, Info, Plus, Warning } from '@xsolla-zk/icons';
import type { ColorTokens, IconComponent } from '@xsolla-zk/react';
import {
  FlexButton,
  Notification,
  RichIcon,
  SnackBar,
  useNotificationState,
} from '@xsolla-zk/react';

export function CustomSnackBar() {
  const currentNotification = useNotificationState();

  const getIcon = (): {
    icon: IconComponent;
    backgroundColor: ColorTokens;
    color: ColorTokens;
  } => {
    if (currentNotification?.customData?.status === 'success') {
      return {
        icon: Checkmark,
        backgroundColor: '$background.positive-high',
        color: '$content.static-light-primary',
      };
    }

    if (currentNotification?.customData?.status === 'warning') {
      return {
        icon: Warning,
        backgroundColor: '$background.warning-high',
        color: '$content.static-light-primary',
      };
    }

    if (currentNotification?.customData?.status === 'info') {
      return {
        icon: Info,
        backgroundColor: '$background.info-high',
        color: '$content.static-light-primary',
      };
    }

    return {
      icon: Plus,
      backgroundColor: '$background.brand-high',
      color: '$content.on-brand',
    };
  };

  const iconData = getIcon();

  if (!currentNotification || currentNotification.isHandledNatively) return null;

  return (
    <Notification
      key={currentNotification?.id}
      animation="medium"
      duration={currentNotification?.duration ?? 2000}
      open={currentNotification?.viewportName === 'snack-bar'}
      enterStyle={{ opacity: 0, transform: [{ translateX: 100 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateX: 100 }] }}
      transform={[{ translateX: 0 }]}
      opacity={1}
      viewportName="snack-bar"
    >
      <SnackBar>
        <SnackBar.Content alignItems="flex-start">
          <RichIcon shape="squircle" size="$600" backgroundColor={iconData.backgroundColor}>
            <RichIcon.Icon icon={iconData.icon} color={iconData.color} />
          </RichIcon>
          <SnackBar.Description flex={1}>
            <SnackBar.List>
              {currentNotification?.title && (
                <Notification.Title preset="compact.350.accent">
                  {currentNotification.title}
                </Notification.Title>
              )}
              {currentNotification?.message && (
                <Notification.Description preset="compact.250.default" whiteSpace="normal">
                  {currentNotification.message}
                </Notification.Description>
              )}
            </SnackBar.List>
            <SnackBar.Actions>
              <Notification.Action altText="SnackBar Action 1" asChild>
                <FlexButton size="$400" tone="brand-extra">
                  <FlexButton.Text>Action 1</FlexButton.Text>
                </FlexButton>
              </Notification.Action>
              <Notification.Action altText="SnackBar Action 2" asChild>
                <FlexButton size="$400" tone="neutral">
                  <FlexButton.Text>Action 2</FlexButton.Text>
                </FlexButton>
              </Notification.Action>
            </SnackBar.Actions>
          </SnackBar.Description>
        </SnackBar.Content>
        <Notification.Close asChild>
          <RichIcon pressable size="$200" position="absolute" top={8} right={8}>
            <RichIcon.Icon icon={Cross} />
          </RichIcon>
        </Notification.Close>
      </SnackBar>
    </Notification>
  );
}
