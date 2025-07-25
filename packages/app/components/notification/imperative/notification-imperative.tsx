import { isWeb } from '@tamagui/core';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { createNativeNotification } from '../create-native-notification';
import type { NativeNotificationRef } from '../types';
import type {
  NotificationContextI,
  NotificationData,
  NotificationImperativeProviderProps,
} from './notification-imperative.types';

const NotificationContext = createContext<NotificationContextI>({
  nativeNotification: null,
  show: () => false,
  hide: () => {},
  options: {},
});
const NotificationCurrentContext = createContext<NotificationData[]>([]);

export const useNotificationController = () => useContext(NotificationContext);

export const useNotificationState = () => useContext(NotificationCurrentContext);

export const NotificationImperativeProvider = ({
  children,
  options,
  multiple,
}: NotificationImperativeProviderProps) => {
  const counterRef = useRef(0);

  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  console.log('notifications222', notifications);

  const [lastNativeNotificationRef, setLastNativeNotificationRef] =
    useState<NotificationContextI['nativeNotification']>(null);

  const show = useCallback<NotificationContextI['show']>(
    (title, showOptions) => {
      const native = showOptions?.native ?? options.native;
      const isWebNative = Array.isArray(native) ? native.includes('web') : native === 'web';
      const isMobileNative = Array.isArray(native)
        ? native.includes('mobile')
        : native === 'mobile';
      const isAndroidNative =
        isMobileNative ||
        (Array.isArray(native) ? native.includes('android') : native === 'android');
      const isIosNative =
        isMobileNative || (Array.isArray(native) ? native.includes('ios') : native === 'ios');

      const isHandledNatively =
        native === true ||
        (isWeb && isWebNative) ||
        (!isWeb && isMobileNative) ||
        (Platform.OS === 'android' && isAndroidNative) ||
        (Platform.OS === 'ios' && isIosNative);

      let nativeNotificationRef: NativeNotificationRef | null = null;
      if (isHandledNatively) {
        const nativeNotificationResult = createNativeNotification(title, showOptions ?? {});
        if (
          typeof nativeNotificationResult === 'object' &&
          nativeNotificationResult.nativeNotificationRef
        ) {
          nativeNotificationRef = nativeNotificationResult.nativeNotificationRef;
        }
      }
      counterRef.current++;
      const newNotification: NotificationData = {
        ...showOptions,
        title,
        id: counterRef.current.toString(),
        isHandledNatively,
        duration: showOptions?.duration ?? options.duration,
        viewportName: showOptions?.viewportName ?? 'default',
        nativeNotificationRef,
      };

      setNotifications((prev) => {
        const newQueue = [newNotification, ...prev];
        if (newQueue.length > multiple) {
          return newQueue.slice(0, multiple);
        }
        return newQueue;
      });

      return true;
    },
    [setNotifications, JSON.stringify(options.native || null)],
  );

  const hide = useCallback(
    (notificationId: string) => {
      const notificationToHide = notifications.find((n) => n.id === notificationId);
      notificationToHide?.nativeNotificationRef?.close();

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    },
    [notifications],
  );

  const contextValue = useMemo(
    () => ({
      show,
      hide,
      nativeNotification: lastNativeNotificationRef,
      options,
    }),
    [show, hide, lastNativeNotificationRef, JSON.stringify(options || null)],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      <NotificationCurrentContext.Provider value={notifications}>
        {children}
      </NotificationCurrentContext.Provider>
    </NotificationContext.Provider>
  );
};
