const express = require("express")
const dotenv = require("dotenv")
const session = require("express-session")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const ejs = require("ejs")
const path = require("path")
const passport = require("passport")
const app = express()
const port = process.env.PORT || 3000

app.set("view engine","ejs")
app.use('/public',express.static("./public"))
dotenv.config()

app.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}//on prod secure is true because of https
}))

app.use(passport.initialize())

app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:process.env.callbackURL
},(accessToken,refreshToken,profile,cb)=>{
     cb(null,profile)    
}))

passport.serializeUser((user,cb)=>{
    cb(null,user)
})

passport.deserializeUser((obj,cb)=>{
    cb(null,obj)
})



app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/dashboard',(req,res)=>{
    if(req.isAuthenticated()){
        res.render("dashboard",{user:req.user})
    }else{
        res.redirect("login")
    }
})

app.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),
async(req,res)=>{
    res.render("dashboard",{user:req.user})
})

app.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/login")
        }
    })
})

app.listen(port,()=>{
    console.log('Connect Succefully Connected on localhost:'+port)
})