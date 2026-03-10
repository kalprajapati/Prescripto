import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react';

const SignUp = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  const { token, setToken, backendUrl } = useContext(AppContext);
 
  let submitHandler = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(backendUrl + '/register', { name, email, password })
      console.log(data)
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)

      } else {
        console.log(data.message)
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err);
    }
  
  }

  useEffect(()=>{
    if(token){
      navigate('/login')
    }
  }, [token])

return (
  <div className='w-auto flex flex-col items-center justify-center mt-10'>
    <div className='flex flex-col gap-4 px-4 py-4 md:px-10 md:py-10 rounded-2xl shadow-xl w-full md:w-1/3'>
      <div className='flex flex-col mb-3'>
        <h2 className='text-2xl font-semibold text-gray-700'>SIGN UP</h2>
        <h4 className='text-sm text-gray-700'>Please Sign Up to use our services.</h4>
      </div>
      <div>
        <form onSubmit={submitHandler} method='post' className='flex flex-col gap-5 mb-4 '>

          <input placeholder='Email' name='email' type='text' onChange={(e) => setEmail(e.target.value)} value={email} required className='border px-3 py-1 rounded-sm border-gray-400' />
          <input placeholder='Username' name='username' type='text' onChange={(e) => setName(e.target.value)} value={name} required className='border px-3 py-1 rounded-sm border-gray-400' />
          <input placeholder='Password' name="password" type='password ' value={password} onChange={(e) => { setPassword(e.target.value) }} required className='border px-3 py-1 rounded-sm border-gray-400' />
          <button className='px-3 py-1 rounded-sm bg-amber-400 text-white font-md cursor-pointer hover:bg-amber-500 transition-all duration-50' type='submit'>Sign Up</button>
        </form>

      </div>


      <p className='text-sm'>Already have an account ? <NavLink to='/login' className="text-blue-500 underline hover:text-blue-700">Login now</NavLink></p>
    </div>
    <Footer />
  </div>
)
}

export default SignUp