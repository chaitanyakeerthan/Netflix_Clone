import React from 'react'
import logo from '../Assets/Netflix logo.png'
import '../Styles/Navbar.css';


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo' >
        <img src={logo} alt="Netflix Logo" className='navbar_logo'/>
      <h1 className='navbar_title'>Netfix-Clone</h1>
      </div>

      <div className='navbar_links'>  
      <ul className='links'>
        <li className='link'>Home</li>
        <li className='link'>About</li>
        <li className='link'>Contact</li>
        <li className='link'>Movies</li>
        <li className='link'>TV Shows</li>
        <li className='link'>Contact</li>
        <li className='link'>Login</li>
        <li className='link'>Signup</li>
      </ul>
      </div>
      </div>
  )
}

export default Navbar;