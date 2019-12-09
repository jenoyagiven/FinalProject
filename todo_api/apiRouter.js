var express = require('express');
var app = express();
// untuk mengconnect ke database
var cors = require('cors');
// untuk bisa ngesend data ke database
var bodyParser = require('body-parser');

const port = 2004;
const { authRouter } = require('./2.router');

app.use(cors());
app.use(bodyParser());
app.use('/files', express.static('PayProof'));

app.get('/', (req, res) => {
	res.send('send');
});
// kalau bikin path di router selalu nyala express.static
app.use(express.static('./public'));

// install cors, body-parser, nodemon
app.use('/authRouter', authRouter);

// $ npm install mysqljs/mysql express cors body-parser
app.listen(port, () => console.log(" I'm listening"));
