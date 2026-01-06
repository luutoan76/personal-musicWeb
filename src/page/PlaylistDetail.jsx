import { useRef,useEffect,useState, useContext } from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import  './css/Playlist.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh, FaR, FaP } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { IoIosArrowRoundBack,IoIosMore } from "react-icons/io";


import { SongContext } from '../SongContext';
import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'
import SongPlayer from '../component/SongPlayer';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import Playlist from './Playlist';
import Footer from '../component/Footer';
import { PlaylistContext } from '../PlaylistContext';

function PlaylistDetail(){
    const [user, setUser] = useState(null);
    const[open , setOpen] = useState (false);
    const {state} = useLocation();
    const playlist = state?.playlist || [];
    const[song, setSong] = useState([]);
    const navigate = useNavigate();
    const { playAll, playSongAtIndex} = useContext(SongContext);
    

    function handlelogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/Login");
    }

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if(storeUser){
            setUser(JSON.parse(storeUser));
        }
        fetchSongById(playlist.id);
    }, [])

    const goToLogin = () => {
        navigate("/Login");
    }

    const goToPlaylist = () => {
        navigate("/Playlist");
    }

    async function fetchSongById(songId) {
        try{
            const res = await fetch(`http://localhost:5062/api/Playlist/GetSongByPlaylistID/${songId}`)
            if(res.ok){
                const data =await res.json();
                setSong(data);
            }
        }catch(error){
            console.log("Network error:", error);
        }
    }
    
    async function deleteToPlayList(songId) {
        try{
            const res = await fetch(`http://localhost:5062/api/Playlist/deleteSong/playlistId/6926cf20201b77ad4acf9a5a/song/${songId}`, {
                method: "DELETE",
            })
            if(res.ok){
                const data = await res.text()
                setSong(prev => prev.filter(song => song.id !== songId));
            }else{
                const errorData = await res.text()
                console.log("Failed deleted" + errorData)
            }
        }catch(error){
            console.log("Error" + error)
        }
        
    }

    return(
        <>
        <div className='home-container'>
            <Banner></Banner>
            <main className="main-content">
                <div className='playlist-container'>
                    <div class="playlist-nav">
                        <div class= "back-btn">
                            <IoIosArrowRoundBack size={40} onClick={goToPlaylist}/>
                        </div>
                        
                        <div className='playlist-nav-end'>
                            
                            <a href="#">Share</a>
                            <a href="#">About</a>
                            <a href="#">Premium</a>
                            <div className="auth-buttons-profileDetail">
                                {user  ? (
                                    <div className="user-section-profileDetail" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                        <FaRegUserCircle size={22} />
                                        <span className="username">{user.name}</span>
                                        {open && (
                                        <>
                                        <div className='dropdown-menu-profileDetail'>
                                            <button className="dropdown-item">Profile</button>
                                            <button className="dropdown-item logout" onClick={handlelogout}>
                                            Logout
                                            </button>
                                        </div>
                                        </>
                                        )}
                                    </div>
                                ): (
                                    <>
                                    <button className="btn-outline" onClick={goToLogin}>Login</button>
                                    <button className="btn-primary">Sign up</button>
                                    </>
                                )}
                            
                            </div>
                            
                        </div>
                    </div>

                    <div class="playlist-content">
                        <div class="cover">
                            <img src={playlist.thumpnailImg} alt="Trending Music"/>
                        </div>

                        <div class="info">
                            <h1 class="title">
                                Trending songs <span>mix</span>
                            </h1>

                            <p class="artists">
                                tate mcree, nightmares, the neighborhood, doja cat and ... {playlist.description}
                            </p>

                            <div class="meta">
                                <div class="info-playlist">
                                    <span>{song.length} Songs</span>
                                    <span class="dot"></span>
                                    <span>1h 36m</span>
                                </div>
                                
                                <div class="play-wrapper" onClick={() => playAll(song)}>
                                    <FaPlayCircle className='play-icon'/> 
                                    <span >Play All</span>
                                    
                                    
                                </div>
                            </div>

                            
                        </div>
                    </div>

                    <div class="song-table">

                        <div class="table-header">
                            <span class="col-index"></span>
                            <span class="col-title">Title</span>
                            <span class="col-release">Release Date</span>
                            <span class="col-album">Added At</span>
                            <span class="col-time">Time</span>
                        </div>

                        {
                            song.map((item, index) => {
                                const info = playlist.song_playlist.find(s => s.songId === item.id)

                                return(
                                     <div className="song-row" key={item.id} >
                                        <span className="index">{index}</span>

                                        <div className="song-info">
                                            <img src={item.thumbnailUrl }  onClick={() => playSongAtIndex(index, song)}/>
                                            <div className="text">
                                                <p className="title">{item.title}</p>
                                                <p className="artist">{item.artist}</p>
                                            </div>
                                        </div>

                                        <span className="release">{item.releaseDate}</span>
                                        <span className="album">{info ? new Date(info.addedAt).toLocaleString() : ''}</span>

                                        <div className="time-wrap">
                                            <FaRegHeart className='heart'/>
                                            <span className="time">{item.duration}</span>
                                            <IoIosMore className="more" onClick={() => deleteToPlayList(item.id)}/>
                                        </div>
                                    </div>
                                )
                                
                               
                            })
                        }
                        
                        

                        
                    </div>

                </div>
                
            </main>
        </div>
        </>
    )
}


export default PlaylistDetail;