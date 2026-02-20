import React from 'react'
import logo from '../Assets/Netflix logo.png';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";



const Login = () => {
  const [data, setData]=React.useState({
    email:"",
    password:""
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:8080/Netflix/api/login",data);
      console.log("login response",res.data);
      if(res.data.token){
        toast.success("Login Successful");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userEmail",data.email);
        navigate("/ActualHome");
      }
      else{
        toast.error("Login failed. Please check your Credentials");
        setData({
          email:"",
          password:""
        })
      }

      
    }

    catch(error)
    {
      console.log("Error during login",error);
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
    <div className='Login'>
      <img src={logo} alt="Netflix logo" className='Login_logo' />
      <h1>Login</h1>
      <form className='Login_form' onSubmit={handleSubmit}>
        <input type="email" placeholder='email' required className='Login_input' name='email' value={data.email} onChange={handleChange} />
        <input type="password" placeholder='password' required className='Login_input' name='password' value={data.password} onChange={handleChange} />
        <button type="submit" className='Login_button'>Login</button>
        <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
      </form>
    </div>
  )
}

export default Login