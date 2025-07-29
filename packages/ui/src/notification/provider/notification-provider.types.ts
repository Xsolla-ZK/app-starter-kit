import type { NativeValue, TamaguiElement } from '@tamagui/core';
import type { MutableRefObject, ReactNode } from 'react';
import type { NotificationImperativeOptions } from '../imperative/notification-imperative.types';
import type { BurntNotificationOptions } from '../types';

export type SwipeDirection = 'vertical' | 'up' | 'down' | 'horizontal' | 'left' | 'right';

export type NotificationProviderContextValue = {
  id: string;
  label: string;
  duration: number;
  swipeDirection: SwipeDirection;
  swipeThreshold: number;
  toastCount: number;
  viewports: Record<string, TamaguiElement | null>;
  onViewportChange: (name: string, viewport: TamaguiElement) => void;
  onNotificationAdd: () => void;
  onNotificationRemove: () => void;
  isFocusedNotificationEscapeKeyDownRef: MutableRefObject<boolean>;
  isClosePausedRef: MutableRefObject<boolean>;
  options: NotificationImperativeOptions;
};

export interface NotificationProviderProps {
  children?: ReactNode;
  /**
   * An author-localized label for each toast. Used to help screen reader users
   * associate the interruption with a toast.
   * @defaultValue 'Notification'
   */
  label?: string;
  /**
   * Time in milliseconds that each toast should remain visible for.
   * @defaultValue 5000
   */
  duration?: number;
  /**
   * The maximum number of notifications that can be displayed at once.
   * When the limit is reached, the oldest notification is removed.
   * @defaultValue 5
   */
  multiple?: number;
  /**
   * Direction of pointer swipe that should close the toast.
   * @defaultValue 'right'
   */
  swipeDirection?: SwipeDirection;
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   * @defaultValue 50
   */
  swipeThreshold?: number;
  /**
   * @defaultValue unique generated identifier
   */
  id?: string;
  /**
   * Will show a native toast if is true or is set to the current platform. On iOS, it wraps `SPIndicator` and `SPAlert`. On Android, it wraps `NotificationAndroid`. On web, it wraps Notification API. Mobile's native features are handled by `burnt`.
   * Only works with the imperative `useNotification` hook.
   */
  native?: NativeValue;
  /**
   * Options for the burnt package if you're using native toasts on mobile
   */
  burntOptions?: Omit<BurntNotificationOptions, 'title' | 'message' | 'duration'>;
  /**
   * Options for the notification API if you're using native toasts on web
   */
  notificationOptions?: NotificationOptions;
}
