const express = require('express');
const dotEnv = require('dotenv');

dotEnv.config();

const app = express();

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