import langParser from 'accept-language-parser';

const locales = ['en-US', 'fr-FR', 
    // 'de-DE', 'it-IT', 'es-ES', 'nl-NL'
];

export const defaultLocale = 'en-US';

type LocaleSource = {
  locale: string;
};


const getLocalePartsFrom = ({ locale }: LocaleSource) => {
  const localeParts = locale.toLowerCase().split('-');
  return {
    lang: localeParts[0],
    country: localeParts[1]
  };
};


export const titleize = (value = ''): string => value.charAt(0).toUpperCase() + value.slice(1);

export const titleizeAll = (value = ''): string => value.split(' ').map(titleize).join(' ');

export const findBestMatchingLocale = (acceptLangHeader: string) => {
  // Parse the locales acceptable in the header and sort them by priority (q)
  const parsedLangs = langParser.parse(acceptLangHeader);

  for (let i = 0; i < parsedLangs.length; i++) {
    const parsedLang = parsedLangs[i];

    // Attempt to match both the language and the country
    const matchedLocale = locales.find((locale) => {
      const { lang, country } = getLocalePartsFrom({ locale });
      return parsedLang.code === lang && parsedLang.region === country;
    });

    if (matchedLocale) {
      return matchedLocale;
    } else {
      // If we didn't find a match for both language and country, try just the language
      const matchedLanguage = locales.find((locale) => {
        const { lang } = getLocalePartsFrom({ locale });
        return parsedLang.code === lang;
      });

      if (matchedLanguage) {
        return matchedLanguage;
      }
    }
  }

  // If we didn't find a match, return the default locale
  return defaultLocale;
};