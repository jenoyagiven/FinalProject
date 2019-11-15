var express = require("express")
var app = express()
// untuk mengconnect ke database
var cors = require("cors")
// untuk bisa ngesend data ke database
var bodyParser = require("body-parser")
var multer = require('multer')
var fs = require("fs")

const port = 2004
const {authRouter} = require("./2.router")

app.use(cors())
app.use(bodyParser())
app.use("/files", express.static('PayProof'))

// membikin object untuk ngestore data
let multerStorageConfig = multer.diskStorage({
    destination:(req, files, cb) => {
        // ngesend data ke folder uploads
        cb(null, './PayProof')
    },

    // mengashi data nama
    filename:(req, file, cb) => {
        cb(null, `prd-${Date.now()}.${file.mimetype.split("/")[1]}`)
    }

})

let filterConfig = (req, file, cb) => {
    if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg'){
        cb(null, true)
    }else{
        req.validation = {error: true, msg: "file must be an image"}
        cb(null, false)
    }
}

// memasuk function ke dalam object
let uploads = multer({
    storage: multerStorageConfig,
    fileFilter:filterConfig
})

// ngeupload image ke sql
app.post("/uploadimage", uploads.single("aneh"), (req,res) => {
    // console.log(req);
     try{
    //untuk mengashi syarat untuk mengupload file, dan menanda error
    if(req.validation) throw req.validation       
    if(req.file.size > 5) throw {error: true, message: "image size to large"}
    let data = JSON.parse(req.body.data)
    

    db.query(`insert into manage_product values (0, "testing product", '${req.file.path.replace("uploads", "files")}')`, (err, result) => {
        if(err) throw err
        res.send("success")
    })

    }catch(error){
        fs.unlinkSync(req.file.path)
        console.log(error);
        
    }


})

app.get("/", (req,res) => {
    res.send('send')
})
// kalau bikin path di router selalu nyala express.static
app.use(express.static('./public'))

// install cors, body-parser, nodemon
app.use("/authRouter", authRouter)

// $ npm install mysqljs/mysql express cors body-parser
app.listen(port, () => console.log(" I'm listening"))