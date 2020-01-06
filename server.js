const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');


dotEnv.config();

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req, res, next) => {
	res.send('Hello to Notable');
});

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen (PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

//error-handler middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({
		status: 500,
		message:err.message,
		body: {}
	});
});