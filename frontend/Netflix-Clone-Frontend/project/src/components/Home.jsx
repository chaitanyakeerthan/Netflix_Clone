import React from 'react'
import Navbar  from './Navbar';
import SignUp  from './SignUp';

const Home = () => {
  return (
    <div className='container'>
      <Navbar />
      <SignUp />
    </div>
  )
}

export default Home