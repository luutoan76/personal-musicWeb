import { useRef,useEffect,useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './SelectPlaylist.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'
import sound from '../assets/wave-sound.png'

function SelectPlaylist({open, onClose, songId}){
    if(!open) return null;
    const[playlist , setPlaylist] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if(storeUser){
            const userData = JSON.parse(storeUser);
            setUser(userData);
            fetchPlaylistByUserID(userData.id)
        }
        
    }, [playlist])

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

    async function addToPlayList(songId, playlistID) {
        try{
            const res = await fetch(`http://localhost:5062/api/Playlist/addSong/playlistId/${playlistID}/song/${songId}`, {
                method: "POST",
            })
            if(res.ok){
                const data = await res.text()
                console.log("Song Added" + data)
            }else{
                const errorData = await res.text()
                console.log("Failed added" + errorData)
            }
        }catch(error){
            console.log("Error" + error)
        }
        
    }



    return(
        <>
        <div className="modal-overlay">
            <div className="modal">
                {/* Header */}
                <div className="modal-header">
                    <h2>Thêm vào playlist</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Search */}
                <div className="search-box-playlist">
                    <input placeholder="Nhập tên playlist" />
                </div>

                {/* Create new */}
                <div className="create-playlist">
                    <div className="icon-selectPlaylist">＋</div>
                    <span>Tạo playlist mới</span>
                </div>

                {/* Playlist list */}
                <p className="my-playlist">Playlist của bạn</p>

                {playlist.map(p => (
                    <div className="playlist-item-selectPlaylist" key={p.id}>
                        <div className="playlist-left">
                            <img src={p.thumpnailImg} className="thumb" />
                        <span>{p.name_playlist}</span>
                        </div>
                        <button className="add-toPlaylist" onClick={() => addToPlayList(songId, p.id)}>Thêm vào</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default SelectPlaylist;