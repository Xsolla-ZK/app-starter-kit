import { Notification } from '@app/ui';
import { Checkmark, Cross, Info, Plus, Warning } from '@xsolla-zk/icons';
import type { ColorTokens, IconProp } from '@xsolla-zk/react';
import { FlexButton, RichIcon, SnackBar } from '@xsolla-zk/react';
import { useNotificationState } from '../notification';

const getIconData = (status?: 'success' | 'warning' | 'info' | unknown) => {
  if (status === 'success') {
    return {
      icon: Checkmark as IconProp,
      backgroundColor: '$background.positive-high' as ColorTokens,
      color: '$content.static-light-primary' as ColorTokens,
    };
  }

  if (status === 'warning') {
    return {
      icon: Warning as IconProp,
      backgroundColor: '$background.warning-high' as ColorTokens,
      color: '$content.static-light-primary' as ColorTokens,
    };
  }

  if (status === 'info') {
    return {
      icon: Info as IconProp,
      backgroundColor: '$background.info-high' as ColorTokens,
      color: '$content.static-light-primary' as ColorTokens,
    };
  }

  return {
    icon: Plus as IconProp,
    backgroundColor: '$background.brand-high' as ColorTokens,
    color: '$content.on-brand' as ColorTokens,
  };
};

export function CustomSnackBars() {
  const notifications = useNotificationState() || [];

  return (
    <>
      {notifications
        .filter(
          (notification) =>
            notification.viewportName === 'snack-bar' && !notification.isHandledNatively,
        )
        .map((notification) => {
          const status = notification?.customData?.status;
          const iconData = getIconData(status);

          return (
            <Notification
              key={notification.id}
              animation="medium"
              duration={notification.duration ?? 2000}
              open={true} // Как и в примере, open=true, так как рендер управляется наличием в массиве
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
                      {notification.title && (
                        <Notification.Title preset="compact.350.accent">
                          {notification.title}
                        </Notification.Title>
                      )}
                      {notification.message && (
                        <Notification.Description preset="compact.250.default" whiteSpace="normal">
                          {notification.message}
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
        })}
    </>
  );
}
