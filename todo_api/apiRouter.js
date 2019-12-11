var express = require('express');
var app = express();
// untuk mengconnect ke database
var cors = require('cors');
// untuk bisa ngesend data ke database
var bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./PayProof'));


// image storage
const storage = multer.diskStorage({
	// mengashi destinasi untuk menyimpan folder
	destination: './Payproof/',
	// mengashi data, nama
	filename: function(req, file, cb) {
		console.log('image');
		cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
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
});

const port = 3000;
const { authRouter } = require('./2.router');

app.post('/upload', upload.single('image'), (req, res) => {
	console.log(req);
	res.send("patch")
});

app.get('/', (req, res) => {
	res.send('send');
});
// install cors, body-parser, nodemon
app.use('/authRouter', authRouter);

// $ npm install mysqljs/mysql express cors body-parser
app.listen(port, () => console.log(" I'm listening"));
