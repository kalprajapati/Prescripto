import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
//API to register user

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body
        console.log(name, email, password)

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "fill all the fields"
            })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //checks if user exists or not 
        const userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.json({
                success: false,
                message: "User already exists with this email"
            })
        }

        // password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
        if (!passwordRegex.test(password)) {
            return res.json({
                success: false,
                message: "Password must contain uppercase, lowercase, number and special character"
            })
        }
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPass
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        //creating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({
            success: true,
            token: token
        })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "error in registering user"
        })
    }
}

//API for user login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({
                success: true,
                message: "Login successful!",
                token
            })
        } else {
            res.json({
                success: false,
                message: "invalid credentials!"
            })
        }

    } catch (err) {
        console.log(err)
        res.send({ success: false, message: err.message })
    }
}

let getProfile = async (req, res) => {
    try {
        let userId = req.userId

        const userData = await userModel.findById(userId).select('-password')
        res.status(200).json({
            success: true,
            userData
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId
        console.log(userId)
        const { name, phone, address, dob, gender } = req.body
        const imgFile = req.file
        console.log(req.file)
        console.log(req.body.image)
        if (!name || !gender || !phone || !dob) {
            return res.json({
                success: false,
                message: "fill all fields"
            })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imgFile) {
            //upload img to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imgFile.path, { resource_type: 'image' })
            console.log(imageUpload)
            const imgUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imgUrl })
        }
        res.json({
            success: true,
            message: 'Profile updated'
        })
    } catch (err) {
        console.log(err.message)
        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}

export { registerUser, loginUser, getProfile, updateProfile }