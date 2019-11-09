const db = require('../database/api');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'jenoyagivenjoy@gmail.com',
		pass: 'joowqmfmbxnjdmdy'
	}
});

module.exports = {
	register: (req, res) => {
		db.query(
			`insert into todouser (username, password, email) values ('${req.body.username}',  '${req.body
				.password}', '${req.body.email}')`,
			(err, result) => {
				try {
					if (err) throw err;
					res.send(result);
				} catch (err) {
					console.log(err);
				}
			}
		);
	},

	login: (req, res) => {
		db.query(
			`select * from todouser where username = "${req.query.username}" and password = "${req.query.password}"`,
			(err, result) => {
				try {
					if (err) throw err;
					res.send(result);
				} catch (err) {
					console.log(err);
				}
			}
		);
	},

	// untuk ngesend link verify ke user
	SendEmail: (req, res) => {
		let to = req.query.email;
		let mailOption = {
			from: 'FollowAdmin',
			to,
			subject: 'verify Email',
			html: `<p>klik <a href="http://localhost:3000/verify?username=${req.query
				.username}">ini</a> untuk verify</p>`
		};
		//negesend ke email users
		if (to) {
			transporter.sendMail(mailOption, (err, info) => {
				if (err) throw err;
				res.send('email ada isi');
			});
		} else {
			// kalau email tidak berhasil terkirim
			res.send('email kosong');
		}
	},

	// ngeverify email
	verify: (req, res) => {
		db.query(`update todouser set isVerified = 1 where username = "${req.query.username}"`, (err, result) => {
			try {
				if (err) throw err;
				res.Redirect('/verifylink');
			} catch (err) {
				console.log(err);
			}
		});
	},

	// untuk mengcheck apa email sudah di verify
	Checkverify: (req, res) => {
		db.query(
			`select * from todouser where isVerified = "${req.query.isVerified}" and username = "${req.query
				.username}"`,
			(err, result) => {
				try {
					if (err) throw err;
				} catch (err) {
					console.log(err);
				}
			}
		);
	}
};
