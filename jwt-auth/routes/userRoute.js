const express = require("express")
const router = express.Router()
const {userRegister, verifyMail} = require("../controllers/userController")
const { registerValidator } = require("../helpers/validator")
const { upload} = require("../helpers/upload")

router.post("/register",upload.single('image'),registerValidator,userRegister)
router.get("/verify-mail/:id",verifyMail)

module.exports= router



