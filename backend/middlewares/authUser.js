import jwt from 'jsonwebtoken'
//user authentication middleware

const authUser = async (req, res, next) => {
    try {
        let token = req.headers.token
        if(!token){
            return res.json({
                success: false,
                message: "Not authorized user, login again!"
            })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id
        next();
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message:err.message
        })
    }
}

export default authUser