import {
  getComponentsConfig,
  getTokenValue,
  type InputSizes,
  isWeb,
  type TamaguiElement,
  type Token,
} from '@app/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';

interface AutoResizeOptions {
  enabled?: boolean;
  fontScaling?: boolean;
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

function extractTypographyValues(prop: 'line-height' | 'font-size', size: string) {
  const config = getComponentsConfig();
  const componentProps = config.input[size as keyof typeof config.input].label.typography;
  if (!componentProps) {
    return prop === 'line-height' ? 18 : 16;
  }
  const tokenPath = componentProps
    ?.split('.')
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

export function useAutoResizeFont(
  inputRef: React.RefObject<TamaguiElement | null>,
  options: AutoResizeOptions = {},
) {
  const { enabled = false, fontScaling = true, size = '$500', step = 0.5, maxRows } = options;
  const initialFontSize = useMemo(() => extractTypographyValues('font-size', size), [size]);
  const lineHeight = useMemo(() => extractTypographyValues('line-height', size), [size]);
  const scale = useMemo(() => getScaleConfig(size), [size]);
  const minFontSize = useMemo(() => scale.maxScale * initialFontSize, [scale, initialFontSize]);
  const [rnStyle, setRnStyle] = useState({
    fontSize: initialFontSize,
    height: lineHeight as number | 'auto',
  });
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    console.log('width', width);
    console.log('height', height);
    setLayout({ width, height });
  }, []);

  const handleContentSizeChange = useCallback(
    (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      if (!enabled || layout.width === 0) return;

      const { contentSize } = event.nativeEvent;
      console.log('contentSize', contentSize);
      let newFontSize = rnStyle.fontSize;

      if (fontScaling && contentSize.width > layout.width) {
        const overflowRatio = layout.width / contentSize.width;
        newFontSize = Math.max(rnStyle.fontSize * overflowRatio, minFontSize);
      }

      let newHeight: number | 'auto' = 'auto';
      const maxHeight = maxRows ? maxRows * lineHeight : undefined;

      if (maxHeight && contentSize.height > maxHeight) {
        newHeight = maxHeight;
      } else {
        newHeight = Math.max(contentSize.height, lineHeight);
      }

      setRnStyle({ fontSize: newFontSize, height: newHeight });
    },
    [
      enabled,
      fontScaling,
      layout.width,
      lineHeight,
      minFontSize,
      initialFontSize,
      maxRows,
      rnStyle.fontSize,
    ],
  );

  const adjustElementSize = useCallback(
    (element: HTMLTextAreaElement) => {
      if (!element) return;

      const computedStyle = window.getComputedStyle(element);
      const webLineHeight = Number.parseFloat(computedStyle.lineHeight);

      if (fontScaling) {
        let currentSize = Number.parseFloat(computedStyle.fontSize);
        const minAllowedSize = scale.maxScale * initialFontSize;

        const isOverflowing = (): boolean =>
          element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

        element.style.height = 'auto';
        element.style.wordBreak = 'normal';

        if (isOverflowing()) {
          while (isOverflowing() && currentSize > minAllowedSize) {
            currentSize -= step;
            element.style.fontSize = `${currentSize}px`;
          }
          if (isOverflowing() && element.scrollWidth > element.clientWidth) {
            element.style.wordBreak = 'break-all';
          }
        } else {
          while (!isOverflowing() && currentSize < initialFontSize) {
            currentSize += step;
            element.style.fontSize = element.style.fontSize = `${currentSize}px`;
          }
          if (isOverflowing()) {
            currentSize -= step;
            `${currentSize}px`;
          }
        }

        if (currentSize >= initialFontSize) {
          element.style.fontSize = '';
        } else {
          element.style.fontSize = element.style.fontSize = `${currentSize}px`;
        }
      } else {
        element.style.fontSize = '';
      }

      element.style.height = 'auto';
      if (element.scrollHeight > element.clientHeight) {
        if (maxRows && maxRows > 0) {
          const maxHeight = maxRows * webLineHeight;
          element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
        } else {
          element.style.height = `${element.scrollHeight}px`;
        }
      }
    },
    [initialFontSize, maxRows, scale, step, fontScaling],
  );

  useEffect(() => {
    if (!isWeb || !enabled || !inputRef.current) return;

    const element = inputRef.current as unknown as HTMLTextAreaElement;
    if (!element) return;

    const debouncedHandler = debounce((event: Event) => {
      // 1. Проверяем, что цель события — это действительно HTMLTextAreaElement
      const target = event.target;
      if (!(target instanceof HTMLTextAreaElement)) {
        return;
      }

      if ('isComposing' in event && event.isComposing) {
        return;
      }

      adjustElementSize(target);
    }, 150);

    element.addEventListener('input', debouncedHandler);
    adjustElementSize(element);

    return () => {
      element.removeEventListener('input', debouncedHandler);
      if (element.style) {
        element.style.fontSize = '';
        element.style.height = '';
      }
    };
  }, [enabled, inputRef, adjustElementSize]);

  if (isWeb) {
    return {};
  }

  return {
    style: enabled ? rnStyle : { fontSize: initialFontSize, height: 'auto' },
    handleLayout,
    handleContentSizeChange,
  };
}
