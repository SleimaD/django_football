import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Teams from './components/Teams';
import Players from './components/Players';
import BgBanner from "./assets/bg-banner.png"
import TeamDetails from './components/TeamDetails';
import CreateTeam from './components/CreateTeam';
import PlayerDetails from './components/PlayerDetails';
import CreatePlayer from './components/CreatePlayer';

function App() {
  return (
    <Router>
    <div className='w-full h-[100vh]'>
    
      <header className='w-full h-[900px] p-3 flex justify-center items-start  '>
        <nav className='bg-[#695f5f] backdrop-blur-2xl text-white p-4 rounded-3xl w-[30%] mt-2 fixed'>
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
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/teams/create" element={<CreateTeam />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetails />} />
          <Route path="/players/create" element={<CreatePlayer />} />
      </Routes>
    </div>
  </Router>

  )
}

export default App
