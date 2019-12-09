const db = require('../database/api');
const nodemailer = require('nodemailer');
const fs = require('fs');

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
			`insert into todouser (username, password, email, isVerified, subscription) values ('${req.body.username}',  '${req.body.password}', '${req.body.email}', '0', "free")`,
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

	uploadImage: (req, res) => {
		try {
			console.log(req.params.data.file);
			//// mengupload gambar ke database
			// db.query(`update todouser set paymentProof = "${req.query.data.File.name}" where id = "${req.query.id}"`, (err, result) => {
			// 	if (err) throw err;
			// 	res.send('success');
			// });
		} catch (error) {
			// fs.unlinkSync(req.file.path);
			console.log(error);
		}
	},

	login: (req, res) => {
		db.query(
			//kalau satu kosong semua false
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

	checkUsername: (req, res) => {
		db.query(`select * from todouser where username = "${req.query.username}"`, (err, result) => {
			try {
				if (err) throw err;
				res.send(result);
			} catch (err) {
				console.log(err);
			}
		});
	},

	checkEmail: (req, res) => {
		db.query(`select * from todouser where email = "${req.query.email}"`, (err, result) => {
			try {
				if (err) throw err;
				res.send(result);
			} catch (err) {
				console.log(err);
			}
		});
	},

	// untuk ngesend link verify ke user
	SendEmail: (req, res) => {
		let to = req.query.email;

		let mailOption = {
			from: 'FollowAdmin',
			to,
			subject: 'verify Email',
			html: `<p>klik <a href="http://localhost:2004/authRouter/verify?username=${req.query
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
				res.redirect('http://localhost:3000/verifyLink');
				res.send(result);
			} catch (err) {
				console.log(err);
			}
		});
	},

	// untuk mengcheck apa email sudah di verify
	Checkverify: (req, res) => {
		db.query(
			`select * from todouser where isVerified = "1" and username = "${req.query.username}"`,
			(err, result) => {
				try {
					if (err) throw err;
					res.send(result);
				} catch (err) {
					console.log(err);
				}
			}
		);
	}
};
