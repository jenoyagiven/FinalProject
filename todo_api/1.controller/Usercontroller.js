const db = require('../database/api');
const nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');

// image storage
var storage = multer.diskStorage({
	// mengashi destinasi untuk menyimpan folder
	destination: '../PayProof',
	// mengashi data, nama
	filename: function(req, file, cb) {
		console.log("image");
		cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
	}
});

// ngefilter file yang tidak gambar
var filterFile = (req, file, cb) => {
	if (file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg') {
		cb(null, true);
	} else {
		req.validation = { error: true, msg: 'file must be an image' };
		cb(null, true);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: filterFile
}).single('image');

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
			`insert into todouser (username, password, email, isVerified, subscription) values ('${req.body
				.username}',  '${req.body.password}', '${req.body.email}', '0', "free")`,
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
		upload(req, res, (err) => {
			if (err) {
				console.log(err);

				// // mengupload gambar ke database
				// db.query(
				// 	`update todouser set paymentProof = "${req.query.data.File.name}" where id = "${req.query.id}"`,
				// 	(err, result) => {
				// 		if (err) throw err;
				// 		res.send('success');
				// 	}
				// );
			} else {
				// fs.unlinkSync(req.file.path);
				console.log(req.query.file);
				res.send('test');
			}
		});
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
