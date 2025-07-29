import type { GetProps } from '@tamagui/core';
import type { DismissableProps } from '@tamagui/dismissable';
import type { GestureResponderEvent } from 'react-native';
import type { NotificationImplFrame } from './notification-impl.styled';

type NotificationImplPrivateProps = {
  open?: boolean;
  onClose: () => void;
};

type NotificationImplFrameProps = GetProps<typeof NotificationImplFrame>;

export type NotificationExtraProps = {
  /**
   * The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.
   */
  open?: boolean;

  /**
   * The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the open state of the dialog changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
  /**
   * The title of the notification.
   */
  title?: string;
  /**
   * The description of the notification.
   */
  description?: string;
  /**
   * Control the sensitivity of the toast for accessibility purposes.
   * For toasts that are the result of a user action, choose foreground. Notifications generated from background tasks should use background.
   */
  type?: 'foreground' | 'background';
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value given to `NotificationProvider`.
   */
  duration?: number;
  /**
   * Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.
   */
  onEscapeKeyDown?: DismissableProps['onEscapeKeyDown'];
  /**
   * Event handler called when the dismiss timer is paused.
   * On web, this occurs when the pointer is moved over the viewport, the viewport is focused or when the window is blurred.
   * On mobile, this occurs when the toast is touched.
   */
  onPause?: () => void;
  /**
   * Event handler called when the dismiss timer is resumed.
   * On web, this occurs when the pointer is moved away from the viewport, the viewport is blurred or when the window is focused.
   * On mobile, this occurs when the toast is released.
   */
  onResume?: () => void;
  /**
   * Event handler called when starting a swipe interaction. It can be prevented by calling `event.preventDefault`.
   */
  onSwipeStart?: (event: SwipeEvent) => void;
  /**
   * Event handler called during a swipe interaction. It can be prevented by calling `event.preventDefault`.
   */
  onSwipeMove?: (event: SwipeEvent) => void;
  /**
   * Event handler called at the cancellation of a swipe interaction. It can be prevented by calling `event.preventDefault`.
   */
  onSwipeCancel?: (event: SwipeEvent) => void;
  /**
   * Event handler called at the end of a swipe interaction. It can be prevented by calling `event.preventDefault`.
   */
  onSwipeEnd?: (event: SwipeEvent) => void;
  /**
   * The viewport's name to send the toast to. Used when using multiple viewports and want to forward toasts to different ones.
   *
   * @default "default"
   */
  viewportName?: string;
  /**
   *
   */
  id?: string;

  /**
   * Web-only: Event handler called when the key down event is triggered.
   */
  onKeyDown?: (event: KeyboardEvent) => void;
};

export type NotificationImplProps = NotificationImplPrivateProps &
  NotificationImplFrameProps &
  NotificationExtraProps;

export type NotificationProps = Omit<NotificationImplProps, keyof NotificationImplPrivateProps>;

export type SwipeEvent = GestureResponderEvent;
