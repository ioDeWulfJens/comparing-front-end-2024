import { derived, writable } from 'svelte/store';
import { PUBLIC_LOCALE } from '$env/static/public';
import en from '@/common/public/locales/en/translation.json';
import nl from '@/common/public/locales/nl/translation.json';

const flattenObject = (obj: Record<string, unknown>, prefix: string = '') => {
  return Object.keys(obj).reduce((acc: Record<string, string>, key) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !(obj[key] instanceof Array)
    ) {
      Object.assign(
        acc,
        flattenObject(obj[key] as Record<string, unknown>, pre + key)
      );
    } else {
      acc[pre + key] = obj[key] as string;
    }
    return acc;
  }, {});
};

export const locale = writable<'en' | 'nl'>(PUBLIC_LOCALE as 'en' | 'nl');

const translations = {
  en: flattenObject(en),
  nl: flattenObject(nl),
};

function translate(
  locale: 'en' | 'nl',
  key: string,
  vars: Record<string, string>
) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error('no key provided to $t()');
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let text = translations[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string
  Object.keys(vars).forEach((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(
  locale,
  ($locale) => (key: string, vars: Record<string, string> = {}) =>
    translate($locale, key, vars)
);
