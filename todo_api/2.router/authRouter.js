var express = require("express")
var router = express.Router()
var multer = require('multer');
var fs = require('fs');

// memakai destructure {} - untuk mengkecilkan kode
const {Usercontroller, todoController} = require("../1.controller")


// image storage
var storage = multer.diskStorage({
	// mengashi destinasi untuk menyimpan folder
	destination: function(req, files, cb) {
		cb(null, '../PayProof');
	},
	// mengashi data, nama
	filename: function(req, file, cb) {
		cb(null, `${Date.now()}.${file.type.split('/')[1]}`);
	}
});

// ngefilter file yang tidak gambar
var filterFile = (req, file, cb) => {
	if (file.type.split('/')[1] == 'png' || file.type.split('/')[1] == 'jpeg') {
		cb(null, true);
	} else {
		req.validation = { error: true, msg: 'file must be an image' };
		cb(null, true);
	}
};

var upload = multer({
	storage: storage,
	fileFilter: filterFile
})


// user
router.post("/register", Usercontroller.register)
router.get("/verify", Usercontroller.verify)
router.get("/sendEmail", Usercontroller.SendEmail)
router.get("/login", Usercontroller.login)
router.get("/checkusername", Usercontroller.checkUsername)
router.get("/checkemail", Usercontroller.checkEmail)
router.get("/checkVerify", Usercontroller.Checkverify)
router.patch("/uploadImage", upload.single("image"), Usercontroller.uploadImage)

// todo
router.post("/addtodo", todoController.addTodo)
router.get("/gettodo", todoController.getTodo)
router.delete("/deletetodo/:id", todoController.deleteTodo)

module.exports = router