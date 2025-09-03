import { cache } from 'react';
import { cookies, headers } from 'next/headers';

import { createIntl } from '@formatjs/intl';

import { FormatMessageValues, MessageArgs, MessageDescriptor } from '../intl/types';
import { defaultLocale, findBestMatchingLocale, titleize, titleizeAll } from './utils';

export type IntlFunction = (
  descriptor: MessageDescriptor,
  values?: FormatMessageValues,
  options?: MessageArgs[2]
) => string;

/**
 * If the locale is not a string, returns the default locale.
 * If the locale is a string, returns the locale in the format xx-XX.
 */
export const normalizeLocale = (originalLocale = defaultLocale): string => {
  if (typeof originalLocale !== 'string') {
    return defaultLocale;
  }

  const normalized = originalLocale.replace('_', '-');
  const chunks = normalized.split('-');

  if (chunks[1]) {
    chunks[1] = chunks[1].toUpperCase();
  }

  return chunks.join('-');
};

// FETCH FROM PARSE
export async function getParseLanguageSetting() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  return locale || defaultLocale;
};

export async function getIntl() {
  const nextHeaders = await headers();
  const acceptLanguage = nextHeaders.get('Accept-Language');
  //   const pathname = nextHeaders.get('x-pathname');


  // Determine the locale in order of priority
  const matchedLocale = findBestMatchingLocale(acceptLanguage || defaultLocale);
  const parseLanguageSetting = await getParseLanguageSetting();

  console.log(">>> matchedLocale: ", matchedLocale)
  console.log(">>> parseLanguageSetting: ", parseLanguageSetting)
  // const parseLanguageSetting = 'en'
  const locale = parseLanguageSetting ?? matchedLocale;

  /**
   * Overrides the locale if the path is a localized app path IE /nl/factuur-maken.
   * This is used for the localized app paths for SEO content.
   */
  //   const overrideLocale = isLocalizedAppPath(pathname)
  //     ? getLocaleFromLocalizedAppPath(pathname)
  //     : null;
  const overrideLocale = null

  const finalLocale = overrideLocale || locale;
  const normalizedLocale = normalizeLocale(finalLocale);

  //   const [parseCurrencyCodeSetting, messages] = await Promise.all([
  //     getParseCurrencyCodeSetting(),
  //     loadDictionary(normalizedLocale)
  //   ]);

  const messages = await loadDictionary(normalizedLocale);

  //   const currencyCode = parseCurrencyCodeSetting ?? 'USD';
  const currencyCode = 'USD';
  const intl = createIntl({
    locale: normalizedLocale,
    messages
  });

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formatMessage: _, ...rest } = intl;

  const country = intl.locale.split('-')[1];

  return {
    ...rest,
    currencyCode,
    /**
     * The country code derived from the locale
     */
    country,
    f: formatMessage,
    ft: formatMessageTitleized,
    fta: formatMessageTitleizedAll
  };
}

const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  fr: () => import('@/locales/fr.json').then((module) => module.default),
  //   de: () => import('languages/de.json').then((module) => module.default),
  //   it: () => import('languages/it.json').then((module) => module.default),
  //   es: () => import('languages/es.json').then((module) => module.default),
  //   nl: () => import('languages/nl.json').then((module) => module.default)
} as const;

const validLanguageCodes = new Set(Object.keys(dictionaries));
const loadDictionary = cache(async (normalizedLocale: string) => {
  const languageCode = (normalizedLocale || defaultLocale).substring(0, 2);

  if (!validLanguageCodes.has(languageCode)) {
    return await dictionaries['en']();
  }

  return await dictionaries[languageCode as keyof typeof dictionaries]();
});
