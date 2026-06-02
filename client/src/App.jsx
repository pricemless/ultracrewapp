import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Pacers from './pages/Pacers'

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
        
        <nav style={{ background: '#111', borderBottom: '1px solid #333', padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '30px' }}>
          <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#f90' }}>DropBag</span>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Races</Link>
          <Link to="/pacers" style={{ color: '#fff', textDecoration: 'none' }}>Pacer Finder</Link>
        </nav>

        <div style={{ padding: '30px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pacers" element={<Pacers />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App