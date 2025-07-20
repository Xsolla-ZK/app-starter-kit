import type { TamaguiElement } from '@app/ui';
import { useChildrenArray, useComposedRefs, withStaticProperties } from '@app/ui';
import { useControllableState } from '@tamagui/use-controllable-state';
import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef, isValidElement, useMemo, useRef } from 'react';
import { useAutoResizeFont } from '../hooks';
import { createInput } from './create-input';
import {
  InputContext,
  InputElement,
  InputEndSlot,
  InputFrame,
  InputStartSlot,
} from './input.styled';
import type { InputProps } from './input.types';

const InputBase = createInput(InputElement);

const InputComponent = InputBase.styleable<InputProps>(
  forwardRef((_props: InputProps, forwardedRef: ForwardedRef<TamaguiElement>) => {
    const {
      size = '$500',
      frameStyles,
      disabled,
      children,
      error,
      onFocus,
      onBlur,
      isFocused,
      maxRows,
      onFocusChange,
      autoResize,
      fontScaling,
      ...props
    } = _props;

    const childrenArray = useChildrenArray(children);
    const [focused, setFocused] = useControllableState({
      prop: isFocused,
      defaultProp: false,
      onChange: onFocusChange,
    });

    const ref = useRef<TamaguiElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const isInteractingWithFrame = useRef(false);

    // 🧠 Получаем autoResizeProps
    useAutoResizeFont(ref, {
      enabled: autoResize,
      fontScaling: fontScaling,
      size,
      maxRows,
    });

    const { startSlot, endSlot } = useMemo(() => {
      let start: ReactElement | null = null;
      let end: ReactElement | null = null;

      childrenArray.forEach((child) => {
        if (isValidElement(child)) {
          if (child.type === InputStartSlot && !start) {
            start = child;
          } else if (child.type === InputEndSlot && !end) {
            end = child;
          }
        }
      });

      return { startSlot: start, endSlot: end };
    }, [childrenArray]);

    return (
      <InputFrame
        size={size}
        focused={!props.readOnly ? focused : false}
        disabled={disabled}
        theme={props.readOnly ? 'readonly' : error ? 'error' : undefined}
        isTextarea={props.tag === 'textarea'}
        onPressIn={() => {
          isInteractingWithFrame.current = true;
        }}
        onPressOut={() => {
          isInteractingWithFrame.current = false;
        }}
        onPress={() => {
          if (!props.readOnly) {
            ref.current?.focus();
          }
        }}
        {...frameStyles}
      >
        {startSlot}
        <InputBase
          {...(!props.readOnly
            ? {
                onFocus: (e) => {
                  setFocused(true);
                  onFocus?.(e);
                },
                onBlur: (e) => {
                  if (!isInteractingWithFrame.current) {
                    setFocused(false);
                    onBlur?.(e);
                  }
                },
              }
            : {})}
          {...props}
          ref={composedRefs}
        />
        {endSlot}
      </InputFrame>
    );
  }),
  {
    disableTheme: true,
  },
);

export const Input = withStaticProperties(InputComponent, {
  Props: InputContext.Provider,
  StartSlot: InputStartSlot,
  EndSlot: InputEndSlot,
});
