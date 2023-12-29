 import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connect("process.env.MONGO_URL")
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
