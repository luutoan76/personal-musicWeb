import { useRef,useEffect,useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './addPlaylist.css'
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


function addPlaylist({isOpen, onClose}){
    if(!isOpen) return null;
    const[namePlaylist, setNamePlaylist]  = useState("");
    const[description, setDescription]  = useState("");
    const[user, setUser] = useState(null);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if(storeUser){
            const userData = JSON.parse(storeUser);
            setUser(userData);
        }
        
    }, [])

    async function handleSave(){
        try{
            const newPlaylist = {
                id: "",
                user_ID: user.id,
                name_playlist: namePlaylist,
                description: description,
                thumpnailImg: "https://i.pinimg.com/736x/02/c6/39/02c63923e78ecbebe5683271732f9420.jpg",
                created_at: new Date().toISOString(), 
                updated_at: new Date().toISOString(),
                song_playlist: [],
            }
            const res = await fetch("http://localhost:5062/api/Playlist/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPlaylist),
            })
            if(res.ok){
                console.log("Playlist created successfully");
                onClose();
            }else{
                const error =  await res.json();
                console.log("Error creating playlist:", error);
            }
        }catch(error){
            console.log("Error creating playlist:", error);
        }
    }
    return(
        <>
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <h2>Thêm Playlist</h2>
                    <span className="close-btn" onClick={onClose}>&times;</span>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <div className="left">
                        <img src={sound} className="thumbnail-addPlaylist"/>
                    </div>

                    <div className="right">
                        <input type="text" value={namePlaylist} onChange={(e) => setNamePlaylist(e.target.value)} placeholder="Tên Playlist" />
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Thêm phần mô tả không bắt buộc"/>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                <button className="private-btn">🔒 Đặt thành riêng tư</button>
                <button className="save-btn" onClick={handleSave}>Lưu</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default addPlaylist;
