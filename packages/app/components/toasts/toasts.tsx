import { Clock, ContentCopy } from '@xsolla-zk/icons';
import { RichIcon, Toast } from '@xsolla-zk/react';
import { Notification, useNotificationState } from '../notification';

export const CustomToasts = () => {
  const notifications = useNotificationState() || [];

  return (
    <>
      {notifications
        .filter((notification) => notification.viewportName === 'toast')
        .map((notification) => {
          const icon = notification?.customData?.type === 'copy' ? ContentCopy : Clock;

          return (
            <Notification
              key={notification.id}
              animation="medium"
              duration={notification.duration ?? 2000}
              open={true}
              enterStyle={{ opacity: 0, transform: [{ translateY: -50 }] }}
              exitStyle={{ opacity: 0, transform: [{ translateY: -50 }] }}
              transform={[{ translateY: 0 }]}
              opacity={1}
              scale={1}
              viewportName={'toast'}
            >
              <Toast>
                <RichIcon shape="squircle" size="$400">
                  <RichIcon.Icon icon={icon} />
                </RichIcon>
                <Notification.Title preset="compact.300.accent">
                  {notification.title}
                </Notification.Title>
                <Notification.Description preset="compact.300.accent">
                  {notification.description}
                </Notification.Description>
              </Toast>
            </Notification>
          );
        })}
    </>
  );
};
