import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Chat from "../models/chat.js";


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}


export const registerUser = async(req,res) =>{
    const {name,email,password} = req.body;

    try {
        const userExits = await User.findOne({email})
        if(userExits){
            return res.json({success : false , message : "User already exits"})
        }

        const user = await User.create({name,email,password})

        const token = generateToken(user._id)
        res.json({success : true,token:token});
    } catch (error) {
        res.status(404).json({success : false , message : error.message})
    }
}

export const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const token = generateToken(user._id);
                return res.json({success:true , token})
            }
        }
        return res.json({succes:false , message:"Invalid email or passsword"})
    } catch (error) {
        res.json({success : false , message : error.message})

    }
}

export const getUser = async(req,res) =>{
    try{
        const user = req.user;
        return res.json({success : true,user})
    }catch(error){
        return res.json({success:false , message:error.message})
    }
}

export const  getPublishedImages = async (req,res) => {
    try {
        const isPublishedImagesMessages = await Chat.aggregate([
            {$unwind:"$messages"},
            {
                $match:{
                    'messages.isImage':true,
                    'messages.isPublished':true
                }
            },
            {
                $project:{
                    _id:0,
                    imageUrl:"$messages.content",
                    userName:'$userName'
                }
            }
        ])

        res.json({success:true,images:isPublishedImagesMessages.reverse()})
    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}