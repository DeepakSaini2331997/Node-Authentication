const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const { connectMongoose } = require("./db")
const userRoute  = require("./routes/userRoute")
dotenv.config();
const app = express()

const PORT = process.env.PORT || 8001
const url = process.env.MONGOOSEURL

connectMongoose(url).then(()=>{
    console.log("DB Connect Successfully")
}).catch((err)=>{
    console.log("Error to connect DB"+err)
})

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use('/api/user',userRoute)

app.get("/",(req,res)=>{
    res.send("hello jwt start")
})

app.listen(PORT,()=>{
    console.log("Connect Successfully on localhost:"+PORT)
})