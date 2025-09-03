'use client';

import { MessageFormatElement, IntlProvider as ReactIntlProvider } from 'react-intl';

interface Props {
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
  locale: string;
  children: React.ReactNode;
}

export const IntlProvider = (props: Props) => {
  return (
    <ReactIntlProvider messages={props.messages} locale={props.locale}>
      {props.children}
    </ReactIntlProvider>
  );
};
