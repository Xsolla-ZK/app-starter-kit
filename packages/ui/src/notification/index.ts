import type { NativePlatform, NativeValue } from '@tamagui/core';
import type { CustomData } from './imperative/notification-imperative.types';
import type { NotificationProps } from './impl/notification-impl.types';
import type {
  NotificationActionProps,
  NotificationCloseProps,
  NotificationDescriptionProps,
  NotificationTitleProps,
} from './notification.types';
import type { NotificationProviderProps } from './provider/notification-provider.types';
import type { NotificationViewportProps } from './viewport/notification-viewport.types';

export {
  useNotificationController,
  useNotificationState,
} from './imperative/notification-imperative';
export { Notification } from './notification';
export { NotificationProvider } from './provider/notification-provider';
export { NotificationViewport } from './viewport/notification-viewport';

export type {
  // imperative
  CustomData,
  NotificationActionProps,
  NotificationCloseProps,
  NotificationDescriptionProps,
  NativePlatform as NotificationNativePlatform,
  // backwards
  NativeValue as NotificationNativeValue,
  NotificationProps,
  NotificationProviderProps,
  NotificationTitleProps,
  NotificationViewportProps,
};
