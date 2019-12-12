var express = require('express');
var app = express();
// untuk mengconnect ke database
var cors = require('cors');
// untuk bisa ngesend data ke database
var bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./PayProof'));

const port = 2004;
const { authRouter } = require('./2.router');

app.get('/', (req, res) => {
	res.send('send');
});
// install cors, body-parser, nodemon
app.use('/authRouter', authRouter);

// $ npm install mysqljs/mysql express cors body-parser
app.listen(port, () => console.log(" I'm listening"));
