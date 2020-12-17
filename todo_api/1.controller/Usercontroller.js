const db = require('../database/api');

module.exports = {
	register: (req, res) => {
		db.query(
			`insert into list_user (name, password, email) values ('${req.body.username}',  '${req.body.password}', '${req.body.email}')`,
			(err, result) => {
				try {
					if (err) throw err;
					res.send(result)
				} catch (err) {
					console.log(err);
				}
			}
		);
	},

	login: (req, res) => {
		db.query(`select * from list_user where name = "${req.query.username}"`, (err, result) => {
			try {
				if (err) throw err;
				res.send(result)
			} catch (err) {
				console.log(err);
			}
		});
	},

	sendEmail:(req, res) => {
		db.query(``)
	}
}