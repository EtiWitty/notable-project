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