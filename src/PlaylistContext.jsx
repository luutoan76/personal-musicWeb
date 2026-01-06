import { createContext, useEffect, useRef, useState, useContext } from "react";
import { SongContext } from "./SongContext";

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
   
    
    const [userPlaylists, setUserPlaylists] = useState([]);

    return (
      <PlaylistContext.Provider value={{ userPlaylists, setUserPlaylists }}>
        {children}
      </PlaylistContext.Provider>
    );
};
