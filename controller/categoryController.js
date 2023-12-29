import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async( req,res)=>{
 try {
    const {name} = req.body 
    if(!name){
      return   res.send({
            success:false,
            message:"name is required"
        })
    }
    const exisistingCategory = await categoryModel.findOne({name})
    
    if(exisistingCategory){
        return res.send({
            success:true,
            message:"category already exist"
        })
    }

    const category = await new categoryModel({name , slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:"category created",
        category,
    })
 } catch (error) {
    console.log(error)
    res.send({
        success:false,
        message:"error in category"
    })
 }
};

export const udpdateCategoryController  = async(req,res)=>{
   try {
    const {name} = req.body
    const{id} = req.params 
    
    const category = await categoryModel.findById(id,{name,slug:slugify(name)},{new:true})
    res.status(201).send({
        success:true,
        message:"category updated",
        category,
    });
   } catch (error) {
    console.log(error)
    res.send({
        success:false,
        message:"error update in category"
    })
   } 
}

export const categoryController  = async(req,res)=>{
    try{
        const category = await categoryModel.find({})
        res.status(201).send({
            success:true,
            message:"all category",
            category,
        });

    }catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"error in all category"
        })
       } 
}
export const singleCategoryController =async(req,res)=>{
try {
    const {slug} = req.params
    const category = await categoryModel.findOne(slug)
    res.status(201).send({
        success:true,
        message:"all category",
        category,
    });
    
} catch (error) {
    console.log(error)
        res.send({
            success:false,
            message:"error  in single category"
        })  
}
}

export const deleteCategoryController=async(req,res)=>{
    try {
        const{id} =req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted",
        
        });
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"error  in delete category"
        })  
    }
}