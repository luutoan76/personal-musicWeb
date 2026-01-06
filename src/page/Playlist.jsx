import { useRef,useEffect,useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import  './css/Playlist.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh, FaR, FaP } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";


import { SongContext } from '../SongContext';
import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'
import SongPlayer from '../component/SongPlayer';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import Footer from '../component/Footer';
import AddPlaylist from '../component/addPlaylist';

function Playlist(){
    const [user, setUser] = useState(null);
    const[playlist , setPlaylist] = useState([]);
    const navigate = useNavigate();
    const [open , setOpen] = useState(false);


    

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if(storeUser){
            const userData = JSON.parse(storeUser);
            setUser(userData);
            fetchPlaylistByUserID(userData.id)
        }
        
    }, [playlist])


    const goToPlaylist = (id) => {
        const playlistItem = playlist.find(p => p.id === id);
        navigate("/PlaylistDetail", {
            state: { playlist: playlistItem}
        });
    }

    async function fetchPlaylistByUserID (userID) {
        try{
            const res = await fetch(`http://localhost:5062/api/Playlist/GetPlaylistByUserID/${userID}`)
            if(res.ok){
                const data = await res.json();
                setPlaylist(data);
            }
            else{
                const error =  await res.json();
                console.log("Error fetching playlist:", error);
            }
        }catch(error){
            console.log("Network error:", error);
        }
    } 


    return(
        <>
        <div className='home-container'>
            <Banner></Banner>
            <main className="main-content">
                <SearchBar></SearchBar>
                <div className='profile-container'>
                    <div class="playlist-header">
                        <h2>Playlist đã tạo ({playlist.length})</h2>
                        <button className='add-btn' onClick={() => setOpen(true)}>+</button>
                    </div>
                    
                    <div class="playlist-grid">
                        {playlist.map((i) => (
                            <div
                                className="playlist-item"
                                key={i.id}
                                onClick={() => goToPlaylist(i.id)}
                            >
                                <img src={i.thumpnailImg} className="thumb" />
                                <p className="playlist-name">{i.name_playlist}</p>
                            </div>
                        ))}
                        

                        
                    </div>
                </div>
                <Footer></Footer>
                
            </main>
        </div>

        <AddPlaylist isOpen={open} onClose={() => setOpen(false)}></AddPlaylist>
        </>
    )
}

export default Playlist;