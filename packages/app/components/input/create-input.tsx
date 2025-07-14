import type { TamaguiComponent, TamaguiElement } from '@app/ui';
import {
  type GetProps,
  getComponentsConfig,
  getTokenValue,
  isWeb,
  type Token,
  useComposedRefs,
  useTheme,
} from '@app/ui';
import { registerFocusable, useFocusable } from '@tamagui/focusable';
import type { ForwardedRef, KeyboardEvent, RefObject } from 'react';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import type {
  ColorValue,
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  TextInputSubmitEditingEventData,
} from 'react-native';
import type { InputElementBaseProps, InputElementProps } from './input.types';

export function createInput<T extends TamaguiComponent>(Element: T) {
  return Element.styleable<GetProps<T>>(
    forwardRef((_props: InputElementProps, forwardedRef: ForwardedRef<TamaguiElement>) => {
      const Component = Element as unknown as TamaguiComponent<InputElementBaseProps>;
      const ref = useRef<TextInput>(null);
      const config = getComponentsConfig();

      const composedRefs = useComposedRefs(forwardedRef, ref);

      const { size = '$500', id, height, ...restProps } = _props;

      const { inputProps, multilineProps, rows } = useInputProps(restProps, ref);

      const componentProps = config.input[size as keyof typeof config.input];

      const calculatedHeight = useMemo(() => {
        if (height !== undefined) {
          return height;
        }

        if (rows) {
          const LINE_HEIGHT = getTokenValue(
            `line-height.${componentProps?.label?.typography?.split('.').slice(0, -1).join('.')}` as Token,
            'typography',
          );

          return rows * LINE_HEIGHT;
        }
        //return default height
        return undefined;
      }, [height, rows]);

      useEffect(() => {
        if (!id || !inputProps.editable) return;
        return registerFocusable(id, {
          focusAndSelect: () => {
            ref.current?.focus();
          },
          focus: () => {},
        });
      }, [id, inputProps.editable]);

      return (
        <Component
          height={isWeb ? undefined : calculatedHeight}
          id={id}
          size={size}
          {...inputProps}
          {...multilineProps}
          ref={composedRefs}
        />
      );
    }),
    { disableTheme: true },
  );
}

function useInputProps(props: InputElementProps, ref: RefObject<TextInput | null>) {
  const {
    type,
    onKeyDown,
    autoFocus,
    disabled,
    placeholderTextColor: placeholderProp,
    rows,
    minRows = 1,
    maxRows,
    onPaste,
    ...rest
  } = props;

  const theme = useTheme();
  const focusable = useFocusable({
    props,
    ref,
    isInput: true,
  });

  // const [text, setText] = useState('');
  // const [previousText, setPreviousText] = useState('');

  // useEffect(() => {
  //   if (text !== previousText) {
  //     // Check if the change is due to pasting (length difference is significant)
  //     if (Math.abs(text.length - previousText.length) > 1) {
  //       // Handle paste event
  //       console.log('Text pasted:', text);
  //     }
  //     setPreviousText(text);
  //   }
  // }, [text, previousText]);

  // placeholderTextColor
  const placeholderTextColor = useMemo(
    () =>
      (theme[placeholderProp as keyof typeof theme]?.get() ??
        placeholderProp ??
        theme.placeholderColor?.get()) as ColorValue,
    [placeholderProp, theme],
  );

  // keyboardType по type
  const keyboardType = useMemo<NonNullable<InputElementProps['keyboardType']>>(() => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'tel':
        return 'phone-pad';
      case 'url':
        return 'url';
      case 'search':
        return 'web-search';
      case 'number':
      case 'numeric':
        return 'numeric';
      case 'decimal':
        return 'decimal-pad';
      default:
        return 'default';
    }
  }, [type]);

  const multiline = Boolean(rows || minRows > 1);
  const numberOfLines = rows || Math.max(minRows, 1);

  const inputProps = useMemo<InputElementBaseProps>(() => {
    const handlers = onKeyDown
      ? {
          onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            onKeyDown(e as unknown as KeyboardEvent<HTMLInputElement>);
          },

          onSubmitEditing: (
            e:
              | NativeSyntheticEvent<TextInputSubmitEditingEventData>
              | KeyboardEvent<HTMLInputElement>,
          ) => {
            if ('key' in e.nativeEvent && e.nativeEvent.key === 'Enter') {
              onKeyDown(e as KeyboardEvent<HTMLInputElement>);
              return;
            }

            if (!('key' in e.nativeEvent)) {
              const syntheticEvent = { key: 'Enter' } as KeyboardEvent<HTMLInputElement>;
              onKeyDown(syntheticEvent);
            }
          },
        }
      : {};

    return {
      ref: focusable.ref,

      // editable ↔ disabled
      editable: !disabled,

      // placeholder
      placeholderTextColor,

      // password ↔ secureTextEntry
      secureTextEntry: type === 'password',

      // inputMode - keyboardType
      keyboardType,

      // rows - numberOfLines
      multiline,
      numberOfLines,
      tag: multiline ? 'textarea' : undefined,

      // autoFocus
      autoFocus,
      onChangeText: focusable.onChangeText,
      ...handlers,
      ...rest,
    };
  }, [
    focusable,
    disabled,
    placeholderTextColor,
    type,
    keyboardType,
    multiline,
    numberOfLines,
    autoFocus,
    onKeyDown,
  ]);

  const finalInputProps = useMemo(() => ({ ...inputProps, ...rest }), [inputProps, rest]);

  const multilineProps = useMemo(
    () =>
      multiline
        ? {
            tag: 'textarea',
            rows,
            minRows,
            maxRows,
            ...(!isWeb ? { flexWrap: 'wrap' } : {}),
            overflowX: 'hidden',
            whiteSpace: 'pre-wrap',
            width: '100%',
            style: {
              wordBreak: 'break-word',
              resize: 'none',
            } as const,
          }
        : {},
    [multiline, rows, minRows, maxRows],
  );

  return { inputProps: finalInputProps, multilineProps, rows };
}
