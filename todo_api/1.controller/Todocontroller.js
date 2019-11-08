const db = require("../database/api")

module.exports = {
    getTodo:(req, res) => {
        db.query(`select * from actualtodo`, (err, result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
            } 
        })
    },

    deleteTodo:(req, res) => {
        db.query(`DELETE FROM actualtodo WHERE todo = "${req.params.id}"`, (err,result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
            }
        })
    },

    addTodo:(req, res) => {
        db.query(`insert into actualtodo (todo, iduser) value ("${req.body.todo}", "${req.body.iduser}")`, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    }
}