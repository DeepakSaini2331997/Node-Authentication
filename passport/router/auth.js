const express = require("express")
const router = express.Router()
const passport = require("passport")


router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/dashboard',(req,res)=>{
    if(req.isAuthenticated()){
        res.render("dashboard",{user:req.user})
    }else{
        res.redirect("login")
    }
})

//Google login
router.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))

router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),
async(req,res)=>{
    res.render("dashboard",{user:req.user})
})

//Github login
router.get('/auth/github',passport.authenticate("github",{scope:["profile","email"]}))

router.get("/auth/github/callback",passport.authenticate("github",{failureRedirect:"/login"}),
async(req,res)=>{
    res.render("dashboard",{user:req.user})
})

router.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/login")
        }
    })
})


module.exports = router