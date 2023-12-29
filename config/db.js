 import mongoose from "mongoose";
  

const connectDB = async ()=>{
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/E-commerce")
.then(()=>{
    console.log("database connected")
})
.catch((e)=>{
    console.log(e)
})

        
    } catch (e) {
        console.log(e)  
    }
}

export default connectDB;
// const userSchema = new mongoose.Schema({
//     username: String,
//     password : String,
// });
// const User = mongoose.model("User",userSchema);
