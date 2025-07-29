import type { PopoverContentProps, PopperProps } from 'tamagui';

export type TooltipScopes = string;

type ScopedProps<P> = Omit<P, 'scope'> & { scope?: TooltipScopes };

export type TooltipContentProps = ScopedProps<PopoverContentProps>;

export type TooltipProps = ScopedProps<
  PopperProps & {
    open?: boolean;
    unstyled?: boolean;
    children?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    focus?: {
      enabled?: boolean;
      visibleOnly?: boolean;
    };
    groupId?: string;
    restMs?: number;
    delay?:
      | number
      | {
          open?: number;
          close?: number;
        };
    disableAutoCloseOnScroll?: boolean;
  }
>;

export type Delay =
  | number
  | Partial<{
      open: number;
      close: number;
    }>;
