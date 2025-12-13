import {validationResult} from "express-validator";//validation
import User from "../models/user.js";//database
import bcrypt from "bcryptjs";//hasing (password)
import jwt from "jsonwebtoken";


//register logic

export const registerUser = async (req , res) => {
    const errors = validationResult(req);
    //check if the input field is invalid
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    try{
         //extract user data
    const {name , email , password} = req.body;

    //check if email already exists

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message:"Email Already registered"});
    }
     
    //Hash Password

    const salt = await bcrypt.genSalt(10); //generate random number

    const hashedPassword = await bcrypt.hash(password , salt); // hash the password

    //save user to db
    const newUser = await User.create({
        name,
        email ,
        password:hashedPassword,
    });

    //response to client

    res.status(201).json({
        message:"User registered Successfully",
         user : {
            id:newUser._id,
            name : newUser.name,
            email: newUser.email,
        },
    });

    } catch(err){
        console.error(err);
        res.status(500).json({message : "Server error"});
    }
   
};


//login logic

export const loginUser = async (req , res) => {
    const  errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{
        //destructing method in java
        const {email , password} = req.body;
        
        //check if user exists in the db
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //compare the password

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //generate token

        const token = jwt.sign(
            {id:user._id , email : user.email}, //payload
             process.env.JWT_SECRET, //secret key
            {expiresIn : process.env.JWT_EXPIRE} //token expiry
        );

        //success message to client

        res.json({
            message:"Login Successfull",
            token : token,
            user:{
                id :user._id,
                name:user.name,
                email:user.email
            }
        });
    }
    //if any error
    catch(err){
        console.error(err);
        res.status(400).json({message:"Server error"});
    }
}