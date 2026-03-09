import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';

//app donfig
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());

//API endpoints
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter )

app.get('/', (req, res)=>{
    res.send("API working..! yeahhh!!!");
})

app.listen(port, ()=>{
    console.log(`app listening on port no ${port}`);
})