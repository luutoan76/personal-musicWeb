import { useRef,useEffect,useState,useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import './css/Search.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import Banner from "../component/Banner.jsx";
import SongPlayer from '../component/SongPlayer';
import { SongContext } from '../SongContext';


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'

function Search(){
    const [user, setUser] = useState(null);
    const[open , setOpen] = useState (false);
    const navigate = useNavigate();

    const location = useLocation();
    const firstKeyword = location.state?.keyword || ""
    const[keyword, setKeyWord] = useState(firstKeyword)

    const[song, setSong] = useState([])

    const { setCurrentSong, setIsPlaying } = useContext(SongContext);
    
    

    const goToLogin = () => {
        navigate("/Login");
    }

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

        if(firstKeyword){ 
            fetchSearch(firstKeyword)
        }
        
    }, [keyword])

    


    const fetchSearch = async(keyword) => {
        try{
            const res = await fetch(`http://localhost:5062/api/Song/search?song=${keyword}`)
            if(res.ok){
                const data = await res.json()
                setSong(data)
            }else{
                const errorText = await res.json();
                console.log(errorText)
            }

        } catch(error){
            console.log(error)
        }           
        
    }

    async function fetchSong(id) {
        try{
            const res = await fetch(`http://localhost:5062/api/Song/${id}`)
        if(res.ok){
            const data = await res.json();
            setCurrentSong(data);
            setIsPlaying(false);
        }else{
            const errorText = await res.json();
            console.log(errorText)
        }

        } catch(error){
        console.log(error)
        }   
    }

    const onSubmit = (e) => {
        e.preventDefault();
        fetchSearch(keyword)
    }
   

    

    return(
        <>
        <div className='home-container'>
            <Banner>
                
            </Banner>
            <main className='main-content'>
                {/* ===== NAV BAR RIGHT ====== */}
                <div className="navbar">
                    <form onSubmit={onSubmit}>
                         <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder="Search For Musics, Artists, ..." value={keyword} onChange={(e) => setKeyWord(e.target.value)}/>
                        </div>
                    </form>
                   

                    <div className="nav-links">
                        <a href="#">About Us</a>
                        <a href="#">Contact</a>
                        <a href="#">Premium</a>
                    </div>

                    <div className="nav-buttons">
                        {user  ? (
                            <div className="user-section" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                <FaRegUserCircle size={22} />
                                <span className="username">{user.name}</span>
                                {open && (
                                <>
                                <div className='dropdown-menu'>
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

                {/* NAV BAR RIGHT */}
                <div className="weekly-top">
                    <h1>Search Result For "{keyword}"</h1>
                    <h2><span className="highlight">Song</span></h2>
                    <div className="song-list">
                        {
                            song.map((song, i) => (
                                <div className="song-card" key={song.id} onClick={() => fetchSong(song.id)}>
                                <img src={song.thumbnailUrl} alt="Song" />
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                                </div>
                            ))
                        }
                        

                    </div>
                    <button className="view-all-btn">+ View All</button>
                </div>

                {/* ===== Playlist ===== */}
                <div className="weekly-top">
                    <h2><span className="highlight">Playlist</span></h2>
                    <div className="song-list">
                        {[1, 2, 3, 4, 5].map((i) => (
                        <div className="song-card" key={i}>
                            <img src={song1} alt="Song" />
                            <h3>Sad Play List</h3>
                        </div>
                        ))}
                        <div className="view-all">
                        <div className="circle">+</div>
                        <p>View All</p>
                        </div>
                    </div>
                </div>

                {/* ==== Artis ===== */}
                <div className="weekly-top">
                    <h2><span className="highlight">Artis</span></h2>
                    <div className='artist-list'>
                        <div class="artist">
                            <img src={song1} alt="Eminem"/>
                            <p>Eminem</p>
                        </div>
                        <div class="artist">
                            <img src={song1} alt="Eminem"/>
                            <p>The Weekend</p>
                        </div>
                        <div class="artist">
                            <img src={song1} alt="Eminem"/>
                            <p>The Weekend</p>
                        </div>
                        <div class="artist">
                            <img src={song1} alt="Eminem"/>
                            <p>The Weekend</p>
                        </div>
                        <div class="artist">
                            <img src={song1} alt="Eminem"/>
                            <p>The Weekend</p>
                        </div>

                        <div className="view-all">
                            <div className="circle">+</div>
                            <p>View All</p>
                        </div>
                    </div>
                </div>

                {/* ==== Album ===== */}
                <div className="weekly-top">
                    <h2><span className="highlight">Albums</span></h2>
                    <div className="song-list">
                        {[1, 2, 3, 4, 5].map((i) => (
                        <div className="song-card" key={i}>
                            <img src={song1} alt="Song" />
                            <h3>Sad Play List</h3>
                        </div>
                        ))}
                        <div className="view-all">
                        <div className="circle">+</div>
                        <p>View All</p>
                        </div>
                    </div>
                </div>

            </main>
            
        </div>
        
        </>
    )
}

export default Search