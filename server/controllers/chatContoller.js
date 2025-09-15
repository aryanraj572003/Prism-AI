import Chat from "../models/chat.js";

export const createChat= async(req,res)=>{
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.name
        }
        await Chat.create(chatData);
        res.json({Success:true , message : "Chat Created"})
    } catch (error) {
        res.json({Success:false, message:error.message})
    }
}
export const getChat= async(req,res)=>{
    try {
        const userId = req.user._id;
        const chats = await Chat.find({userId}).sort({updatedAt:-1})

        res.json({Success:true , chats})
    } catch (error) {
        res.json({Success:false, message:error.message})
    }
}

export const deleteChat= async(req,res)=>{
    try {
        const userId = req.user._id;
        const {chatId} = req.body;

        await Chat.deleteOne({_id:chatId,userId})
        res.json({Success:true , message:"chat Deleted"})
    } catch (error) {
        res.json({Success:false, message:error.message})
    }
}

