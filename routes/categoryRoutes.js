import  express  from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController,deleteCategoryController,singleCategoryController,categoryController,udpdateCategoryController } from "../controller/categoryController.js";

const router = express.Router()


//create category
router.post('/create-category',requireSignIn,createCategoryController)


//update category
router.put('/update-category/:id',requireSignIn,isAdmin,udpdateCategoryController)

//All category 

router.get("/get-category",categoryController)

//single category 
router.get("/single-category/:slug",singleCategoryController)

// delete
router.delete("/delete-category/:id", requireSignIn,isAdmin,deleteCategoryController)


export default router