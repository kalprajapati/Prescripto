import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';

const Login = () => {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleEmail = (e) =>{
    e.target.name = e.target.value;
  }

  let submitHandler = (e) =>{
    e.preventDefault();
  }

  let navigate = useNavigate();
  return (
    <div className='w-auto flex flex-col items-center justify-center mt-10'>
      <div className='flex flex-col gap-4 px-4 py-4 md:px-10 md:py-10 rounded-2xl shadow-xl w-full md:w-1/3'>
        <div className='flex flex-col mb-3'>
          <h2 className='text-2xl font-semibold text-gray-700'>LOGIN</h2>
          <h4 className='text-sm text-gray-700'>Please Login to book appointment</h4>
        </div>
        <div>
          <form onSubmit={submitHandler} method='post' className='flex flex-col gap-5 mb-4 '>
            <input placeholder='Email' name='email' type='text'  onChange={(e)=>setEmail(e.target.value)} value = {email} required className='border px-3 py-1 rounded-sm border-gray-400' />
            <input placeholder='Password' name="password" type='password ' value ={password} onChange={(e)=>{setPassword(e.target.value)}} required className='border px-3 py-1 rounded-sm border-gray-400' />
            <button className='px-3 py-1 rounded-sm bg-amber-400 text-white font-md cursor-pointer hover:bg-amber-500 transition-all duration-50' type='submit'>Login</button>
          </form>

        </div>

        
        <p className='text-sm'>Don't have an account? <NavLink to='/signup' className="text-blue-500 underline hover:text-blue-700">sign up now</NavLink></p>
      </div>
      <Footer />
    </div>
  )
}

export default Login