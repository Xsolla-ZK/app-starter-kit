import { AnimatePresence } from '@tamagui/animate-presence';
import { useComposedRefs } from '@tamagui/compose-refs';
import { isWeb, type TamaguiElement } from '@tamagui/core';
import {
  NOTIFICATION_FOCUS_PROXY_NAME,
  NOTIFICATION_VIEWPORT_DEFAULT_HOTKEY,
  NOTIFICATION_VIEWPORT_NAME,
  NOTIFICATION_VIEWPORT_PAUSE,
  NOTIFICATION_VIEWPORT_RESUME,
} from '@xsolla-zk/constants';
import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { useNotifications } from '../imperative/notification-imperative';
import { Notification } from '../notification';
import { VisuallyHidden } from '../notification.styled';
import type { NotificationScopedProps } from '../notification.types';
import { useNotificationProviderContext } from '../provider/notification-provider';
import {
  NotificationViewportFrame,
  NotificationViewportWrapperFrame,
} from './notification-viewport.styled';
import type {
  FocusProxyElement,
  FocusProxyProps,
  NotificationViewportProps,
} from './notification-viewport.types';

const FocusProxy = forwardRef<FocusProxyElement, NotificationScopedProps<FocusProxyProps>>(
  (props, forwardedRef) => {
    const { __scopeNotification, onFocusFromOutsideViewport, viewportName, ...proxyProps } = props;
    const context = useNotificationProviderContext(__scopeNotification);
    const viewport = context.viewports[viewportName] as HTMLElement;

    return (
      <VisuallyHidden
        aria-hidden
        tabIndex={0}
        {...proxyProps}
        ref={forwardedRef}
        position={isWeb ? ('fixed' as never) : 'absolute'}
        onFocus={(event) => {
          if (!isWeb) return;
          const prevFocusedElement = event.relatedTarget as HTMLElement | null;
          const isFocusFromOutsideViewport = !viewport?.contains(prevFocusedElement);
          if (isFocusFromOutsideViewport) onFocusFromOutsideViewport();
        }}
      />
    );
  },
);

FocusProxy.displayName = NOTIFICATION_FOCUS_PROXY_NAME;

