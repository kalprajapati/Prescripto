import mongoose from 'mongoose';

const connectDB = async () => {

   mongoose.connection.on('connected', ()=>{
    console.log("database connected..!")
   }) 

   try{
      await mongoose.connect(`${process.env.MONGODB_URI}/Prescripto`);
   } catch (err){
      console.log(err);
   }
}
  
export default connectDB