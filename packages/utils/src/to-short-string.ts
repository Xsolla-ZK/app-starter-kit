type ToShortStringOptions = {
  startLen?: number;
  endLen?: number;
};

export const toShortString = (
  input: string | undefined | null,
  options: ToShortStringOptions = {},
) => {
  const { startLen = 5, endLen = 3 } = options;

  if (!input) return '';
  if (input.length <= startLen + endLen) return input;

  const start = input.slice(0, startLen);
  const end = input.slice(-endLen);
  return `${start}...${end}`;
};
