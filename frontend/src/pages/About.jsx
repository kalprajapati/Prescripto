import React from 'react'
import Footer from '../components/Footer'
import { assets_frontend } from '../assets/assets'
const About = () => {
  return (
    <div className=''>
      <div className='md:mx-16 flex flex-col items-center '>
        <h1 className='mt-6 font-medium text-gray-700 sm:text-xl md:text-2xl'>ABOUT US</h1>
        <div className=' mt-10 flex flex-col items-center md:flex-row md:justify-center md:items-start gap-8 font-light text-gray-600'>
          <div className=' sm:w-2/5 max-w-95 '>
            <img className='flex-1' src={assets_frontend.about_image} />
          </div>

          <div className='sm:w-3/5 flex flex-col gap-8'>
            <p >
              Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>
            <h3 className='font-medium'>OUR VISION</h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>

        <h2 className='mt-12 font-medium text-gray-700 sm:text-xl md:text-2xl'>WHY CHOOSE US</h2>

        <div className="max-w-6xl mx-auto mt-10 border border-gray-300">

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
            <div className='p-10 flex flex-col gap-4'>
              <h2 className='font-medium text-md text-gray-600'>Efficiency:</h2>
              <p className='text-gray-500 font-light'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className='p-10 flex flex-col gap-4'>
              <h2 className='font-medium text-md text-gray-600'>Convenience:</h2>
              <p className='text-gray-500 font-light'>Access to a network of trusted healthcare professionals in your area.</p>
            </div>
            <div className='p-10 flex flex-col gap-4'>
              <h2 className='font-medium text-md text-gray-600'>Personalization</h2>
              <p className='text-gray-500 font-light'>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )

}

export default About