var express = require("express")
var router = express.Router()


// memakai destructure {} - untuk mengkecilkan kode
const {Usercontroller, todoController} = require("../1.controller")

// user
router.post("/register", Usercontroller.register)
router.get("/verify", Usercontroller.verify)
router.get("/sendEmail", Usercontroller.SendEmail)
router.get("/login", Usercontroller.login)
router.get("/checkusername", Usercontroller.checkUsername)
router.get("/checkemail", Usercontroller.checkEmail)
router.get("/checkVerify", Usercontroller.Checkverify)

// todo
router.post("/addtodo", todoController.addTodo)
router.get("/gettodo", todoController.getTodo)
router.delete("/deletetodo/:id", todoController.deleteTodo)

module.exports = router