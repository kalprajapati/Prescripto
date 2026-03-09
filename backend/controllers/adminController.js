import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
let addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees } = req.body;
        const address = JSON.parse(req.body.address);
        const imgFile = req.file
        console.log(req.body);
        console.log(imgFile);

        //checking for all data to doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Make sure you fill every details..!" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (!imgFile) {
            return res.json({ success: false, message: "Doctor image required" })
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

        // password validation
        if (!passwordRegex.test(password)) {
            return res.json({
                success: false,
                message: "Password must contain uppercase, lowercase, number and special character"
            })
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imgFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: address,
            date: Date.now()
        }

        const newDoc = new doctorModel(doctorData)
        await newDoc.save();

        res.json({ success: true, message: "Doctor Added!" })


    } catch (err) {
        console.log(err)
        res.json({ success: false, message: "error adding doctor!" })
    }
}

export { addDoctor }