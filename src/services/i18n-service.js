export const i18nService = {
  getTranslation
}

function getTranslation(key, lang) {
  return gTrans[key][lang]
}

const gTrans = {
  title: {
    en: 'Welcome to BioFollow',
    he: 'ברוכים הבאים לביו-פולו'
  },
  language: {
    en: 'Language',
    he: 'שפה',
  },
  'enter-details': {
    en: 'Enter your details',
    he: 'הכנס פרטים',
  },
  'enter-name-input': {
    en: 'Fullname',
    he: '...שם מלא',
  },
  'enter-digit-input': {
    en: 'Enter phone or Email',
    he: 'הכנס טלפון או אימייל',
  },
  'continue': {
    en: 'Continue',
    he: 'המשך',
  },
  'fail-inputs': {
    en: 'Type your details correctly',
    he: 'בבקשה מלא את הפרטים נכון',
  },
  'fail-user-exist': {
    en: 'Name and digits are already exist',
    he: 'שם ותווים אלו כבר נמצאים במערכת',
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