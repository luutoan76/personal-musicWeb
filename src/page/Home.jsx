import { useRef,useEffect,useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import './css/Home.css'
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


function Home() {
  const [user, setUser] = useState(null);
  const[open , setOpen] = useState (false);

  
  const[weeklySong, setWeeklySong] = useState([])
  const[keyword, setKeyWord] = useState("")

  const { setCurrentSong, setIsPlaying } = useContext(SongContext);


  const songs = [
    {
      rank: 1,
      title: "Sorfcore",
      artist: "The Neighbourhood",
      date: "Nov 4, 2023",
      album: "Hard to Imagine the Neighbourhood Ever Changing",
      time: "3:26",
      cover: song1,
    },

    {
      rank: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      date: "Nov 4, 2023",
      album: "After Hours",
      time: "3:22",
      cover: song1,
    },

    {
      rank: 3,
      title: "Blinding Lights",
      artist: "The Weeknd",
      date: "Nov 4, 2023",
      album: "After Hours",
      time: "3:22",
      cover: song1,
    },
  ]
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  }

  function handlelogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/Login");
  }

  useEffect(() => {
    fectchWeeklySong()
    const storeUser = localStorage.getItem("user");
    if(storeUser){
      setUser(JSON.parse(storeUser));
    }
  }, [])

  async function fetchSong(id) {
    try{
      const res = await fetch(`http://localhost:5062/api/Song/${id}`)
      if(res.ok){
        const data = await res.json();
        setCurrentSong(data);
        setIsPlaying(false);
        console.log(data)
      }else{
        const errorText = await res.json();
        console.log(errorText)
      }

    } catch(error){
      console.log(error)
    }   
  }

  async function fectchWeeklySong() {
    try{
      const res = await fetch(`http://localhost:5062/api/Song/`)
      if(res.ok){
        const data = await res.json();
        setWeeklySong(data);
      }else{
        const errorText = await res.json();
        console.log(errorText)
      }

    } catch(error){
      console.log(error)
    }   
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/Search' , {
      state: {keyword : keyword}
    })
  }

  return (
    <>
    <div className="home-container">

      <div className="sidebar">
        <div className='logo-container'>
          <img src={logo} className="logo"></img>
        </div>
        

        <div className="section">
          <p className="section-title">Menu</p>
          <button className="menu-item active"><FaHome /><span>Home</span></button>
          <button className="menu-item" ><FaCompactDisc /><span>Discover</span></button>
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
          <button className="menu-item"><FaListUl /><span>Your playlist</span></button>
          <button className="menu-item add"><FaPlusSquare /><span>Add playlist</span></button>
        </div>

        <div className="section">
          <p className="section-title">General</p>
          <button className="menu-item"><FaCog /><span>Setting</span></button>
          <button className="menu-item logout" onClick={handlelogout}><FaSignOutAlt /><span>Logout</span></button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">

        {/* ===== BANNER ===== */}
        <section
          className="banner"
          style={{ backgroundImage: `url(${thumpnail})` }}
        >
          <div className="banner-navbar">
            <form onSubmit={handleSearch}>
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search for music, artists..." value={keyword} onChange={(e) => setKeyWord(e.target.value)} />

              </div>
            </form>
            

            <div className="nav-links">
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Premium</a>
            </div>

            <div className="auth-buttons">
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

          <div className="banner-content">
            <h1>
              All the <span className="highlight">Best Songs</span><br />
              in One Place
            </h1>
            <p>
              Access an amazing collection of popular and new songs.
              Stream your favorite tracks in high quality and enjoy without interruptions.
            </p>
            <div className="banner-buttons">
              <button className="btn-primary">Discover Now</button>
              <button className="btn-outline">Create Playlist</button>
            </div>
          </div>
        </section>

        {/* ===== WEEKLY SONGS ===== */}
        <div className="weekly-top">
          <h2>Weekly Top <span className="highlight">Songs</span></h2>
          <div className="song-list">
            {
              weeklySong.slice(0,5).map((song, i) => (
                <div className="song-card" key={song.id} onClick={() => fetchSong(song.id)}>
                  <img src={song.thumbnailUrl} alt="Song" />
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              ))
            }
            
            <div className="view-all">
              <div className="circle">+</div>
              <p>View All</p>
            </div>
          </div>
        </div>


        {/* ===== New release song ===== */}
        <div className="weekly-top">
          <h2>New Release <span className="highlight">Songs</span></h2>
          <div className="song-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="song-card" key={i}>
                <img src={song1} alt="Song" />
                <h3>Time</h3>
                <p>Luciano</p>
              </div>
            ))}
            <div className="view-all">
              <div className="circle">+</div>
              <p>View All</p>
            </div>
          </div>
        </div>

        {/* ===== Trend song ===== */}
        <div className="weekly-top">
          <h2>Trending Songs <span className="highlight">Songs</span></h2>

          <div className="trending-header">
            <span>#</span>
            <span>Release Date</span>
            <span>Album</span>
            <span>Time</span>
          </div>

          <div className="trending-list">
            {songs.map((song) => (
              <div className="trending-item" key={song.rank}>
                

                <div className="song-info">
                  <span className="song-rank">{song.rank}</span>
                  <img src={song.cover} alt={song.title} />
                  <div className='song-text'>
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                  </div>
                </div>

                <div className="song-date">{song.date}</div>
                <div className="song-album">{song.album}</div>

                <div className="song-time">
                  <FaRegHeart size={18} color="#b80df2" strokeWidth={1.5} />
                  <span>{song.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="view-all-btn">+ View All</button>

          
        </div>

        {/* ===== Popular Artis ===== */}
        <div className="weekly-top">
          <h2>Popular <span className="highlight">Artis</span></h2>
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

        {/* ===== Music Video ===== */}
        <div className="weekly-top">
          <h2>Music <span className="highlight">Videos</span></h2>
          
          <div class="video-list">
            <div class="video-card">
              <img src={song1} alt="Gossip"/>
              <h3>Gossip</h3>
              <p>Måneskin</p>
              <span>3M views</span>
            </div>

            <div class="video-card">
              <img src={song1} alt="Gossip"/>
              <h3>Shape Of You</h3>
              <p>Ed Sheeran</p>
              <span>5M views</span>
            </div>

            <div class="video-card">
              <img src={song1} alt="Gossip"/>
              <h3>Someone Like You</h3>
              <p>Adele</p>
              <span>3M views</span>
            </div>
            <div className="view-all-video">
              <div className="circle">+</div>
              <p>View All</p>
            </div>
          </div>
        </div>

        {/* ===== Top Albums ===== */}
        <div className="weekly-top">
          <h2>Top <span className="highlight">Albums</span></h2>
          <div className="song-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="song-card" key={i}>
                <img src={song1} alt="Song" />
                <h3>Adele 21</h3>
                <p>Adele</p>
              </div>
            ))}
            <div className="view-all">
              <div className="circle">+</div>
              <p>View All</p>
            </div>
          </div>
        </div>

        {/* ===== Mood Playlist ===== */}
        <div className="weekly-top">
          <h2>Mood <span className="highlight">Playlist</span></h2>
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

        {/* ===== Footer ===== */}
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

      </main>

    </div>
      
    </>
  )
}

export default Home
