const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function userRegisterController(req,res){
    const {email,password,name,monthlyIncome} = req.body;
    const isExists = await userModel.findOne({
        email:email
    })
    if(isExists){
        return res.status(422).json({
            message:"user already exists with email",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,password,name,monthlyIncome
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1hr"})
    res.cookie("token",token)
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
            monthlyIncome:user.monthlyIncome
        },
        token:token
    })
  
}

async function userLoginController(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email
    }).select("+password")
    if(!user){
        return res.status(401).json({
            message:"email or password is invalid"
        })
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)
    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
            monthlyIncome:user.monthlyIncome
        },
        token:token
    })
}



module.exports = {userRegisterController,userLoginController}