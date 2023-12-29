
import { compairePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"
import JWT from "jsonwebtoken";
export const registerController = async (req,res)=>{
try {
    const{name,email,password,phone,address} = req.body

    if(!name){
        return res.send({message:"name reqiured"})
    }
    if(!email){
        return res.send({message:"name reqiured"})
    }  if(!password){
        return res.send({message:"name reqiured"})
    }  if(!phone){
        return res.send({message:"name reqiured"})
    }  if(!address){
        return res.send({message:"name reqiured"})
    }

    // for existing users 
    const exitUser = await  userModel.findOne({email})

    if(exitUser){
        return res.send({
            message:"allready registered"
        })
    }
     
    // register new user
    const hashedPass = await hashPassword(password)
 
    const user = await new userModel({
        name,email,phone , address,password:hashedPass
    }).save();
    res.status(201).send({
        success:true,
        message:"user register okay",
        user
    })
} catch (error) {
    console.log(error)
}
};


// post login

export const loginController = async(req,res)=>{
try {
    const{email,password}= req.body

    //validation 
    if(!email || !password){
        return res.send({
            success: false,
            message:"invalid email or password"
        })
    }

    //check user
  const user = await userModel.findOne({email})
  if(!user){
    return res.send({
        success: false,
        message:"email not register"
    })
  }
    const match = await compairePassword(password,user.password)

    if(!match){
        return res.send({
            success: false,
            message:"invalid password"
        })
    }
     
    // now user is verified 
    // token
    const token = await JWT.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.send({
        message:"login successfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
        token,
    })




} catch (error) {
   console.log(error) 
   res.send({
    message:"login error"
   })
}

};

//test controller
export const testController = (req,res)=>{
    res.send(' test route');
};


//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

  
//orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };