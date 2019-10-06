var mysql = require("mysql")

const db = mysql.createConnection({
    user:"root",
    password:"password",
    database:"todo_follow",
    host: "localhost"
})

module.exports = db