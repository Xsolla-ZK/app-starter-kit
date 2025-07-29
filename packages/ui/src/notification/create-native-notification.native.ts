import type { CreateNativeNotificationsFn, HideNativeNotificationsFn } from './types';

export const createNativeNotification: CreateNativeNotificationsFn = (
  title,
  { message, duration, burntOptions },
) => {
  // import inline to allow lazy usage of native dependecy:
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-imports
  const Burnt = require('burnt') as typeof import('burnt');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  Burnt.toast({
    title,
    message,
    duration: duration ? duration / 1000 : undefined,
    ...burntOptions,
  });
  return true;
};

export const hideNativeNotification: HideNativeNotificationsFn = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-imports
  const Burnt = require('burnt') as typeof import('burnt');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  Burnt.dismissAllAlerts();
};
