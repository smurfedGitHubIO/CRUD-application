const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: '',
	database: 'sample'
});

app.post('/create', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	db.query('INSERT INTO sample-table (name, age) VALUES (?, ?)', [name, age], (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Values inserted.");
		}
	});
});

app.listen(8080, () => {
	console.log("Server is running.");
});