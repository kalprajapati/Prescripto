import React, { useState } from 'react'
import { assets_frontend } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { useContext } from 'react';


const MyProfile = () => {
  let [isEdit, setIsEdit] = useState(false);
  const {userData, setUserData} = useContext(AppContext)
  console.log(userData.image)
  if(!userData){
    return <p>Loading...!</p>
  }

  return (

    <div className='flex flex-col sm:flex-row gap-3 sm:gap-10 justify-center px-2 py-2'>
      <img className=' border rounded-xl w-full h-full sm:w-1/4 object-cover' src={userData.image} />
      <div className='flex flex-col w-full sm:w-3/4 '>
        {isEdit ? <input type='text' className='border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50' value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} />
          : <p className='text-4xl font-md text-black sm:text-4xl'>{userData.name}</p>
        }
        <hr className='mt-1 mb-2' />

        <p className='text-xl font-md text-gray-500'>Contact Information</p>
        <div className='flex flex-col sm:w-1/2 gap-3 mt-2 text-md text-gray-600  '>
          <div className=' flex  gap-20 items-center'>
            <p className='text-gray-800'>Email id:</p>
            {isEdit ? <input type="email" className='border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50' value={userData.email} onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))} />
              : <p className='text-blue-500'>{userData.email}</p>}
          </div>
          <div className=' flex gap-22 items-center '>
            <p className='text-gray-800'>phone:</p>
            {isEdit ? <input type="tel" className='border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50' value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-500'>{userData.phone}</p>}
          </div>
          <div className=' flex gap-19 items-center ' >
            <p className='text-gray-800'>Address:</p>
            {isEdit ? <div> <input type="text"
              className='mb-2 border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50'
              value={userData.address.line1}
              onChange={(e) => setUserData((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  line1: e.target.value
                }
              }))} placeholder='Line 1' />
              <input type="text"
                className=' border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50'
                value={userData.address.line2}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line2: e.target.value
                  }
                }))}
                placeholder='Line 2' /></div>
              : <div> <p >{userData.address.line1}</p>
                <p>{userData.address.line2}</p></div>}
          </div>
        </div>
        <hr className='mt-2 mb-2' />
        <p className='text-xl font-md text-gray-500' >Basic Information</p>
        <div className='flex flex-col sm:w-1/2 gap-3 mt-2 text-md text-gray-600 '>
          <div className=' flex flex-col gap-2'>
            <div className=' flex  gap-20 items-center'>
              <p className='text-gray-800 '>Gender:</p>
              {isEdit ?
                <select
                  className='border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50'
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}>
                  <option value="male" >male</option>
                  <option value="female" >female</option>
                </select>
                : <p>{userData.gender}</p>
              }
            </div>
          </div>
          <div className=' flex gap-18 items-center'>
            <p className='text-gray-800'>Birthday: </p>
            {
              isEdit ?
                <input
                  className='border-2 w-full sm:w-50 px-1 py-1 rounded-md border-gray-500 focus:outline-none focus:border-2 transition-all duration-50'
                  type='date'
                  value={userData.dob}
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                : <p>{userData.dob}</p>
            }
          </div>
        </div>
        {
          isEdit ?
            <button className='border px-5 py-1 rounded-full w-full sm:w-60 mt-4 cursor-pointer bg-amber-400 text-white ' onClick={() => setIsEdit(false)}>save changes</button>
            : <button className='border px-5 py-1 rounded-full w-full sm:w-60 mt-4 cursor-pointer bg-amber-400 text-white ' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile