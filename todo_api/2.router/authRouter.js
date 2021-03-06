var express = require("express")
var router = express.Router()


// memakai destructure {} - untuk mengkecilkan kode
const {Usercontroller, todoController} = require("../1.controller")

// user
router.post("/register", Usercontroller.register)
router.get("/verify", Usercontroller.verify)
router.get("/sendEmail", Usercontroller.SendEmail)
router.get("/login", Usercontroller.login)
router.get("/loginAdmin", Usercontroller.loginAdmin)
router.get("/checkusername", Usercontroller.checkUsername)
router.get("/checkemail", Usercontroller.checkEmail)
router.get("/checkVerify", Usercontroller.Checkverify)
router.get("/GetUsers", Usercontroller.GetUsers)
router.patch("/upload", Usercontroller.uploadPayment)
router.patch("/verfiyTran/:id", Usercontroller.verifyTransaction)
router.delete("/deleteUser/:id", Usercontroller.DeleteUser)

// todo
router.post("/addtodo", todoController.addTodo)
router.get("/gettodo", todoController.getTodo)
router.delete("/deletetodo/:id", todoController.deleteTodo)
router.patch("/setAlarm", todoController.setAlarm)
router.patch("/RingRing/:id", todoController.RingRing)

module.exports = router