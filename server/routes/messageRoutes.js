import express from 'express'
import { protect } from "../middlewares/auth.js";
import { imageMessageController, textMessageContoller } from '../controllers/messageController.js';

const messageRouter = express.Router();


messageRouter.post('/text',protect , textMessageContoller)
messageRouter.post('/image',protect , imageMessageController)

export default messageRouter;