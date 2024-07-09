import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from './ru/translation.json';

export const resources = {
  ru: { translation }
} as const;

i18n.use(initReactI18next).init({
  lng: 'ru',
  resources
});
