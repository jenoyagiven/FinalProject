var mysql = require("mysql")

const db = mysql.createConnection({
    user:"root",
    password:"password",
    database:"todolist",
    host: "localhost",
    insecureAuth : true
})

module.exports = db