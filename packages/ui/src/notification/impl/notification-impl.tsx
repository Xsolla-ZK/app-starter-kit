/* eslint-disable max-lines */
import { useIsPresent } from '@tamagui/animate-presence';
import { useComposedRefs } from '@tamagui/compose-refs';
import { isWeb } from '@tamagui/constants';
import type { TamaguiElement } from '@tamagui/core';
import {
  createStyledContext,
  Stack,
  Theme,
  useConfiguration,
  useEvent,
  useThemeName,
} from '@tamagui/core';
import { Dismissable } from '@tamagui/dismissable';
import { composeEventHandlers } from '@tamagui/helpers';
import { PortalItem } from '@tamagui/portal';
import {
  NOTIFICATION_CONTEXT,
  NOTIFICATION_VIEWPORT_PAUSE,
  NOTIFICATION_VIEWPORT_RESUME,
} from '@xsolla-zk/constants';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Animated, PanResponderGestureState } from 'react-native';
import { PanResponder } from 'react-native';
import { NotificationAnnounce } from '../announce/notification-announce';
import type { NotificationScopedProps, NotificationSizes } from '../notification.types';
import { Collection, useNotificationProviderContext } from '../provider/notification-provider';
import type { SwipeDirection } from '../provider/notification-provider.types';
import { NotificationImplFrame } from './notification-impl.styled';
import type { NotificationImplProps } from './notification-impl.types';

const {
  Provider: NotificationInteractiveProvider,
  useStyledContext: useNotificationInteractiveContext,
} = createStyledContext({
  onClose: () => {},
  size: '$500' as NotificationSizes,
});

const NotificationImpl = forwardRef<TamaguiElement, NotificationImplProps>(
  (props: NotificationScopedProps<NotificationImplProps>, forwardedRef) => {
    const {
      __scopeNotification,
      type = 'foreground',
      duration: durationProp,
      open,
      onClose,
      onEscapeKeyDown,
      onPause,
      onResume,
      onSwipeStart,
      onSwipeMove,
      onSwipeCancel,
      onSwipeEnd,
      viewportName = 'default',
      ...toastProps
    } = props;
    const isPresent = useIsPresent();
    const context = useNotificationProviderContext(__scopeNotification);
    const [node, setNode] = useState<TamaguiElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, setNode);
    const duration = durationProp || context.duration;
    const closeTimerStartTimeRef = useRef(0);
    const closeTimerRemainingTimeRef = useRef(duration);
    const closeTimerRef = useRef(0);
    const { onNotificationAdd, onNotificationRemove } = context;

    const viewport = useMemo(
      () => context.viewports[viewportName] as HTMLElement | null | undefined,
      [context.viewports, viewportName],
    );

    const handleClose = useEvent(() => {
      if (!isPresent) {
        // already removed from the react tree
        return;
      }
      // focus viewport if focus is within toast to read the remaining toast
      // count to SR users and ensure focus isn't lost
      if (isWeb) {
        const isFocusInNotification = (node as HTMLDivElement)?.contains(document.activeElement);
        if (isFocusInNotification) viewport?.focus();
      }
      onClose();
    });

    const startTimer = useCallback(
      (duration: number) => {
        if (!duration || duration === Number.POSITIVE_INFINITY) return;
        clearTimeout(closeTimerRef.current);
        closeTimerStartTimeRef.current = new Date().getTime();
        closeTimerRef.current = setTimeout(handleClose, duration) as unknown as number;
      },
      [handleClose],
    );

    const handleResume = useCallback(() => {
      startTimer(closeTimerRemainingTimeRef.current);
      onResume?.();
    }, [onResume, startTimer]);

    const handlePause = useCallback(() => {
      const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;
      closeTimerRemainingTimeRef.current = closeTimerRemainingTimeRef.current - elapsedTime;
      window.clearTimeout(closeTimerRef.current);
      onPause?.();
    }, [onPause]);

    useEffect(() => {
      if (!isWeb) return;

      if (viewport) {
        viewport.addEventListener(NOTIFICATION_VIEWPORT_PAUSE, handlePause);
        viewport.addEventListener(NOTIFICATION_VIEWPORT_RESUME, handleResume);
        return () => {
          viewport.removeEventListener(NOTIFICATION_VIEWPORT_PAUSE, handlePause);
          viewport.removeEventListener(NOTIFICATION_VIEWPORT_RESUME, handleResume);
        };
      }
    }, [viewport, duration, onPause, onResume, startTimer]);

    // start timer when toast opens or duration changes.
    // we include `open` in deps because closed !== unmounted when animating
    // so it could reopen before being completely unmounted
    useEffect(() => {
      if (open && !context.isClosePausedRef.current) {
        startTimer(duration);
      }
    }, [open, duration, context.isClosePausedRef, startTimer]);

    useEffect(() => {
      onNotificationAdd();
      return () => onNotificationRemove();
    }, [onNotificationAdd, onNotificationRemove]);

    const announceTextContent = useMemo(() => {
      if (!isWeb) return null;
      return node ? getAnnounceTextContent(node as HTMLDivElement) : null;
    }, [node]);

    const isHorizontalSwipe = ['left', 'right', 'horizontal'].includes(context.swipeDirection);

    const { animationDriver } = useConfiguration();
    if (!animationDriver) {
      throw new Error('Must set animations in tamagui.config.ts');
    }

    const { useAnimatedNumber, useAnimatedNumberStyle } = animationDriver;

    const animatedNumber = useAnimatedNumber(0);

    // @ts-ignore: temp until reanimated useAnimatedNumber fix
    const AnimatedView = (animationDriver['NumberView'] ??
      animationDriver.View ??
      Stack) as typeof Animated.View;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const animatedStyles = useAnimatedNumberStyle(animatedNumber, (val) => {
      'worklet';
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        transform: [isHorizontalSwipe ? { translateX: val } : { translateY: val }],
      };
    });

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponder: (e, gesture) => {
            const shouldMove = shouldGrantGestureMove(context.swipeDirection, gesture);
            if (shouldMove) {
              onSwipeStart?.(e);
              return true;
            }
            return false;
          },
          onPanResponderGrant: (e) => {
            if (!isWeb) {
              handlePause?.();
            }
          },
          onPanResponderMove: (e, gesture) => {
            const { x, y } = getGestureDistance(context.swipeDirection, gesture);
            const delta = { x, y };
            animatedNumber.setValue(isHorizontalSwipe ? x : y, { type: 'direct' });
            if (isDeltaInDirection(delta, context.swipeDirection, context.swipeThreshold)) {
              onSwipeEnd?.(e);
            }
            onSwipeMove?.(e);
          },
          onPanResponderEnd: (e, { dx, dy }) => {
            if (
              !isDeltaInDirection({ x: dx, y: dy }, context.swipeDirection, context.swipeThreshold)
            ) {
              if (!isWeb) {
                handleResume?.();
              }
              onSwipeCancel?.(e);
              animatedNumber.setValue(0, { type: 'spring' });
            }
          },
        }),
      [handlePause, handleResume],
    );

    // need to get the theme name from context and apply it again since portals don't retain the theme
    const themeName = useThemeName();

    return (
      <>
        {announceTextContent && (
          <NotificationAnnounce
            __scopeNotification={__scopeNotification}
            // Notifications are always role=status to avoid stuttering issues with role=alert in SRs.
            role="status"
            aria-live={type === 'foreground' ? 'assertive' : 'polite'}
            aria-atomic
          >
            {announceTextContent}
          </NotificationAnnounce>
        )}

        <PortalItem hostName={viewportName ?? 'default'}>
          <NotificationInteractiveProvider
            key={props.id}
            scope={__scopeNotification}
            size={toastProps.size}
            onClose={() => {
              handleClose();
            }}
          >
            <Dismissable
              // asChild
              onEscapeKeyDown={composeEventHandlers(onEscapeKeyDown, () => {
                if (!context.isFocusedNotificationEscapeKeyDownRef.current) {
                  handleClose();
                }
                context.isFocusedNotificationEscapeKeyDownRef.current = false;
              })}
            >
              <Theme forceClassName name={themeName}>
                <AnimatedView
                  {...panResponder?.panHandlers}
                  style={[{ margin: 'auto', maxWidth: '100%' }, animatedStyles]}
                >
                  <Collection.ItemSlot
                    __scopeCollection={__scopeNotification || NOTIFICATION_CONTEXT}
                  >
                    <NotificationImplFrame
                      // Ensure toasts are announced as status list or status when focused
                      role="status"
                      aria-live="off"
                      aria-atomic
                      data-state={open ? 'open' : 'closed'}
                      data-swipe-direction={context.swipeDirection}
                      pointerEvents="auto"
                      touchAction="none"
                      userSelect="none"
                      {...toastProps}
                      {...(isWeb && {
                        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                          if (event.key !== 'Escape') return;
                          onEscapeKeyDown?.(event);
                          onEscapeKeyDown?.(event);
                          if (!event.defaultPrevented) {
                            context.isFocusedNotificationEscapeKeyDownRef.current = true;
                            handleClose();
                          }
                        }),
                      })}
                    />
                  </Collection.ItemSlot>
                </AnimatedView>
              </Theme>
            </Dismissable>
          </NotificationInteractiveProvider>
        </PortalItem>
      </>
    );
  },
);

