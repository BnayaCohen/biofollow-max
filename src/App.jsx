import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { CardApp } from './pages/CardApp';

function App() {
  return (
    <Router>
      <div className="main-app">
        <AppHeader />

        <main>
          <Routes>
            <Route path='/' element={<HomePage />}>
              <Route path='/play' element={<CardApp />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App