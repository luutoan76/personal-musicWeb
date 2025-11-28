import { useRef,useEffect,useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './Footer.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPlayCircle,FaPauseCircle, FaStepForward, FaStepBackward, FaUserPlus
  ,FaRegHeart,FaRegUserCircle ,FaSearch,FaHome, FaClock, FaHeart, FaListUl, FaPlusSquare, FaCog, FaSignOutAlt, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import { CiRepeat, CiShuffle } from "react-icons/ci";
import { FaVolumeOff, FaVolumeLow, FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'

function Footer(){
    return(
        <>
        <footer class="footer">
          <div class="footer-container">
            <div class="footer-about">
              <h3>About</h3>
              <p>
                Melodies is a website that has been created for over
                <span class="highlight"> 5 year's</span> now and it is one of the most
                famous music player website’s in the world. In this website you can
                listen and download songs for free. Also if you want no limitation you
                can buy our <span class="highlight">premium pass’s.</span>
              </p>
            </div>

            <div class="footer-links">
              <div class="footer-column">
                <h3>Melodies</h3>
                <hr />
                <a href="#">Songs</a>
                <a href="#">Radio</a>
                <a href="#">Podcast</a>
              </div>

              <div class="footer-column">
                <h3>Access</h3>
                <hr />
                <a href="#">Explor</a>
                <a href="#">Artists</a>
                <a href="#">Playlists</a>
                <a href="#">Albums</a>
                <a href="#">Trending</a>
              </div>

              <div class="footer-column">
                <h3>Contact</h3>
                <hr />
                <a href="#">About</a>
                <a href="#">Policy</a>
                <a href="#">Social Media</a>
                <a href="#">Soppurt</a>
              </div>
            </div>

            <div class="footer-right">
              <h2 class="brand">Melodies</h2>
              <div class="social-icons">
                <FaFacebookF className='footer-icon'></FaFacebookF>
                <FaInstagram className='footer-icon'></FaInstagram>
                <FaTwitter className='footer-icon'></FaTwitter>
              </div>
            </div>
          </div>
        </footer>
        </>
    )
}

export default Footer;