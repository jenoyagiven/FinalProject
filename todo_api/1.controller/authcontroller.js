const db = require("../database/api")

module.exports = {
    register: (req, res) => {
        db.query(`insert into todouser (username, password) values ('${req.body.username}', '${req.body.password}')`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    login:(req,res) => {
        db.query(`select * from todouser where username = "${req.query.username}"`,(err, result) => {
            if(err) throw err
           res.send(result)
        })
    }
}
