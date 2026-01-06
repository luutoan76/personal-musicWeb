import { useRef,useEffect,useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './Banner.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'

function Banner(){
    return(
        <>
            <div className="sidebar">
                <div className='logo-container'>
                  <img src={logo} className="logo"></img>
                </div>
                    
            
                    <div className="section">
                      <p className="section-title">Menu</p>
                      <NavLink to="/" className={({isActive}) => isActive ? "menu-item active" : "menu-item"}><FaHome /><span>Home</span></NavLink>
                      <NavLink to="/Discover" className={({isActive}) => isActive ? "menu-item active" : "menu-item"}><FaCompactDisc /><span>Discover</span></NavLink>

                      <button className="menu-item"><FaListUl /><span>Albums</span></button>
                      <button className="menu-item"><FaUserAlt /><span>Artists</span></button>
                    </div>
            
                    <div className="section">
                      <p className="section-title">Library</p>
                      <button className="menu-item"><FaClock /><span>Recently Added</span></button>
                      <button className="menu-item"><FaCompactDisc /><span>Most played</span></button>
                    </div>
            
                    <div className="section">
                      <p className="section-title">Playlist and favorite</p>
                      <button className="menu-item"><FaHeart /><span>Your favorites</span></button>
                      <NavLink to="/Playlist" className={({isActive}) => isActive ? "menu-item active" : "menu-item"}><FaListUl /><span>Your Playlist</span></NavLink>

                      <button className="menu-item add"><FaPlusSquare /><span>Add playlist</span></button>
                    </div>
            
                    <div className="section">
                      <p className="section-title">General</p>
                      <button className="menu-item"><FaCog /><span>Setting</span></button>
                      <button className="menu-item logout"><FaSignOutAlt /><span>Logout</span></button>
                    </div>
                  </div>
        </>
    )
}

export default Banner