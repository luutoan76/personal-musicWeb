import { createContext, useEffect,useRef, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  // neu loi xoa dong nay dang tich hop playlist 
  const audioRef = useRef(null)
  const[playlist, setPlaylist] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAll = (song) => {
    if(!song?.length){return}
    setPlaylist(song)
    setCurrentIndex(0)
    setCurrentSong(song[0])
    setIsPlaying(true);
  }

  const playSongAtIndex = (index, playlist) => {
    setPlaylist(playlist)
    setCurrentIndex(index)
    setCurrentSong(playlist[index])
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex < playlist.length) {
        setCurrentSong(playlist[newIndex]);
        setIsPlaying(true);
        return newIndex;
      } else {
        setIsPlaying(false);
        return prev;
      }
    });
  };

  const prevSong = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if(newIndex < playlist.length){
        setCurrentSong(playlist[newIndex])
        setIsPlaying(true)
        return newIndex
      }
      else{
        setIsPlaying(false)
        return prev;
      }
    })
    
  }

  const getRandomIndex = () => {
    
    if(playlist.length <= 1){return}
    let randomIndex = currentIndex
    
    while(randomIndex == currentIndex){
      randomIndex = Math.floor(Math.random() * playlist.length);
    }
    setCurrentIndex(randomIndex)
    setCurrentSong(playlist[randomIndex])
    
  }


  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong,isPlaying,setIsPlaying, playlist,setPlaylist, 
    currentIndex,setCurrentIndex,playAll, nextSong, audioRef, prevSong, playSongAtIndex, getRandomIndex }}>
      {children}
    </SongContext.Provider>
  );
};
