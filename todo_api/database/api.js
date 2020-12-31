var mysql = require("mysql")

const db = mysql.createConnection({
    user:"root",
    password:"password",
    database:"todolist",
    host: "localhost"
})

module.exports = db