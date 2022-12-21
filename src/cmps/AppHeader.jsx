import FlagUS from '../assets/imgs/flag-us.webp'
import FlagIL from '../assets/imgs/flag-il.webp'
import { useState } from 'react'

export function AppHeader({ onChangeLanguage }) {

  const [selectedLang, setSelectedLang] = useState('he')

  const changeLanguage = (lng) => {
    setSelectedLang(lng)
    onChangeLanguage(lng)
  }

  return (
    <header className='app-header flex align-center justify-center'>
      <div className='flex space-between align-center' style={{ maxWidth: '600px', width: '100%' }}>
        <section className="select-lang-container flex align-center">
          <img onClick={() => changeLanguage('he')} className={selectedLang === 'he' ? 'selected' : ''} src={FlagIL} />
          <img onClick={() => changeLanguage('en')} className={selectedLang === 'en' ? 'selected' : ''} src={FlagUS} />
        </section>

        <div>BioFollow</div>
      </div>
    </header>
  )
}