const GoogleStrategy = require("passport-google-oauth20").Strategy
const GithubStrategy = require("passport-github2").Strategy
const passport = require("passport")


// For Google OAuth2.0
passport.use(new GoogleStrategy({
    clientID:process.env.GoogleclientID,
    clientSecret:process.env.GoogleclientSecret,
    callbackURL:process.env.callbackURL
},(accessToken,refreshToken,profile,cb)=>{
     cb(null,profile)    
}))

// For Github OAuth2.0
passport.use(new GithubStrategy({
    clientID:process.env.GithubclientID,
    clientSecret:process.env.GithubclientSecret,
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

