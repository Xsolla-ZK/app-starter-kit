import { useIsomorphicLayoutEffect } from '@tamagui/constants';
import type { TamaguiElement } from '@tamagui/core';
import { Text, useEvent } from '@tamagui/core';
import { Portal } from '@tamagui/portal';
import { startTransition } from '@tamagui/start-transition';
import { forwardRef, useEffect, useState } from 'react';
import { VisuallyHidden } from '../notification.styled';
import type { NotificationScopedProps } from '../notification.types';
import { useNotificationProviderContext } from '../provider/notification-provider';
import { NotificationAnnounceExcludeFrame } from './notification-announce.styled';
import type {
  NotificationAnnounceExcludeProps,
  NotificationAnnounceProps,
} from './notification-announce.types';

const NotificationAnnounceExclude = forwardRef<
  TamaguiElement,
  NotificationScopedProps<NotificationAnnounceExcludeProps>
>((props, forwardedRef) => {
  const { altText, ...announceExcludeProps } = props;

  return (
    <NotificationAnnounceExcludeFrame
      data-toast-announce-exclude=""
      data-toast-announce-alt={altText || undefined}
      {...announceExcludeProps}
      ref={forwardedRef}
    />
  );
});

const NotificationAnnounce = (props: NotificationScopedProps<NotificationAnnounceProps>) => {
  const { __scopeNotification, children, ...announceProps } = props;
  const context = useNotificationProviderContext(__scopeNotification);
  const [renderAnnounceText, setRenderAnnounceText] = useState(false);
  const [isAnnounced, setIsAnnounced] = useState(false);

  // render text content in the next frame to ensure toast is announced in NVDA
  useNextFrame(() => {
    startTransition(() => {
      setRenderAnnounceText(true);
    });
  });

  // cleanup after announcing
  useEffect(() => {
    const timer = setTimeout(() => setIsAnnounced(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return isAnnounced ? null : (
    <Portal asChild>
      <VisuallyHidden {...announceProps}>
        {renderAnnounceText && (
          <Text>
            {context.label} {children}
          </Text>
        )}
      </VisuallyHidden>
    </Portal>
  );
};

function useNextFrame(callback = () => {}) {
  const fn = useEvent(callback);
  useIsomorphicLayoutEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(fn);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [fn]);
}

export { NotificationAnnounce, NotificationAnnounceExclude };
