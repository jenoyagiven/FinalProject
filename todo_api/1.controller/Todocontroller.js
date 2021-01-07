const db = require("../database/api")

module.exports = {
    getTodo:(req, res) => {
        db.query(`select * from list where idUser = ${req.params.id}`, (err, result) => {
            try {
                if(err) throw err
                res.send(result)
                console.log(req.query.id);
            } catch (err) {
                console.log(err)
                console.log(req.query.id);
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
        db.query(`insert into list (todo, idUser) value ("${req.body.todo}", "${req.body.iduser}")`, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    }
}