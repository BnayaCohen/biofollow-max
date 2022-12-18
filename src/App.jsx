import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="main-app">
        <AppHeader />

        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/admin' element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App