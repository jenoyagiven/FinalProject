var express = require("express")
var router = express.Router()
// memakai destructure {} - untuk mengkecilkan kode
const {authController} = require("../1.controller")

router.post("/register", authController.register)
router.get("/login", authController.login)

module.exports = router