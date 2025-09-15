import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditsRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';

const app = express();

await connectDB();




app.post('/api/stripe',express.raw({type:'application/json'},stripeWebhooks))

const PORT  = process.env.PORT || 8000;


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Server is live")
})
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)
app.use('/api/credit',creditRouter)


app.listen(PORT,()=>{
    console.log("Server started on ",PORT);
})