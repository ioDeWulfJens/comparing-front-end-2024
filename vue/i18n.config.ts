import en from "../common/public/locales/en/translation.json";
import nl from "../common/public/locales/en/translation.json";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    strategy: "prefix",
    messages: {
        en,
        nl
    }
  }))