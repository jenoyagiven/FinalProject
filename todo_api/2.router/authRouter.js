var express = require("express")
var router = express.Router()
// memakai destructure {} - untuk mengkecilkan kode
const {Usercontroller, todoController} = require("../1.controller")

// user
router.post("/register", Usercontroller.register)
router.get("/login", Usercontroller.login)
router.get("/sendEmail", Usercontroller.sendEmail)

// todo
router.post("/addtodo", todoController.addTodo)
router.get("/gettodo", todoController.getTodo)
router.delete("/deletetodo/:id", todoController.deleteTodo)

module.exports = router