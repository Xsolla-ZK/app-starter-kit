import type { VisuallyHidden } from '../notification.styled';
import type { NotificationScopedProps } from '../notification.types';
import type { NotificationAnnounceExcludeFrame } from './notification-announce.styled';
import type { GetProps } from '@tamagui/core';

type NotificationAnnounceExcludeFrameProps = GetProps<typeof NotificationAnnounceExcludeFrame>;

export type NotificationAnnounceExcludeProps = NotificationAnnounceExcludeFrameProps & {
  altText?: string;
};

export interface NotificationAnnounceProps
  extends Omit<GetProps<typeof VisuallyHidden>, 'children'>,
    NotificationScopedProps<{ children: string[] }> {}
