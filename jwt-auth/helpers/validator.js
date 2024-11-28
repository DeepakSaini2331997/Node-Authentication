const { check } = require("express-validator")

registerValidator = [
    check('name',"Name is required").not().isEmpty(),
    check('email',"Enter valid Email").isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('phone',"Phone should be contains 10 Digit").isLength({
        min:10,
        max:10
    }),
    check('password',"Password must be greater than 6 character,at least one upper letter").isStrongPassword({
        minLength:6,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1
    }),
    check('image').custom((value,{req})=>{
        if(req.file.mimetype==='image/jpeg' || req.filemimetype==='image/png'){
            return true
        }else{
            return false
        }
    }).withMessage("Please upload an image jpeg,png")
]

module.exports = {
    registerValidator
}