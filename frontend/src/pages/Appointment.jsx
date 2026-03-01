import React, { useContext, useState } from 'react'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Appointment = () => {

  let { docID } = useParams();
  let { doctors } = useContext(AppContext);

  let[docInfo, setDocInfo] = useState(null);
  
  let fetchDoc = async () => {
    let docInfo = await doctors.find((doc) =>
      doc._id === docID
    )
    setDocInfo(docInfo);
    console.log(docInfo);
  }



  return (
    <>
      <div>Appointment page</div>
      <Footer />
    </>
  )
}

export default Appointment