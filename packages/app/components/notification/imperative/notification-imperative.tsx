import { isWeb } from '@tamagui/core';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { createNativeNotification } from '../create-native-notification';
import type { NativeNotificationRef } from '../types';
import type {
  NotificationContextI,
  NotificationData,
  NotificationImperativeProviderProps,
  ShowOptions,
} from './notification-imperative.types';

const ControllerContext = createContext<NotificationContextI>({
  show: () => false,
  hide: () => {},
});

const NotificationsContext = createContext<NotificationData[]>([]);

export const useNotificationController = () => useContext(ControllerContext);
export const useNotifications = () => useContext(NotificationsContext);

export const NotificationImperativeProvider = ({
  children,
  options,
  multiple,
  onAdd,
  onRemove,
}: NotificationImperativeProviderProps) => {
  const counterRef = useRef(0);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  console.log('notifications', notifications);
  const show = useCallback(
    (title: string, showOptions?: ShowOptions) => {
      console.log('show');
      console.log('title', title);
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
        nativeNotificationRef, // <-- Сохраняем ссылку в объект уведомления
      };

      setNotifications((prev) => {
        const newQueue = [newNotification, ...prev];
        if (newQueue.length > multiple) {
          return newQueue.slice(0, multiple);
        }
        return newQueue;
      });

      onAdd();
      return true;
    },
    [multiple, options.duration, options.native, onAdd],
  );

  const hide = useCallback(
    (notificationId: string) => {
      // Находим ref ПЕРЕД удалением уведомления из состояния
      const notificationToHide = notifications.find((n) => n.id === notificationId);
      notificationToHide?.nativeNotificationRef?.close();

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      onRemove();
    },
    [notifications, onRemove], // Добавляем notifications в зависимости
  );

  const controllerValue = useMemo(() => ({ show, hide }), [show, hide]);
  console.log('controllerValue', controllerValue);
  console.log('notifications', notifications);
  return (
    <ControllerContext.Provider value={controllerValue}>
      <NotificationsContext.Provider value={notifications}>
        {children}
      </NotificationsContext.Provider>
    </ControllerContext.Provider>
  );
};
