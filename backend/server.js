import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

//app donfig
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());

//API endpoints

app.get('/', (req, res)=>{
    res.send("API working..! yeahhh!!!");
})

app.listen(port, ()=>{
    console.log(`app listening on port no ${port}`);
})