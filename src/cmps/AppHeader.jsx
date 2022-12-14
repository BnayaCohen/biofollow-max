import FlagUS from '../assets/imgs/flag-us.png'
import FlagIL from '../assets/imgs/flag-il.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AppHeader({ onChangeLanguage, setGoHome }) {

  const [selectedLang, setSelectedLang] = useState('he')
  const navigate = useNavigate()

  const changeLanguage = (lng) => {
    setSelectedLang(lng)
    onChangeLanguage(lng)
  }

  const onGoHome = () => {
    setGoHome(true)
    navigate('/')
    setTimeout(setGoHome, 500, false)
  }

  return (
    <header className='app-header flex align-center justify-center'>
      <div className='flex space-between align-center' style={{ maxWidth: '600px', width: '100%' }}>
        <section className="select-lang-container flex align-center">
          <img onClick={() => changeLanguage('he')} className={selectedLang === 'he' ? 'selected' : ''} src={FlagIL} />
          <img onClick={() => changeLanguage('en')} className={selectedLang === 'en' ? 'selected' : ''} src={FlagUS} />
        </section>

        <svg onClick={onGoHome} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
          <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z"></path>
        </svg>
      </div>
    </header>
  )
}