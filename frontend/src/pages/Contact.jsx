import React from 'react'
import { assets_frontend } from '../assets/assets'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Contact = () => {

  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center mt-10 gap-10 justidy-center '>
      <h2 className='text-xl sm:text-2xl text-gray-700'>CONTACT US</h2>
      <div className='flex gap-10 flex-col sm:flex-row justify-center items-center'>
        <div className='sm:w-1/3'>
          <img className='flex-1' src={assets_frontend.contact_image} />
        </div>

        <div className='flex flex-col gap-6'>
          <h3 className='text-gray-700 font-medium text-lg'>OUR OFFICE</h3>
          <div>
            <p className='text-gray-500 sm:text-md'>54709 Willms Station</p>
            <p className='text-gray-500 sm:text-md'>Suite 350, Washington, USA</p>
          </div>

          <div>
            <p className='text-gray-500 sm:text-md'>Tel: (+91) 90330-90280</p>
            <p className='text-gray-500 sm:text-md'>Email: kalprajapati1803@gmail.com</p>
          </div>

          <div>
            <h3 className='text-gray-700 font-medium text-lg'>CAREER AT PRESCRIPTO</h3>
            <p className='text-gray-500 sm:text-md mt-4'>Learn more about our teams and Job openings</p>
            <button onClick={()=>navigate("/")} className='mt-4 px-8 py-3 border cursor-pointer '>Explore Jobs</button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact