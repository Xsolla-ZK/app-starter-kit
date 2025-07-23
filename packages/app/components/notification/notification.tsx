import { AnimatePresence } from '@tamagui/animate-presence';
import type { TamaguiElement } from '@tamagui/core';
import { useEvent } from '@tamagui/core';
import { composeEventHandlers, withStaticProperties } from '@tamagui/helpers';
import { useControllableState } from '@tamagui/use-controllable-state';
import type { ForwardedRef } from 'react';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { NotificationAnnounceExclude } from './announce/notification-announce';
import { useNotificationController } from './imperative/notification-imperative';
import { NotificationImpl, useNotificationInteractiveContext } from './impl/notification-impl';
import { NotificationImplFrame } from './impl/notification-impl.styled';
import type { NotificationExtraProps } from './impl/notification-impl.types';
import {
  NotificationCloseFrame,
  NotificationDescription,
  NotificationTitle,
} from './notification.styled';
import type {
  NotificationActionProps,
  NotificationCloseProps,
  NotificationScopedProps,
} from './notification.types';

const NotificationClose = forwardRef<TamaguiElement, NotificationCloseProps>(
  (props: NotificationScopedProps<NotificationCloseProps>, forwardedRef) => {
    const { __scopeNotification, ...closeProps } = props;
    const interactiveContext = useNotificationInteractiveContext(__scopeNotification);

    return (
      <NotificationAnnounceExclude asChild>
        <NotificationCloseFrame
          aria-label="Dialog Close"
          {...closeProps}
          ref={forwardedRef}
          onPress={composeEventHandlers(props.onPress, interactiveContext.onClose)}
        />
      </NotificationAnnounceExclude>
    );
  },
);

const NotificationAction = forwardRef<
  TamaguiElement,
  NotificationScopedProps<NotificationActionProps>
>((props, forwardedRef) => {
  const { altText, ...actionProps } = props;
  if (!altText) return null;
  return (
    <NotificationAnnounceExclude altText={altText} asChild>
      <NotificationClose {...actionProps} ref={forwardedRef} />
    </NotificationAnnounceExclude>
  );
});

const NotificationComponent = NotificationImplFrame.styleable<NotificationExtraProps>(
  forwardRef((props, forwardedRef: ForwardedRef<TamaguiElement>) => {
    const {
      id,
      duration,
      open: openProp,
      defaultOpen,
      onOpenChange,
      size = '$500',
      title,
      description,
      ...toastProps
    } = props;

    const [open, _setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? true,
      onChange: onOpenChange,
      strategy: 'most-recent-wins',
    });

    const { hide } = useNotificationController();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resumeTimeRef = useRef(Date.now());
    const remainingTimeRef = useRef(duration ?? 0); // <-- ИСПРАВЛЕНИЕ

    const handleHide = useCallback(() => {
      if (id) {
        hide(id);
      }
    }, [id, hide]);

    const onPause = useEvent(props.onPause);
    const onResume = useEvent(props.onResume);

    const handlePause = useCallback(() => {
      onPause();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        remainingTimeRef.current -= Date.now() - resumeTimeRef.current;
      }
    }, [onPause]);

    const handleResume = useCallback(() => {
      onResume();
      if (remainingTimeRef.current > 0 && duration !== Number.POSITIVE_INFINITY) {
        resumeTimeRef.current = Date.now();
        timerRef.current = setTimeout(handleHide, remainingTimeRef.current);
      }
    }, [onResume, handleHide, duration]);

    useEffect(() => {
      if (open) {
        handleResume();
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [open, handleResume]);
    console.log('title', title);
    console.log('description', description);
    console.log('open', open);
    return (
      <AnimatePresence>
        {open ? (
          <NotificationImpl
            id={id}
            open={open}
            size={size}
            {...toastProps}
            ref={forwardedRef}
            onClose={handleHide}
            onPause={handlePause}
            onResume={handleResume}
            onSwipeEnd={composeEventHandlers(props.onSwipeEnd, handleHide)}
          >
            damjdandandandanadnadnadnddnadanandadnndandananadnadnadnadnndanad
          </NotificationImpl>
        ) : null}
      </AnimatePresence>
    );
  }),
);

export const Notification = withStaticProperties(NotificationComponent, {
  Title: NotificationTitle,
  Description: NotificationDescription,
  Action: NotificationAction,
  Close: NotificationClose,
});
