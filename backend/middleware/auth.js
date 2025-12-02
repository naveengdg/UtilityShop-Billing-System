import jwt from "jsonwebtoken";

const auth = (req , res , next) => {
    //extract token
    const token = req.header("Authorization")?.replace("Bearer ","");
    
    //if not token(block the user)

    if(!token){
        return res.status(401).json({message:"No token , authorization denied"});
    }

    //check token is valid
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        //now the user can access
        req.user = decode;
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({message:"Token is not valid"});
    }
   
}

export default auth;