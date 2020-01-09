const db = require('../database/api');
const nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');

// image storage
const storage = multer.diskStorage({
	// mengashi destinasi untuk menyimpan folder
	destination: './Payproof',
	// mengashi data, nama
	filename: function(req, file, cb) {
		cb(null, `${file.originalname}`);
	}
});

// ngefilter file yang tidak gambar
const filterFile = (req, file, cb) => {
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
			`insert into todouser (username, password, email, isVerified, subscription, paymentMethod, creditNumber, expiryDate, securityCode, paymentProof) values ('${req
				.body.username}',  '${req.body.password}', '${req.body
				.email}', '0', "free", "option", "number", "0", "0", "image")`,
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

	uploadPayment: (req, res) => {
		upload(req, res, (err) => {
			if (req) {
				console.log(req.file);
				// mengupload gambar ke database
				db.query(
					`update todouser set paymentProof = "${req.file.filename}", paymentMethod= "${req.body
						.option}", creditNumber= "${req.body.creditNumber}",  securityCode= "${req.body
						.securityCode}", expiryDate = "${req.body.date.slice(0, 15)}" where id = "${req.body.id}"`,
					(err, result) => {
						if (err) throw err;
						res.send(result);
					}
				);
			} else {
				fs.unlinkSync(req.file.path);
				console.log(err);
			}
		});
	},

	uploadImage: (req, res) => {
		upload(req, res, (err) => {
			if (req) {
				console.log(req.body);
				console.log(req.file);
				// mengupload gambar ke database
				db.query(
					`update todouser set paymentProof = "${req.file.filename}", paymentMethod= "${req.body
						.option}", creditNumber= "${req.body.creditNumber}",  securityCode= "${req.body
						.securityCode}" where id = "${req.body.id}"`,
					(err, result) => {
						if (err) throw err;
						res.send('success');
					}
				);
			} else {
				fs.unlinkSync(req.file.path);
				console.log(err);
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

	loginAdmin: (req, res) => {
		db.query(
			`select * from usertable where admin = "${req.query.admin}" and password = "${req.query.password}"`,
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
			} catch (err) {
				console.log(err);
			}
		});
	},

	verifyTransaction: (req, res) => {
		db.query(`update todouser set subscription = "premium" where id="${req.params.id}"`, (err, result) => {
			try{
				if (err) throw err
				res.send(result)
			}catch(err){
				console.log(err);
			}
		})
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
	},
	

	GetUsers: (req, res) => {
		db.query(`select * from todouser`, (err, result) => {
			try {
				if (err) throw err;
				res.send(result);
			} catch (err) {
				console.log(err);
			}
		});
	},

	DeleteUser: (req, res) => {
		db.query(`delete from todouser where id="${req.params.id}"`, (err, result) => {
			try {
				if (err) throw err;
				res.send(result);
			} catch (err) {
				console.log(err);
			}
		});
	}
};
