const db = require("../database/api")

module.exports = {
    getTodo:(req, res) => {
        db.query(`select * from list`, (err, result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
            } 
        })
    },

    deleteTodo:(req, res) => {
        db.query(`DELETE FROM list WHERE idlist = ${req.params.id}`, (err,result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
            }
        })
    },

    addTodo:(req, res) => {
        db.query(`insert into list (todo) value ("${req.body.todo}")`, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    }
}