import {
  getComponentsConfig,
  getTokenValue,
  type InputSizes,
  isWeb,
  type TamaguiElement,
  type Token,
} from '@app/ui';
import { useCallback, useEffect, useMemo } from 'react';

interface AutoResizeOptions {
  enabled?: boolean;
  step?: number;
  size?: InputSizes;
  minRows?: number;
  maxRows?: number;
}

function getScaleConfig(size: string) {
  const scaleConfigs = {
    $600: { maxScale: 0.5 },
    $500: { maxScale: 0.7 },
    $400: { maxScale: 1.0 },
  };
  return scaleConfigs[size as keyof typeof scaleConfigs] || { maxScale: 1.0 };
}

function extractTypographyValues(size: string) {
  const config = getComponentsConfig();
  const componentProps = config.input[size as keyof typeof config.input].label.typography;
  if (!componentProps) {
    return 16;
  }
  return getTokenValue(
    `line-height.${componentProps?.split('.').slice(0, -1).join('.')}` as Token,
    'typography',
  );
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

export function useAutoResizeFont(
  inputRef: React.RefObject<TamaguiElement | null>,
  options: AutoResizeOptions = {},
) {
  const { enabled = false, size = '$500', step = 0.5, maxRows } = options;

  const maxSize = useMemo(() => extractTypographyValues(size), [size]);
  const scale = useMemo(() => getScaleConfig(size), [size]);

  const adjustWebFontSize = useCallback(
    (element: HTMLTextAreaElement) => {
      if (!element) return;

      const computedStyle = window.getComputedStyle(element);
      let currentSize = Number.parseFloat(computedStyle.fontSize);
      const lineHeight = Number.parseFloat(computedStyle.lineHeight);
      const minAllowedSize = scale.maxScale * maxSize;

      const isOverflowing = (): boolean =>
        element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

      element.style.height = 'auto';
      element.style.wordBreak = 'normal';

      if (isOverflowing()) {
        while (isOverflowing() && currentSize > minAllowedSize) {
          currentSize -= step;
          element.style.fontSize = `${currentSize}px`;
        }

        if (isOverflowing()) {
          if (element.scrollWidth > element.clientWidth) {
            element.style.wordBreak = 'break-all';
          }
          if (element.scrollHeight > element.clientHeight) {
            if (maxRows && maxRows > 0) {
              const maxHeight = maxRows * lineHeight;
              element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
            } else {
              element.style.height = `${element.scrollHeight}px`;
            }
          }
        }
      } else {
        while (!isOverflowing() && currentSize < maxSize) {
          currentSize += step;
          element.style.fontSize = `${currentSize}px`;
        }
        if (isOverflowing()) {
          currentSize -= step;
          element.style.fontSize = `${currentSize}px`;
        }
      }

      if (currentSize >= maxSize) {
        element.style.fontSize = '';
      } else {
        element.style.fontSize = `${currentSize}px`;
      }
    },
    [maxSize, maxRows, scale, step],
  );

  useEffect(() => {
    if (!isWeb || !enabled || !inputRef.current) {
      return;
    }

    const element = inputRef.current as HTMLTextAreaElement;

    const debouncedHandler = debounce((event: Event) => {
      if ((event as InputEvent).isComposing) return;
      adjustWebFontSize(event.target as HTMLTextAreaElement);
    }, 150);

    element.addEventListener('input', debouncedHandler);

    adjustWebFontSize(element);

    return () => {
      element.removeEventListener('input', debouncedHandler);
    };
  }, [enabled, inputRef, adjustWebFontSize]);
}