/* ---------------------------------------------------------------------------------------------- */

function isDeltaInDirection(
  delta: { x: number; y: number },
  direction: SwipeDirection,
  threshold = 0,
) {
  const deltaX = Math.abs(delta.x);
  const deltaY = Math.abs(delta.y);
  const isDeltaX = deltaX > deltaY;
  if (direction === 'left' || direction === 'right' || direction === 'horizontal') {
    return isDeltaX && deltaX > threshold;
  }
  return !isDeltaX && deltaY > threshold;
}

function getAnnounceTextContent(container: HTMLElement) {
  if (!isWeb) return '';
  const textContent: string[] = [];
  const childNodes = Array.from(container.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent) textContent.push(node.textContent);
    if (isHTMLElement(node)) {
      const isHidden = node.ariaHidden || node.hidden || node.style.display === 'none';
      const isExcluded = node.dataset.toastAnnounceExclude === '';

      if (!isHidden) {
        if (isExcluded) {
          const altText = node.dataset.toastAnnounceAlt;
          if (altText) textContent.push(altText);
        } else {
          textContent.push(...getAnnounceTextContent(node));
        }
      }
    }
  });

  // We return a collection of text rather than a single concatenated string.
  // This allows SR VO to naturally pause break between nodes while announcing.
  return textContent;
}

function isHTMLElement(node: ChildNode): node is HTMLElement {
  return node.nodeType === node.ELEMENT_NODE;
}

const GESTURE_GRANT_THRESHOLD = 10;

function shouldGrantGestureMove(dir: SwipeDirection, { dx, dy }: PanResponderGestureState) {
  if ((dir === 'horizontal' || dir === 'left') && dx < -GESTURE_GRANT_THRESHOLD) {
    return true;
  }
  if ((dir === 'horizontal' || dir === 'right') && dx > GESTURE_GRANT_THRESHOLD) {
    return true;
  }
  if ((dir === 'vertical' || dir === 'up') && dy > -GESTURE_GRANT_THRESHOLD) {
    return true;
  }
  if ((dir === 'vertical' || dir === 'down') && dy < GESTURE_GRANT_THRESHOLD) {
    return true;
  }

  return false;
}

function getGestureDistance(dir: SwipeDirection, { dx, dy }: PanResponderGestureState) {
  let y = 0;
  let x = 0;

  if (dir === 'horizontal') x = dx;
  else if (dir === 'left') x = Math.min(0, dx);
  else if (dir === 'right') x = Math.max(0, dx);
  else if (dir === 'vertical') y = dy;
  else if (dir === 'up') y = Math.min(0, dy);
  else if (dir === 'down') y = Math.max(0, dy);

  return {
    x,
    y,
  };
}

export { NotificationImpl, useNotificationInteractiveContext };
