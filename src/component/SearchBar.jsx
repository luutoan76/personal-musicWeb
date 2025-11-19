import { useRef,useEffect,useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import './css/SearchBar.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import Banner from "../component/Banner.jsx";
import SongPlayer from '../component/SongPlayer.jsx';


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'

function SearchBar({keyword, onSubmit}){
    const [user, setUser] = useState(null);
    const[open , setOpen] = useState (false);
    const navigate = useNavigate();

    const location = useLocation();
    const firstKeyword = location.state?.keyword || ""
    const[keyword, setKeyWord] = useState(firstKeyword)

    const[song, setSong] = useState([])
    const[songPlayer, setSongPlayer] = useState(null)
    

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

        
        
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/Search' , {
        state: {keyword : keyword}
        })
    }

    
    
   

    

    return(
        <>
                <div className="navbar">
                    <form onSubmit={handleSearch}>
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
        
        </>
    )
}

export default SearchBar