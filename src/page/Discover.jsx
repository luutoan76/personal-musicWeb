import { useRef,useEffect,useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import style from './css/Discover.module.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";

import { SongContext } from '../SongContext';
import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'
import SongPlayer from '../component/SongPlayer';
import Banner from '../component/Banner';
import SearchBar from '../component/SearchBar';
import Footer from '../component/Footer';

function Discover(){
    return(
        <>
        <div className='home-container'>
            <Banner></Banner>
            <main className='main-content'>
                <SearchBar></SearchBar>

                {/* ==== MUSIC GENRES ===== */ }
                <div className="weekly-top">
                    <h2>Music <span className="highlight">Genres</span></h2>
                    <div className="song-list">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div className="song-card" key={i}>
                                <img src={song1} alt="Song" />
                                <h3>Rap Tracks</h3>
                            </div>
                        ))}
                        <div className="view-all">
                        <div className="circle">+</div>
                        <p>View All</p>
                        </div>
                    </div>
                </div>

                {/* ==== POPULAR ARTISTS ====*/ }
                <div className="weekly-top">
                    <h2>Popular <span className="highlight">Artist</span></h2>
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

                {/* ==== MUSIC VIDEO ====*/ }
                <div className="weekly-top">
                    <h2>Music <span className="highlight">Videos</span></h2>
                    
                    <div className={style["video-list"]}>
                        {
                            [1,2,3,4,5,6].map((i) => (
                                <div className={style["video-card"]}>
                                    <img src={song1} alt="Gossip"/>
                                    <h3>Gossip</h3>
                                    <p>Måneskin</p>
                                    <span>3M views</span>
                                </div>
                            ))
                        }
                        
                    </div>
                    <button className={style["view-all-btn"]}>+ View All</button>
                </div>

                <Footer></Footer>
            </main>
        </div>
        </>
    );
}

export default Discover;