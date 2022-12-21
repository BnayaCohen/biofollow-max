export const i18nService = {
  getTranslation
}

function getTranslation(key, lang) {
  return gTrans[key][lang]
}

const gTrans = {
  title: {
    en: 'Welcome to BioFollow',
    he: 'ברוכים הבאים לביו פולו'
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
  'enter-digit-input': {
    en: 'Enter 1-4 digits',
    he: 'הכנס 1 עד 4 תווים',
  },
  'continue': {
    en: 'Continue',
    he: 'המשך',
  },
  'start': {
    en: 'Start',
    he: 'התחל',
  },
  'press-to-shuffle': {
    en: 'Press to shuffle the cards',
    he: 'לחץ כדי להתחיל את הערבוב',
  },
  'stop-shuffle': {
    en: 'Stop shuffle',
    he: 'עצור ערבוב',
  },
  'select-card': {
    en: 'Select a card to continue',
    he: 'בחר קלף והמשך לערבוב הבא',
  },
  'last-card': {
    en: 'Last select...',
    he: 'בחירה אחרונה',
  },
  'biofollow-thanks': {
    en: 'Thank you for using BioFollow',
    he: 'תודה שהשתמשת בביו פולו',
  },
  'biofollow-submitted': {
    en: 'Your details has been submitted successfully',
    he: 'פרטיך נשלחו בהצלחה',
  },
  'biofollow-back': {
    en: 'Press here to start again',
    he: 'לחץ כאן כדי לחזור להתחלה',
  },
}