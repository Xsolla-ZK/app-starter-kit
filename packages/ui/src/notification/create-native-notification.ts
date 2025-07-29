import type { CreateNativeNotificationsFn, HideNativeNotificationsFn } from './types';

export const createNativeNotification: CreateNativeNotificationsFn = (
  title,
  { message, notificationOptions },
) => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'denied') return false;
  const showNotification = () => {
    const notification = new Notification(title, {
      body: message,
      ...notificationOptions,
    });

    return notification;
  };

  if (Notification.permission === 'granted') {
    const notification = showNotification();
    return {
      nativeNotificationRef: notification,
    };
  }
  void Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      const notification = showNotification();
      return {
        nativeNotificationRef: notification,
      };
    }
  });
  return true;
};

export const hideNativeNotification: HideNativeNotificationsFn = (ref) => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications');
    return;
  }

  if (ref) {
    ref.close();
  }
};
