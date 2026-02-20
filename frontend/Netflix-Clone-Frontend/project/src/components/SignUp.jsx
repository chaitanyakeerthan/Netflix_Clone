import React from 'react'
import logo from '../Assets/Netflix logo.png';
import '../Styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";


const SignUp = () => {

  const [data, setData]=React.useState({
    name:"",
    email:"",
    password:""
  })
  const navigate=useNavigate();

const handleChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
}

const API_KEY = "7211722c90338138b21fab1022bc60d4";
const BASE_URL = "https://api.themoviedb.org/3";

const handleSubmit= async (e)=>
{
  e.preventDefault();
  try{
    const res=await axios.post("http://localhost:8080/Netflix/api/Register",data);
    console.log(res.data);
   if(res.data==="Success")
   {
    alert("Registration Successful ! Please Login");
    navigate('/Login');
    setData({
      name:"",
      email:"",
      password:""
    });
   }
  }
  catch(error)
  {
    console.log("Error in Signup:",error);
    toast.error("Signup failed");
  }
}

 const handleSuccess = async (response) => {
  try {
    const idToken = response.credential;

    const res = await axios.post(
      "http://localhost:8080/auth/google",
      { token: idToken }
    );

    if (res.data.jwt) {
      alert("Login Successful");

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("userEmail", res.data.email); 

      navigate("/ActualHome");
    }

  } catch (error) {
    console.log("Error during Google Login", error);
  }
};

  return (
    <div className='SignUp'>
      <img src={logo} alt="Netflix logo" className='SignUp_logo' />
      <h1>SignUP</h1>

      <form className='SignUp_form' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' required className='SignUp_input' name="name" onChange={handleChange} value={data.name} />
        <input type="email" placeholder='email' required className='SignUp_input' name="email" onChange={handleChange} value={data.email} />
        <input type="password" placeholder='password' required className='SignUp_input' name="password" onChange={handleChange} value={data.password} />
        <button type="submit" className='SignUp_button'>Sign Up</button>

         <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
      </form>

    </div>
  )
}

export default SignUp