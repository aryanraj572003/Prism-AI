import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';

const app = express();

await connectDB();

const PORT  = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Server is live")
})

app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)


app.listen(PORT,()=>{
    console.log("Server started on ",PORT);
})