import { Clock, ContentCopy } from '@xsolla-zk/icons';
import { Notification, RichIcon, Toast, useNotificationState } from '@xsolla-zk/react';
import type { IconProp } from '@xsolla-zk/react';

export const CustomToast = () => {
  const currentNotification = useNotificationState();

  const getIcon = (): IconProp => {
    if (currentNotification?.customData?.type === 'copy') {
      return ContentCopy;
    }

    return Clock;
  };

  return (
    <Notification
      key={currentNotification?.id}
      animation="medium"
      duration={currentNotification?.duration ?? 2000}
      open={currentNotification?.viewportName === 'toast'}
      enterStyle={{ opacity: 0, transform: [{ translateY: -50 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateY: -50 }] }}
      transform={[{ translateY: 0 }]}
      opacity={1}
      scale={1}
      viewportName={'toast'}
    >
      <Toast>
        <RichIcon shape="squircle" size="$400">
          <RichIcon.Icon icon={getIcon()} />
        </RichIcon>
        <Notification.Title preset="compact.300.accent">
          {currentNotification?.title}
        </Notification.Title>
      </Toast>
    </Notification>
  );
};
