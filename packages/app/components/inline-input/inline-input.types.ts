import type { ComponentsConfig } from '@app/ui';
import type { GetProps } from '@tamagui/core';
import type { InlineInputElement } from './inline-input.styled';

export type InlineInputSizes = keyof ComponentsConfig['inlineInput'] | (string & {});

export type InlineInputProps = GetProps<typeof InlineInputElement>;
