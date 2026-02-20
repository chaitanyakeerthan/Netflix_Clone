import React from 'react'
import logo from '../Assets/Netflix logo.png';
import search from '../Assets/search3.jpg';
import profile from '../Assets/ProfileIcon.jpg'
import '../Styles/Navbar2.css';
import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {
  const navigate = useNavigate();
  const Genre=()=>
  {
    navigate('/genre');
  }

  const handleLogout=()=>
  {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate('/');
  }
  return (
     <div className='navbar'>
          <div className='logo' >
            <img src={logo} alt="Netflix Logo" className='navbar_logo'/>
          <h1 className='navbar_title'>Netfix-Clone</h1>
          </div>
    
          <div className='navbar_links'>  
          <ul className='links'>
            <img src={search} alt="Search" className='SearchImg' onClick={()=>navigate('/search')}/>    
            <li className='link' onClick={()=>navigate('/ActualHome')}>Home</li>
            <li className='link' onClick={()=>navigate('/shows')}>Shows</li>
            <li className='link' onClick={()=>navigate('/movies')}>Movies</li>
            <li className='link' onClick={Genre}>Genres</li>
            <li className='link' onClick={()=>navigate('/favorites')}>Favorites</li>
            <li className='link' onClick={handleLogout}>Logout</li>
            <li className='link' onClick={()=>navigate('/Paypal')}>Subscription</li>
            
          </ul>
          </div>
          </div>
  )
}

export default Navbar2