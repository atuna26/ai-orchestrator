import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    try{

        let token = req.header("Authorization");
        if(!token) return res.status(401).json({message:"Unauthorized"});
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}