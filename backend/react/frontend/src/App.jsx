import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Teams from './components/Teams';
import Players from './components/Players';

function App() {
  return (
    <Router>
    <div className='w-full h-[100vh]'>
    
      <header className='w-full h-[90px] flex justify-center items-center '>
        <nav className='bg-[#695f5f] backdrop-blur-2xl text-white p-4 rounded-3xl w-[30%]'>
          <ul className='flex justify-center items-center gap-16 '>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/players">Players</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
      </Routes>
    </div>
  </Router>

  )
}

export default App
