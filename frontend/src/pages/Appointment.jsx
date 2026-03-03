import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets_frontend } from '../assets/assets';
const Appointment = () => {

  let { docID } = useParams();
  let { doctors, currencySymbol } = useContext(AppContext);
  let [docInfo, setDocInfo] = useState(null);

  let [slots, setSlots] = useState();
  let [selectedDate, setSelectedDate] = useState();
  let [selectedTime, setSelectedTime] = useState();


  let fetchDoc = async () => {
    let docInfo = await doctors.find((doc) =>
      doc._id === docID
    )
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  let generateSlots = () => {
    let tempSlots = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);

      let daySlots = {
        dateObj: date,
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        times: [
          "09:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "03:00 PM",
          "04:00 PM",
        ],
      };

      tempSlots.push(daySlots);
    }
    setSlots(tempSlots);
    setSelectedTime(tempSlots[0].times[0] );
    setSelectedDate(tempSlots[0]);
  }

  console.log(slots);

  useEffect(() => {
    fetchDoc();
  }, [doctors, docID, ''])

  useEffect(() => {
    generateSlots();
  }, [])



  return (

    <div className='flex flex-col justify-center text-gray-700 '>
      {docInfo ? (
        <>
          <div className=' flex flex-col items-center sm:flex-row gap-6 overflow-hidden'>
            <div className='w-full  md:w-1/3 shrink-0 h-full'>
              <img className=' bg-amber-300 rounded-xl h-full object-cover' src={docInfo?.image} />
            </div>

            <div className='flex flex-col md:w-2/3 gap-2 border rounded-xl px-4 py-6 sm:px-8 sm:py-10 border-gray-900 h-auto '>
              <div className='flex gap-3 items-center'>
                <h2 className='text-4xl font-semibold text-gray-700'>{docInfo.name} </h2>
                <img className='w-6' src={assets_frontend.verified_icon} />
              </div>

              <div className='flex flex-col sm:flex-row gap-3 sm:items-center justify-start'>
                <h3>{docInfo.degree} - {docInfo.speciality}</h3>
                <h3 className='border px-5 py-1 rounded-full w-24 '>{docInfo.experience}</h3>
              </div>

              <div className='flex flex-col gap-3 my-4 '>
                <div className='flex items-center gap-2 '>
                  <img className="w-4" src={assets_frontend.info_icon} />
                  <span><p className='text-lg font-semibold'>About</p></span>
                </div>
                <p className=''>
                  {docInfo.about}
                </p>
              </div>
              <h3 className='text-2xl font-ligh' >Appointment Fees:<span className='font-semibold'> {currencySymbol}{docInfo.fees}</span></h3>
            </div>

          </div>
          <div className='flex flex-col my-8 md:ml-108 gap-6' >
            <p className='text-xl font-md text-gray-700'>Booking Slots</p>
            <div className="flex flex-wrap  md:flex-row gap-4 text-gray-500">
              {slots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedDate(item);
                    setSelectedTime(null); // reset time when date changes
                  }}
                  className={`flex flex-col border border-gray-400 w-16 h-24 items-center justify-center rounded-full text-xl cursor-pointer
                  ${(selectedDate === item) ? "bg-amber-400 text-white shadow-md border-white " : "bg-white"}`}
                >
                  <p>{item.day}</p>
                  <p>{item.date}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {selectedDate?.times.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-lg border border-gray-500
                  ${selectedTime === time ? "bg-amber-400 text-white border-white shadow-md" : "text-gray-500"}`}
                >
                  {time}
                </button>
              ))}
            </div>
            <button className='max-w-60 py-3 px-10 rounded-full bg-amber-400 text-white cursor-pointer '>Book Appointment</button>
          </div>
          
        </>
      ) : (
        <p >Loading</p>
      )
      }

      <Footer />
    </div>
  )
}

export default Appointment