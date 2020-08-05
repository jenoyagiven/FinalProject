const db = require('../database/api');

module.exports = {
	register: (req, res) => {
		db.query(
			`insert into user_info (username, password, email) values ('${req.body.username}',  '${req.body.password}', '${req.body.email}')`,
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
		db.query(`select * from user_info where username = "${req.query.username} or email = "${req.query.email}"`, (err, result) => {
			try {
				if (err) throw err;
				res.send(result)
			} catch (err) {
				console.log(err);
			}
		});
	}
}