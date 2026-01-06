import React from 'react'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { SongProvider } from "./SongContext";
import { PlaylistProvider } from './PlaylistContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SongProvider>
      <PlaylistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlaylistProvider>
      
    </SongProvider>
    
  </React.StrictMode>
)