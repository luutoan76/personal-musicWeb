import { useRef,useEffect,useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import './SongPlayer.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { SongContext } from "../SongContext";


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'


function SongPlayer(){
    const { currentSong, isPlaying, setIsPlaying } = useContext(SongContext);
    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [duration,setDuration] = useState(0);
    const[currentTime, setCurrentTime] = useState(0);
    const[volume , setVolume] = useState(20)
    const [isReplay , setisReplay] = useState(false);



    const togglePlay = () => {
        
        if(!isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
        setIsPlaying(!isPlaying)
    }

    const updateProgress = () => {
        const audio = audioRef.current;
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
    }

    const handleReplay = () => {
        if(isReplay){
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        else{
            setIsPlaying(!isPlaying)
            setisReplay(false)
        }
    }

    const toogleRepeat = () => {
        setisReplay(!isReplay);
        console.log(isReplay)
    }

    const seeek = (event) => {
        const audio = audioRef.current;
        const value= event.target.value;
        audio.currentTime = (value / 100) * audio.duration;
        setProgress(value);
    }


    const formatTime = (time) => {
        if(!time || isNaN(time)){
        return "0:00";
        }
        const min = Math.floor(time / 60);
        const sec  = Math.floor(time % 60).toString().padStart(2,'0');
        return `${min}:${sec}`;
    }

    const changeVolume = (event) =>{
        const newVolume = event.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100;
    }

    const mute = (event) => {
        const newVolume = 0
        setVolume(0);
        audioRef.current.volume = 0;
    }

    useEffect(()=> {
        
        setIsPlaying(false)
    }, [])

    if (!currentSong) return null;
    return(
        <>
                <div className='music-player'>
                
                    <div className="controls-left">
                        <FaStepBackward className="icon" />
                        {
                            isPlaying ? (
                                <FaPauseCircle className='icon pause' onClick={togglePlay}></FaPauseCircle>
                            ) : (
                                <FaPlayCircle className='icon play' onClick={togglePlay}></FaPlayCircle>
                            )
                            }
                            <FaStepForward className="icon" />
                            <CiShuffle className="icon" />
                            {
                            isReplay ? (
                                <TbRepeat className="icon" onClick={toogleRepeat}/>
                            ) : (
                                <TbRepeatOff className='icon' onClick={toogleRepeat}></TbRepeatOff>
                            )
                        }
                        
                        <span className="time">{formatTime(currentTime)}</span>
                    </div>
                    <div className="progress-container">
                        <input type="range" min="0" max="100" value={progress || 0} onChange={seeek} />
                        <audio
                            ref={audioRef}
                            src={currentSong.audioUrl}
                            onTimeUpdate={updateProgress}
                            onLoadedMetadata= {updateProgress}
                            onEnded={handleReplay}
                        />
                        <span className='time'>{formatTime(duration)}</span>
                    </div>

                    <div className="song-info">
                        {currentSong && (
                            <img src={currentSong.thumbnailUrl} className="thumbnail" alt="Song" />
                        )}

                        <div className="song-text">
                            <span className="artist-name">{currentSong.artist}</span>
                            <span className="song-name">{currentSong.title}</span>
                        
                        </div>

                        <div className="volume-control">
                        {volume == 0 ? (
                            <>
                            <FaVolumeOff className='icon'></FaVolumeOff>
                            </>
                        ) : (
                            <>
                            <FaVolumeHigh className='icon' onClick={mute}></FaVolumeHigh>
                            </>
                        )}
                        <input type="range" min="0" max="100" value={volume} onChange={changeVolume} className="volume-bar"/>
                        </div>

                        <FaRegHeart className="icon" />
                        <FaUserPlus className="icon" />
                        <MdOutlinePlaylistAdd className="icon" />
                    </div>
                </div>
            
        </>
    )
}

export default SongPlayer;
