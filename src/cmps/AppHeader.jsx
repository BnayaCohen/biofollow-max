import FlagUS from '../assets/imgs/flag-us.webp'
import FlagIL from '../assets/imgs/flag-il.webp'
import { useState } from 'react'

export function AppHeader() {

  const [selectedLang, setSelectedLang] = useState('he')

  const changeLanguage = () => {

  }

  return (
    <header className='app-header flex space-between align-center'>
      <section className="select-lang-container flex align-center">
        <img onClick={() => setSelectedLang('he')} className={selectedLang === 'he' ? 'selected' : ''} src={FlagIL} />
        <img onClick={() => setSelectedLang('en')} className={selectedLang === 'en' ? 'selected' : ''} src={FlagUS} />
      </section>

      <div>BioFollow</div>
    </header>
  )
}