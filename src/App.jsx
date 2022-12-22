import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { useState } from 'react';

function App() {

  const [language, setLanguage] = useState('he')
  const [goHome, setGoHome] = useState(false)

  return (
    <Router>
      <div className="main-app">
        <AppHeader onChangeLanguage={setLanguage} setGoHome={setGoHome} />

        <main>
          <Routes>
            <Route path='/' element={<HomePage langType={language} goHome={goHome} />} />
            <Route path='/eli4752321' element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App