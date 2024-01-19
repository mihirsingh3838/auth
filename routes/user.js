const express= require('express');
const router= express.Router();

const {login, signup}= require("../controller/auth");
const {auth, isAdmin, isStudent}= require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

//Protected routes
router.get("/student", auth, isStudent, (req, res)=>{
    res.status(200)
    .json({
        success: true,
        message: "You are logged in as a student, welcome to the protected route."
    })
})

router.get("/admin", auth, isAdmin, (req, res)=>{
    res.status(200)
    .json({
        success: true,
        message: "You are logged in as admin, welcome to the protected route."
    })
})

router.get("/test", auth, (req, res)=>{
    res.status(200)
    .json({
        success: true,
        message: "Testing of protected routes"
    })
})


module.exports= router;