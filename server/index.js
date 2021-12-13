const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// const db = require('./models');

// Routers
// const postRouter = require('./routes/posts');
// app.use("/posts", postRouter);
//const registeredUsersRouter = require('./routes/registered-users');
//app.use("/auth", registeredUsersRouter);

// db.sequelize.sync().then(() => {
// });

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "LEMONS",
});

app.post('/create', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	db.query("INSERT INTO random (name, age) VALUES (?, ?)", [name, age],
		(err, result) => {
			if(err){
				console.log(err);
			}
			else{
				console.log("Values inserted.");
			}
		}
	);
});

app.get('/get_data', (req, res) => {
	var lst;
	db.query("SELECT * FROM random WHERE name='wews'", function (err, result){
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	})
});

app.listen(3002, () => {
	console.log("Server running on port 3002.");
});