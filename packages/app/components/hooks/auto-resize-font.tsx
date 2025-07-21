import {
  getComponentsConfig,
  getTokenValue,
  type InputSizes,
  isWeb,
  type TamaguiElement,
  type Token,
} from '@app/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';

interface AutoResizeOptions {
  enabled?: boolean;
  fontScaling?: boolean;
  step?: number;
  size?: InputSizes;
  minRows?: number;
  maxRows?: number;
}

const scaleConfigs: Record<InputSizes, { maxScale: number }> = {
  $600: { maxScale: 0.5 },
  $500: { maxScale: 0.7 },
  $400: { maxScale: 1.0 },
};

function getScaleConfig(size: InputSizes) {
  return scaleConfigs[size] || { maxScale: 1.0 };
}

function extractTypographyValues(prop: 'line-height' | 'font-size', size: string): number {
  const config = getComponentsConfig();
  const componentProps = config.input[size as keyof typeof config.input]?.label?.typography;

  if (!componentProps) {
    return prop === 'line-height' ? 18 : 16;
  }

  const tokenPath = componentProps
    .split('.')
    .slice(prop === 'line-height' ? 0 : 1, -1)
    .join('.');

  const value = getTokenValue(`${prop}.${tokenPath}` as Token, 'typography');
  return value || (prop === 'line-height' ? 18 : 16);
}

function debounce<T extends (...args: never[]) => void>(func: T, delay = 150) {
  let timeoutId: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function isElementOverflowing(element: HTMLTextAreaElement): boolean {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export function useAutoResizeFont(
  inputRef: React.RefObject<TamaguiElement | null>,
  options: AutoResizeOptions = {},
) {
  const { enabled = false, fontScaling = true, size = '$500', step = 0.5, maxRows } = options;

  const initialFontSize = useMemo(() => extractTypographyValues('font-size', size), [size]);
  const lineHeight = useMemo(() => extractTypographyValues('line-height', size), [size]);
  const scale = useMemo(() => getScaleConfig(size), [size]);
  const minFontSize = useMemo(() => scale.maxScale * initialFontSize, [scale, initialFontSize]);

  const [fontSize, setFontSize] = useState(initialFontSize);
  const [text, setText] = useState('');
  const [inputWidth, setInputWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  const adjustElementSize = useCallback(
    (element: HTMLTextAreaElement) => {
      if (!element || typeof window === 'undefined') return;

      const computedStyle = window.getComputedStyle(element);
      const webLineHeight = Number.parseFloat(computedStyle.lineHeight);
      let currentSize = Number.parseFloat(computedStyle.fontSize);

      const minAllowedSize = scale.maxScale * initialFontSize;

      element.style.height = 'auto';
      element.style.wordBreak = 'normal';

      if (fontScaling) {
        if (isElementOverflowing(element)) {
          while (isElementOverflowing(element) && currentSize > minAllowedSize) {
            currentSize -= step;
            element.style.fontSize = `${currentSize}px`;
          }

          if (isElementOverflowing(element) && element.scrollWidth > element.clientWidth) {
            element.style.wordBreak = 'break-all';
          }
        } else {
          while (!isElementOverflowing(element) && currentSize < initialFontSize) {
            currentSize += step;
            element.style.fontSize = `${currentSize}px`;
          }

          if (isElementOverflowing(element)) {
            currentSize -= step;
            element.style.fontSize = `${currentSize}px`;
          }
        }

        element.style.fontSize = currentSize >= initialFontSize ? '' : `${currentSize}px`;
      } else {
        element.style.fontSize = '';
      }

      if (element.scrollHeight > element.clientHeight) {
        const height =
          maxRows && maxRows > 0
            ? Math.min(element.scrollHeight, maxRows * webLineHeight)
            : element.scrollHeight;
        element.style.height = `${height}px`;
      }
    },
    [initialFontSize, maxRows, scale.maxScale, step, fontScaling],
  );

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (inputWidth === 0) {
        setInputWidth(event.nativeEvent.layout.width);
      }
    },
    [inputWidth],
  );

  const handleTextLayout = (e: LayoutChangeEvent) => {
    const newTextWidth = e.nativeEvent.layout.width;
    setTextWidth(newTextWidth);

    if (inputWidth > 0 && newTextWidth > inputWidth && fontSize > minFontSize) {
      setFontSize((prev) => prev - step);
    }
  };

  useEffect(() => {
    if (isWeb || !enabled) return;

    const noOverflowing = inputWidth > 0 && textWidth < inputWidth;
    if (noOverflowing && fontSize < initialFontSize) {
      setFontSize((prev) => prev + step);
    }
  }, [text]);

  useEffect(() => {
    if (!isWeb || !enabled || !inputRef.current || typeof window === 'undefined') return;

    const element = inputRef.current as unknown as HTMLTextAreaElement;
    const debouncedHandler = debounce((event: Event) => {
      if (!(event.target instanceof HTMLTextAreaElement)) return;
      if ('isComposing' in event && event.isComposing) return;
      adjustElementSize(event.target);
    }, 150);

    element.addEventListener('input', debouncedHandler);
    adjustElementSize(element);

    return () => {
      element.removeEventListener('input', debouncedHandler);
      element.style.fontSize = '';
      element.style.height = '';
    };
  }, [enabled, inputRef, adjustElementSize]);

  return isWeb
    ? {}
    : {
        onLayout,
        handleTextLayout,
        fontSize: fontScaling ? fontSize : initialFontSize,
        lineHeight,
        text,
        setText,
      };
}
