import React, { useEffect } from 'react'
import title from '../Assets/Title.png'
import '../Styles/BeginnerHome.css'
import api from './Api';

const BeginnerHome = () => {

  useEffect(() => {
    const interval = setInterval(() => {
      const googleSelect = document.querySelector(".goog-te-combo");
      if (googleSelect) {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  const changeLanguage = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="beginner-home">
      <nav className='navbar'>
        <img src={title} alt="Title" className='title-img' />

        <div className='nav-links'>

         
          <select className="language-select" onChange={(e) => changeLanguage(e.target.value)}>
            <option value="">🌐 Language</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
          </select>

          <a href="/Signup" className='nav-link'>SignUp</a>
          <a href="/Login" className='nav-link'>Login</a>
        </div>
      </nav>

     <div className="content">
  <h1>Unlimited Movies, TV Shows, and More</h1>
  <p>Watch anywhere, Cancel anytime.</p>
  <p>
    Ready to watch, 
    <span className='highlight'>
      Enter your email to create or restart your membership.
    </span>
  </p>

  <div className="email-box">
    <input type="email" placeholder="Email Address" className="email-input" />
    <a href="/Signup" className="get-started-btn">Get Started</a>
  </div>
</div>

    </div>
  )
}

export default BeginnerHome;
