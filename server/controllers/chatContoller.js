import Chat from "../models/chat.js";

export const createChat= async(req,res)=>{
    console.log("Create chat called");
    try {
        const userId = req.user._id;
        console.log("Create chat called for user:", userId);
        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.firstName
        }
        console.log(chatData);
        await Chat.create(chatData);
        res.json({success:true , message : "Chat Created"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export const getChat= async(req,res)=>{
    try {
        const userId = req.user._id;
        const chats = await Chat.find({userId}).sort({updatedAt:-1})

        res.json({success:true , chats})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const deleteChat= async(req,res)=>{
    try {
        // console.log("Delete chat called",req.user);
        const userId = req.user._id;
        const {chatId} = req.body;

        await Chat.deleteOne({_id:chatId,userId})
        res.json({success:true , message:"chat Deleted"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

