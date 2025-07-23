import { createCollection } from '@tamagui/collection';
import type { TamaguiElement } from '@tamagui/core';
import { createStyledContext } from '@tamagui/core';
import { startTransition } from '@tamagui/start-transition';
import { NOTIFICATION_CONTEXT } from '@xsolla-zk/constants';
import type { PropsWithChildren } from 'react';
import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { NotificationImperativeProvider } from '../imperative/notification-imperative';
import type { NotificationScopedProps } from '../notification.types';
import type {
  NotificationProviderContextValue,
  NotificationProviderProps,
} from './notification-provider.types';

const [Collection, useCollection] = createCollection<TamaguiElement>('Notification');

const { Provider: NotificationProviderProvider, useStyledContext: useNotificationProviderContext } =
  createStyledContext<NotificationProviderContextValue>();

const NotificationProvider = (props: NotificationScopedProps<NotificationProviderProps>) => {
  const {
    __scopeNotification,
    id: providedId,
    burntOptions,
    native,
    notificationOptions,
    label = 'Notification',
    duration = 2000,
    swipeDirection = 'right',
    swipeThreshold = 50,
    multiple = 5,
    children,
  } = props;
  const backupId = useId();
  const id = providedId ?? backupId;
  const [viewports, setViewports] = useState<NotificationProviderContextValue['viewports']>({});
  const [toastCount, setNotificationCount] = useState(0);
  const isFocusedNotificationEscapeKeyDownRef = useRef(false);
  const isClosePausedRef = useRef(false);

  const handleViewportChange = useCallback((name: string, viewport: TamaguiElement | null) => {
    startTransition(() => {
      setViewports((prev) => ({ ...prev, [name]: viewport }));
    });
  }, []);

  const options = useMemo(
    () => ({
      duration,
      burntOptions,
      native,
      notificationOptions,
    }),
    [duration, burntOptions, native, notificationOptions],
  );

  return (
    <Collection.Provider __scopeCollection={__scopeNotification || NOTIFICATION_CONTEXT}>
      <NotificationProviderProvider
        scope={__scopeNotification}
        id={id}
        label={label}
        duration={duration}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
        toastCount={toastCount}
        viewports={viewports}
        onViewportChange={handleViewportChange}
        onNotificationAdd={useCallback(() => {
          startTransition(() => {
            setNotificationCount((prevCount) => prevCount + 1);
          });
        }, [])}
        onNotificationRemove={useCallback(() => {
          startTransition(() => {
            setNotificationCount((prevCount) => prevCount - 1);
          });
        }, [])}
        isFocusedNotificationEscapeKeyDownRef={isFocusedNotificationEscapeKeyDownRef}
        isClosePausedRef={isClosePausedRef}
        options={options}
      >
        <NotificationImperativeProvider
          options={options}
          multiple={multiple}
          onAdd={useCallback(() => setNotificationCount((c) => c + 1), [])}
          onRemove={useCallback(() => setNotificationCount((c) => c - 1), [])}
        >
          {children}
        </NotificationImperativeProvider>
      </NotificationProviderProvider>
    </Collection.Provider>
  );
};

export function ReprogapateNotificationProvider(
  props: PropsWithChildren<{
    context: NotificationProviderContextValue;
  }>,
) {
  const { children, context } = props;
  return (
    <Collection.Provider __scopeCollection={NOTIFICATION_CONTEXT}>
      <NotificationProviderProvider {...context}>
        <NotificationImperativeProvider
          options={context.options}
          multiple={5}
          onAdd={() => {}}
          onRemove={() => {}}
        >
          {children}
        </NotificationImperativeProvider>
      </NotificationProviderProvider>
    </Collection.Provider>
  );
}

export { Collection, NotificationProvider, useCollection, useNotificationProviderContext };
export type { NotificationProviderProps };
