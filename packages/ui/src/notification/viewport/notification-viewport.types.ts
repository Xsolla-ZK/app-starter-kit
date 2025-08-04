import type { GetProps } from '@tamagui/core';
import type { ComponentRef } from 'react';
import type { VisuallyHidden } from '../notification.styled';
import type { NotificationViewportFrame } from './notification-viewport.styled';

type NotificationViewportFrameProps = GetProps<typeof NotificationViewportFrame>;
export type NotificationViewportProps = NotificationViewportFrameProps & {
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey?: string[];
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string;
  /**
   * Used to reference the viewport if you want to have multiple viewports in the same provider.
   */
  name?: string;
  /**
   * Pass this when you want to have multiple/duplicated toasts.
   */
  multiple?: number;
  /**
   * When true, uses a portal to render at the very top of the root TamaguiProvider.
   */
  portalToRoot?: boolean;
  multipleNotifications?: boolean;
};

export type FocusProxyElement = ComponentRef<typeof VisuallyHidden>;
type VisuallyHiddenProps = GetProps<typeof VisuallyHidden>;

export type FocusProxyProps = VisuallyHiddenProps & {
  onFocusFromOutsideViewport: () => void;
  viewportName: string;
};
