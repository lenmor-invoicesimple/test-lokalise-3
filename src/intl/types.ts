import { IntlFormatters, IntlShape, PrimitiveType } from 'react-intl';

import messages from '@/locales/en.json';

export type MessageKeys = keyof typeof messages;
export type MessageArgs = Parameters<IntlFormatters['formatMessage']>;
export type MessageDescriptor = {
  id: MessageKeys;
};

export interface IsIntlShape extends Omit<IntlShape, 'formatMessage'> {
  f: (
    descriptor: MessageDescriptor,
    values?: FormatMessageValues,
    options?: MessageArgs[2]
  ) => string;
  ft: (
    descriptor: MessageDescriptor,
    values?: FormatMessageValues,
    options?: MessageArgs[2]
  ) => string;
  fta: (
    descriptor: MessageDescriptor,
    values?: FormatMessageValues,
    options?: MessageArgs[2]
  ) => string;
}

/**
 * Type extracted from 2nd parameter of intl.formatMessage package.
 * Gives us type safety when rendering html elements through formatMessage.
 */
type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;

export type FormatMessageValues =
  | Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  | undefined;
