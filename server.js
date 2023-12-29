import  express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import  authRouter from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import path from "path";
dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})