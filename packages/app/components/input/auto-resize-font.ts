import { isWeb, type TamaguiElement } from '@app/ui';
import { useCallback, useEffect } from 'react';

interface AutoResizeOptions {
  enabled?: boolean;
  minSize?: number;
  maxSize?: number; // Важно: для Native это обязательная опция
  step?: number;
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

/**
 * Кросс-платформенный хук для автоматического изменения размера шрифта в TextInput.
 * @param inputRef - Ref на элемент TextInput.
 * @param options - Опции для настройки.
 */
export function useAutoResizeFont(
  inputRef: React.RefObject<TamaguiElement | null>,
  options: AutoResizeOptions = {},
) {
  const { enabled = false, minSize = 10, maxSize = 16, step = 0.5 } = options;

  // --- Логика для Web (без изменений) ---
  const adjustWebFontSize = useCallback((inputElement: HTMLInputElement) => {
    if (!inputElement) return;

    const isOverflowing = (el: HTMLElement): boolean => el.scrollWidth > el.clientWidth;
    let currentSize = Number.parseFloat(window.getComputedStyle(inputElement).fontSize);

    if (isOverflowing(inputElement)) {
      while (isOverflowing(inputElement) && currentSize > minSize) {
        currentSize -= step;
        inputElement.style.fontSize = `${currentSize}px`;
      }
    } else {
      while (!isOverflowing(inputElement) && currentSize < maxSize) {
        currentSize += step;
        inputElement.style.fontSize = `${currentSize}px`;
      }
      if (isOverflowing(inputElement)) {
        currentSize -= step;
        inputElement.style.fontSize = `${currentSize}px`;
      }
    }
    if (Number.parseFloat(inputElement.style.fontSize) >= maxSize) {
      inputElement.style.fontSize = '';
    }
  }, []);

  useEffect(() => {
    if (!isWeb || !enabled) return;

    const inputElement = inputRef.current as HTMLInputElement;
    if (!inputElement) return;

    const handleInput = (event: Event) => {
      if ((event as InputEvent).isComposing) return;
      adjustWebFontSize(event.target as HTMLInputElement);
    };

    const debouncedHandler = debounce(handleInput as () => void, 150);
    inputElement.addEventListener('input', debouncedHandler);
    adjustWebFontSize(inputElement);

    return () => {
      inputElement.removeEventListener('input', debouncedHandler);
    };
  });

  // Эффект для сброса размера шрифта, если хук отключается

  if (isWeb || !enabled) {
    return {}; // Для веба и в выключенном состоянии возвращаем пустой объект
  }
}
