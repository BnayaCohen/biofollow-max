import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { useState } from 'react';

function App() {

  const [language, setLanguage] = useState('he')

  return (
    <Router>
      <div className="main-app">
        <AppHeader onChangeLanguage={setLanguage} />

        <main>
          <Routes>
            <Route path='/' element={<HomePage langType={language} />} />
            <Route path='/admin' element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App