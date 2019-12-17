import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import nb from '../l10n/nb';

interface LocaleStrings extends LocalizedStringsMethods {
  [key: string]: any;
}

export const localization: LocaleStrings = new LocalizedStrings({
  nb: { ...nb }
});

localization.setLanguage('nb');
