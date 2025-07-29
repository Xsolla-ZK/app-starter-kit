import type { NativeValue } from '@tamagui/core';
import type { ReactNode } from 'react';
import type { CreateNativeNotificationOptions, NativeNotificationRef } from '../types';

export interface NotificationImperativeOptions
  extends Omit<CreateNativeNotificationOptions, 'message'> {
  /**
   * Will show a native toast if is true or is set to the current platform. On iOS, it wraps `SPIndicator` and `SPAlert`. On Android, it wraps `NotificationAndroid`. On web, it wraps Notification API. Mobile's native features are handled by `burnt`.
   */
  native?: NativeValue;
}

/**
 * Override this in your application to get custom toast fields.
 *
 * e.g.
 * ```ts
 * declare module '@tamagui/toast' {
 *   interface CustomData {
 *     preset: 'error' | 'success'
 *     isUrgent: true
 *   }
 * }
 *```
 * You will get auto-completion:
 * ```ts
 * toast.show("Message", { preset: 'error', isUrgent: true })
 * ```
 */
export interface CustomData {
  [key: string]: unknown;
}

export type ShowOptions = CreateNativeNotificationOptions &
  CustomData & {
    /**
     * Used when need custom data
     */
    customData?: CustomData;
    /**
     * Overrides the native option on `NotificationImperativeProvider`
     */
    native?: NativeValue;
    /**
     * Which viewport to send this toast to. This is only intended to be used with custom toasts and you should wire it up when creating the toast.
     */
    viewportName?: string;
  };

export interface NotificationData extends ShowOptions {
  /**
   * A unique identifier for the notification.
   */
  id: string;

  /**
   * The title of the notification.
   */
  title: string;

  /**
   * The title of the notification.
   */
  description?: string;

  /**
   * A boolean flag indicating if the notification was handled by a native API.
   */
  isHandledNatively: boolean;

  nativeNotificationRef?: NativeNotificationRef | null;
}

export interface NotificationContextI {
  nativeNotification: NativeNotificationRef | null;

  /**
   * Call it to show a new toast. If you're using native toasts, you can pass native options using \`burntOptions\` or \`notificationOptions\` depending on the native platform (mobile/web).
   */
  show: (title: string, options?: ShowOptions) => boolean;

  /**
   * Call it to hide the currently displayed toast.
   *
   * _NOTE_: does not work on Android native toasts
   *
   * _NOTE_: hides the last toast on web notification toasts
   */
  hide: (notificationId: string) => void;

  options?: NotificationImperativeOptions;
}

export interface NotificationImperativeProviderProps {
  children: ReactNode;
  /**
   * Used to provide defaults to imperative API. Options can be overwritten when calling `show()`.
   */
  options: NotificationImperativeOptions;
  /**
   * The maximum number of notifications that can be displayed at once.
   */
  multiple: number;
  /**
   * A callback that fires when a notification is added to the queue.
   */
  onAdd: () => void;
  /**
   * A callback that fires when a notification is removed from the queue.
   */
  onRemove: () => void;
}
