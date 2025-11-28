import { useRef,useEffect,useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import  './css/Profile.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaRegClock, FaUserAlt } from "react-icons/fa";
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
import Search from './Search';
import SearchBar from '../component/SearchBar';

function Profile(){
    const navigate = useNavigate();
    const goToPlaylist = () => {
        navigate("/Playlist");
    }
    return(
        <>
        <div className='home-container'>
            <Banner></Banner>
            <main className='main-content'>
                <SearchBar></SearchBar>
                <div class="profile-container">

                    <div class="user-info">
                        <img className='avatar' src={thumpnail}/>

                        <div class="user-text">
                        <div class="profile-username">toan</div>

                        <div class="follow-info">
                            <span>Đang theo dõi · 0</span>
                            <span>Người theo dõi · 0</span>
                        </div>
                        </div>
                    </div>

                    <div class="top-playlists">

                        <div class="top-card">
                            <FaRegHeart class="icon-profile pink" />
                            <div>
                                <p class="title">Yêu Thích</p>
                                <p class="sub">0 bài hát</p>
                            </div>
                            </div>

                            <div class="top-card">
                            <FaRegClock class="icon-profile blue"/>
                            <div>
                                <p class="title">Nghe gần đây</p>
                                <p class="sub">7 bài hát</p>
                            </div>
                        </div>

                    </div>

                    <div class="playlist-header">
                        <h2>Playlist đã tạo (1)</h2>
                        <button className='add-btn'>+</button>
                    </div>

                    <div class="playlist-grid">
                        <div class="playlist-item" onClick={goToPlaylist}>
                            <div class="thumb"></div>
                            <p class="playlist-name">test</p>
                        </div>

                        
                    </div>

                </div>

            </main>
        </div>
        </>
    )

}

export default Profile;