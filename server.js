const express = require('express');
const dotEnv = require('dotenv');

dotEnv.config();

const app = express();

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen (PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});