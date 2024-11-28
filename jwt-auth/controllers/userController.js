const {User} = require("../models/userModel")
const bcrypt = require("bcrypt")
const mailer  = require("../helpers/mailer")
const os = require("os")
async function userRegister(req,res){
    try{
        const { name, email, phone, password } = req.body
        const hashPassword = await bcrypt.hash(password,10)
        const imagePath = req.file?req.file.path:null
        console.log(imagePath," my image patheeee"+req.file)
        const newUser = new User({
            name,
            email,
            phone,
            password:hashPassword,
            image:imagePath
        })
        const saveUser = await newUser.save()
        if(saveUser){
            content=`<p> Hi ${name} </br> Please click on <a href="${os.hostname}:${process.env.PORT}/user/verify-mail/${saveUser._id}">verify</a> to verify your Account</p>`;
            mailer.sendMail(email,'Verify Account',content).then(()=>{
                console.log("Mail Successfully send on"+email)
            }).catch((err)=>{
                console.log("send mail error"+err)
            })

            res.status(201).json({
                msg:"Account create Successfully, Please check your mail to verify it",
                data:newUser
            })
        }

    }catch(err){
        res.status(500).json({msg:"User not register "+err})
    }
}

async function verifyMail(req,res){
    try{
        if(req.params.id){
            console.log(req.params.id," my id+++++++")
            const userData = await User.findOne({_id:req.params.id})
            if(userData.is_verified==1){
                return res.render("mail-confirmation",{message:"User is Verified Pls Login"}) 
            }
            if(userData){
                await User.findByIdAndUpdate({_id:req.params.id},{
                    $set:{
                        is_verified:1
                    },
                })
            }
          return res.render("mail-confirmation",{message:"User Verified Pls Login"}) 
        }else{
            res.render("404")
        }
    }catch(err){
       console.log("verify user "+err) 
       return res.render("404")
    }
}

module.exports = {
    userRegister,verifyMail
}