const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination:((req,file,cb)=>{
        cb(null,path.join(__dirname,"../public/upload/images"))
    }),
    filename:((req,file,cb)=>{
        const name = Date.now()+'-'+file.originalname
        console.log("image name in upload "+name)
        cb(null,name)
    })

})

const upload = multer({storage:storage})

module.exports = {
    upload
}