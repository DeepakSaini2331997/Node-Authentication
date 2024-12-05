const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const session = require("express-session")
const passportSetup = require("./passport")
const ejs = require("ejs")

const passport = require("passport")
const router = require("./router/auth")
const app = express()
const port = process.env.PORT || 3000

app.set("view engine","ejs")
app.use('/public',express.static("./public"))


app.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}//on prod secure is true because of https
}))

app.use(passport.initialize())

app.use(passport.session())

app.use('/',router)

app.listen(port,()=>{
    console.log('Connect Succefully Connected on localhost:'+port)
})