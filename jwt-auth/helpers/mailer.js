const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host:process.env.SMPT_HOST,
    port:process.env.SMPT_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.SMPT_MAIL,
        pass:process.env.SMPT_PASS
    }
})

const sendMail = async(mail,subject,content)=>{
    try{
        var mailOptions ={
            from:process.env.SMPT_MAIL,
            to:mail,
            subject:subject,
            content:content
        }
        
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log('Error to send mail transporter'+err)
            }else{
                console.log("Send mail on "+info.messageId)
            }
        })

    }catch(err){
        console.log("Error to send Mail "+err)
    }
}

module.exports = {
    sendMail
}