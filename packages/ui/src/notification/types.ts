// from `burnt`
type BurntLayout = {
  iconSize?: {
    width: number;
    height: number;
  };
};

// from `burnt`
export type BurntNotificationOptions = {
  title: string;
  message?: string;
  /**
   * Defaults to `done`.
   */
  preset?: 'done' | 'error' | 'none';
  /**
   * Duration in seconds.
   */
  duration?: number;
  haptic?: 'success' | 'warning' | 'error' | 'none';
  /**
   * Defaults to `true`.
   */
  shouldDismissByDrag?: boolean;
  /**
   * Change the presentation side.
   * @platform ios
   */
  from?: 'top' | 'bottom';
  layout?: BurntLayout;
};

export interface CreateNativeNotificationOptions {
  /**
   * Body of the toast
   */
  message?: BurntNotificationOptions['message'];
  /**
   * Duration of toast in ms
   *
   * @example 1000
   */
  duration?: BurntNotificationOptions['duration'];
  /**
   * Options for the burnt package if you're using native toasts on mobile
   */
  burntOptions?: Omit<BurntNotificationOptions, 'title' | 'message' | 'duration'>;
  /**
   * Options for the notification API if you're using native toasts on web
   */
  notificationOptions?: NotificationOptions;
}

export interface NativeNotificationRef {
  /**
   * Used to close web notifications
   */
  close: () => void;
}

export type CreateNativeNotificationsFn = (
  title: string,
  options: CreateNativeNotificationOptions,
) =>
  | {
      nativeNotificationRef?: NativeNotificationRef;
    }
  | boolean;

export type HideNativeNotificationsFn = (ref?: NativeNotificationRef) => void;
