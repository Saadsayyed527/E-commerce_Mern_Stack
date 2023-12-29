import  express  from "express";
import {registerController,testController ,loginController,updateProfileController, orderStatusController, getAllOrdersController, getOrdersController} from '../controller/authController.js'
import { requireSignIn ,isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router()

//register route
router.post('/register',registerController)


//login route
router.post('/login',loginController)

//test route
router.get('/test',requireSignIn,isAdmin,testController)


//protected route for user
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});


//protected route for admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//update profile
router.put('/profile',requireSignIn,updateProfileController)


//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router