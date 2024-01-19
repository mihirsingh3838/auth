const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        //extract jwt token
        const token= req.body.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        //verify incoming token
        try {
            const decode= jwt.verify(token, process.env.JWT_SECRET);

            req.user= decode;
        } catch (error) {
            return res.status(401)
            .json({
                success: false,
                message: "Invalid token"
            })
        }
        next();
    } catch (error) {
        return res.status(401)
        .json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
};

exports.isStudent= (req, res, next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(401)
            .json({
                success: false,
                message: "You are not a student"
            })
        }
        next();
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "User role is not matching"
        })
    }
}


exports.isAdmin= (req, res, next)=>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401)
            .json({
                success: false,
                message: "You are not admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "User role is not matching"
        })
    }
    
}