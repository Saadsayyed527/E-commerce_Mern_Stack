import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// protected routes token base
export const requireSignIn = async(req,res,next)=>{
try {
    const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
  req.user=decode;
    next();
} catch (error) {
    console.log(error);
}}

//admin access 
export const isAdmin =async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1){
            return res.send({
                message:"Unauthorized access"
            })

        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);

    }
}