var express = require("express")
var app = express()
// untuk mengconnect ke database
var cors = require("cors")
// untuk bisa ngesend data ke database
var bodyParser = require("body-parser")

const port = 2004
const {authRouter} = require("./2.router")
const db = require("./database/api")

app.use(cors())
app.use(bodyParser())

app.get("/", (req,res) => {
    db.query(`select * from list_user`, (err, result) => {
        try{
            if (err) throw err
            res.send('send')
            console.log("lol");
        }catch(err){
            console.log(err);
        }
    })

})
// kalau bikin path di router selalu nyala express.static
app.use(express.static('./public'))

// install cors, body-parser, nodemon

app.use("/authRouter", authRouter)

// $ npm install mysqljs/mysql express cors body-parser
app.listen(port, () => console.log("im listening"))