const NotificationViewport = memo(
  forwardRef<TamaguiElement, NotificationScopedProps<NotificationViewportProps>>(
    (props, forwardedRef) => {
      const {
        __scopeNotification,
        hotkey = NOTIFICATION_VIEWPORT_DEFAULT_HOTKEY,
        label = 'Notifications ({hotkey})',
        name = 'default',
        multiple, // <-- ИЗВЛЕКАЕМ ПРОП ЗДЕСЬ
        ...viewportProps
      } = props;

      const context = useNotificationProviderContext(__scopeNotification);
      const notifications = useNotifications();
      const viewportNotifications = notifications.filter(
        (n) => (n.viewportName ?? 'default') === name,
      );

      const notificationRefs = useRef(new Map<string, TamaguiElement>());
      const headFocusProxyRef = useRef<FocusProxyElement>(null);
      const tailFocusProxyRef = useRef<FocusProxyElement>(null);
      const wrapperRef = useRef<HTMLDivElement>(null);
      const ref = useRef<HTMLDivElement>(null);

      const onViewportChange = useCallback(
        (el: TamaguiElement | null) => {
          if (context.viewports[name] !== el) {
            context.onViewportChange(name, el || null);
          }
        },
        [name, context.viewports, context.onViewportChange],
      );

      const composedRefs = useComposedRefs(forwardedRef, ref, onViewportChange);
      const hotkeyLabel = hotkey.join('+').replace(/Key|Digit/g, '');
      const hasNotifications = viewportNotifications.length > 0;

      useEffect(() => {
        if (!isWeb || !hasNotifications) return;
        const handleKeyDown = (event: KeyboardEvent) => {
          const isHotkeyPressed = hotkey.every(
            (key) => event[key as keyof KeyboardEvent] || event.code === key,
          );
          if (isHotkeyPressed) ref.current?.focus();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [hotkey, hasNotifications]);

      useEffect(() => {
        if (!isWeb || !hasNotifications) return;
        const wrapper = wrapperRef.current;
        const viewport = ref.current;
        if (wrapper && viewport) {
          const handlePause = () => {
            if (!context.isClosePausedRef.current) {
              const pauseEvent = new CustomEvent(NOTIFICATION_VIEWPORT_PAUSE);
              viewport.dispatchEvent(pauseEvent);
              context.isClosePausedRef.current = true;
            }
          };

          const handleResume = () => {
            if (context.isClosePausedRef.current) {
              const resumeEvent = new CustomEvent(NOTIFICATION_VIEWPORT_RESUME);
              viewport.dispatchEvent(resumeEvent);
              context.isClosePausedRef.current = false;
            }
          };

          const handleFocusOutResume = (event: FocusEvent) => {
            const isWendyOutside = !wrapper.contains(event.relatedTarget as HTMLElement);
            if (isWendyOutside) handleResume();
          };

          const handlePointerLeaveResume = () => {
            const isFocusInside = wrapper.contains(document.activeElement);
            if (!isFocusInside) handleResume();
          };

          wrapper.addEventListener('focusin', handlePause);
          wrapper.addEventListener('focusout', handleFocusOutResume);
          wrapper.addEventListener('pointermove', handlePause);
          wrapper.addEventListener('pointerleave', handlePointerLeaveResume);
          window.addEventListener('blur', handlePause);
          window.addEventListener('focus', handleResume);
          return () => {
            wrapper.removeEventListener('focusin', handlePause);
            wrapper.removeEventListener('focusout', handleFocusOutResume);
            wrapper.removeEventListener('pointermove', handlePause);
            wrapper.removeEventListener('pointerleave', handlePointerLeaveResume);
            window.removeEventListener('blur', handlePause);
            window.removeEventListener('focus', handleResume);
          };
        }
      }, [hasNotifications, context.isClosePausedRef]);

      const getSortedTabbableCandidates = useCallback(
        ({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) => {
          const toastItems = Array.from(notificationRefs.current.values());
          const tabbableCandidates = toastItems.map((toastItem) => {
            const toastNode = toastItem;
            const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)];
            return tabbingDirection === 'forwards'
              ? toastTabbableCandidates
              : toastTabbableCandidates.reverse();
          });
          return (
            tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates
          ).flat();
        },
        [],
      );

      useEffect(() => {
        if (!isWeb || !hasNotifications) return;
        const viewport = ref.current;
        if (viewport) {
          const handleKeyDown = (event: KeyboardEvent) => {
            const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
            const isTabKey = event.key === 'Tab' && !isMetaKey;

            if (isTabKey) {
              const focusedElement = document.activeElement;
              const isTabbingBackwards = event.shiftKey;
              const targetIsViewport = event.target === viewport;

              if (targetIsViewport && isTabbingBackwards) {
                headFocusProxyRef.current?.focus();
                return;
              }

              const tabbingDirection = isTabbingBackwards ? 'backwards' : 'forwards';
              const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection });
              const index = sortedCandidates.findIndex((candidate) => candidate === focusedElement);
              if (focusFirst(sortedCandidates.slice(index + 1))) {
                event.preventDefault();
              } else if (isTabbingBackwards) {
                headFocusProxyRef.current?.focus();
              } else {
                tailFocusProxyRef.current?.focus();
              }
            }
          };
          viewport.addEventListener('keydown', handleKeyDown);
          return () => viewport.removeEventListener('keydown', handleKeyDown);
        }
      }, [hasNotifications, getSortedTabbableCandidates]);

      return (
        <NotificationViewportWrapperFrame
          ref={wrapperRef}
          role="region"
          aria-label={label.replace('{hotkey}', hotkeyLabel)}
          tabIndex={-1}
          pointerEvents={hasNotifications ? 'auto' : 'none'}
        >
          {hasNotifications && (
            <FocusProxy
              __scopeNotification={__scopeNotification}
              viewportName={name}
              ref={headFocusProxyRef}
              onFocusFromOutsideViewport={() => {
                const tabbableCandidates = getSortedTabbableCandidates({
                  tabbingDirection: 'forwards',
                });
                focusFirst(tabbableCandidates);
              }}
            />
          )}

          <NotificationViewportFrame ref={composedRefs} {...viewportProps}>
            <AnimatePresence>
              {viewportNotifications.map((notification) => (
                <Notification
                  key={notification.id}
                  __scopeNotification={__scopeNotification}
                  ref={(node) => {
                    const map = notificationRefs.current;
                    if (node) {
                      map.set(notification.id, node);
                    } else {
                      map.delete(notification.id);
                    }
                  }}
                  {...notification}
                />
              ))}
            </AnimatePresence>
          </NotificationViewportFrame>

          {hasNotifications && (
            <FocusProxy
              __scopeNotification={__scopeNotification}
              viewportName={name}
              ref={tailFocusProxyRef}
              onFocusFromOutsideViewport={() => {
                const tabbableCandidates = getSortedTabbableCandidates({
                  tabbingDirection: 'backwards',
                });
                focusFirst(tabbableCandidates);
              }}
            />
          )}
        </NotificationViewportWrapperFrame>
      );
    },
  ),
);

NotificationViewport.displayName = NOTIFICATION_VIEWPORT_NAME;

function focusFirst(candidates: (HTMLElement | TamaguiElement)[]) {
  if (!isWeb) return;
  const previouslyFocusedElement = document.activeElement;
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement) return true;
    (candidate as HTMLElement).focus();
    return document.activeElement !== previouslyFocusedElement;
  });
}

function getTabbableCandidates(container: HTMLElement | TamaguiElement | null) {
  if (!isWeb || !container) return [];
  const containerHtml = container as HTMLElement;
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(containerHtml, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: HTMLElement & { type?: string }) => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.hasAttribute('disabled') || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);
  return nodes;
}

export { NotificationViewport };
