import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './page/Home'
import Register from './page/Register'

import {BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './page/Login'
import Search from './page/Search'
import { SongProvider } from "./SongContext";
import SongPlayer from './component/SongPlayer'


function App() {
  const location = useLocation();
  const exception = ["/Register", "/Login"]
  const showPlayer = !exception.includes(location.pathname);
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
            
        {showPlayer && <SongPlayer></SongPlayer>}
         
        
      </>
    )
}

export default App
