import React from 'react'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { SongProvider } from "./SongContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SongProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SongProvider>
    
  </React.StrictMode>
)