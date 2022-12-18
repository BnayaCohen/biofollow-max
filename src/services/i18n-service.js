export const i18nService = {
  getTranslation
}

function getTranslation(key, lang) {
  return gTrans[key][lang]
}

const gTrans = {
  title: {
    en: 'BioFollow',
    he: 'ביו פולו'
  },
  language: {
    en: 'Language',
    he: 'שפה',
  },
  'enter-name': {
    en: 'Enter your fullname',
    he: 'הכנס שם מלא',
  },
  'enter-name-input': {
    en: 'Fullname',
    he: '...שם מלא',
  },
  'continue': {
    en: 'Continue',
    he: 'המשך',
  },
  'start': {
    en: 'Start',
    he: 'התחל',
  },
}