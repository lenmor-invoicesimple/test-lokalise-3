import { useIntl as useReactIntl } from 'react-intl';

import { titleize, titleizeAll } from './utils';
import { FormatMessageValues, MessageArgs, MessageDescriptor } from './types';

export function useIntl() {
  const intl = useReactIntl();

  const formatMessage = (
    descriptor: MessageDescriptor,
    values?: FormatMessageValues,
    options?: MessageArgs[2]
  ) => intl.formatMessage(descriptor, values, options);

  const formatMessageTitleized = (
    descriptor: MessageDescriptor,
    values?: FormatMessageValues,
    options?: MessageArgs[2]
  ) => titleize(formatMessage(descriptor, values, options));

  const formatMessageTitleizedAll = (
    descriptor: MessageDescriptor,
    values?: FormatMessageValues,
    options?: MessageArgs[2]
  ) => titleizeAll(formatMessage(descriptor, values, options));

  // Remove formatMessage from the returned object
  // so devs don't accidentally use it instead of f
  const { formatMessage: _, ...rest } = intl;
  const country = intl.locale.split('-')[1];

  return {
    ...rest,
    /**
     * The country code derived from the locale
     */
    country,
    f: formatMessage,
    ft: formatMessageTitleized,
    fta: formatMessageTitleizedAll
  };
}
