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
});

// create database here including the tables

db.connect(() => {
	var query = "CREATE DATABASE IF NOT EXISTS LEMONS";
	db.query(query, (err, result) => {
		if(err){
			console.log(err);
		}
		else{
			query = "USE LEMONS";
			db.query(query);
			//registered-users
			query = "CREATE TABLE IF NOT EXISTS `registered-users` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `password` VARCHAR(255), `full-name` VARCHAR(255), `age` INT, `address` VARCHAR(255), `email` VARCHAR(255), `usertype` VARCHAR(255), PRIMARY KEY (`id`))";
			db.query(query);
			//players
			query = "CREATE TABLE IF NOT EXISTS `players` (`id` INT AUTO_INCREMENT,`username` VARCHAR(255),`daily-star` INT,`weekly-star` INT,`overall-stars` INT,PRIMARY KEY (`id`))";
			db.query(query);
			//guardians
			query = "CREATE TABLE IF NOT EXISTS `guardians` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `connections` VARCHAR(255), PRIMARY KEY (`id`))";
			db.query(query);
			//first game stats
			query = "CREATE TABLE IF NOT EXISTS `first-game-stats` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date` VARCHAR(255), `level` INT, `time` INT, PRIMARY KEY (`id`))";
			db.query(query);
			//second game stats
			query = "CREATE TABLE IF NOT EXISTS `second-game-stats`(`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date` VARCHAR(255), `level` INT, `time` INT, `moves` VARCHAR(255), PRIMARY KEY (`id`))";
			db.query(query);
			//third game stats
			query = "CREATE TABLE IF NOT EXISTS `third-game-stats`(`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date` VARCHAR(255), `level` INT, `time` INT, PRIMARY KEY (`id`))";
			db.query(query);
		}
	});
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

app.post('/insert_data', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	db.query("INSERT INTO registered-users (name, age) VALUES (?, ?)", [name, age],
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

//haven't tried this one yet

app.post('/login_authentication', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	var query = "SELECT * FROM registered-users WHERE username = " + username + " and password = " + password;
	db.query(query,
		(err, result) => {
			if(err){
				res.send(false);
			}
			else{
				res.send(true);
			}
		}
	);
});

app.post('/get_data', (req, res) => {
	const name = req.body.name;
	var lst;
	const query = "SELECT * FROM random WHERE name = " + name;
	db.query(query, function (err, result){
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