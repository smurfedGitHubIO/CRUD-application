const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
});

// create database and tables if it doesn't exist yet,,, VERY IMPORTANT

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

//idk, prolly for experimenting noh?

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

//insert values into the database

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

//sign up function

app.post('/sign_up', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const fullname = req.body.fullname;
	const age = req.body.age;
	const address = req.body.address;
	const email = req.body.email;
	const usertype = req.body.usertype;
	const connection = req.body.connection;
	db.query("INSERT INTO registered-users (username, password, full-name, age, address, email, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, password, fullname, age, address, email, usertype, connection],
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

//insert data into first game stats

app.post('/first_game_insert', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const fullname = req.body.fullname;
	const age = req.body.age;
	const address = req.body.address;
	const email = req.body.email;
	const usertype = req.body.usertype;
	const connection = req.body.connection;
	db.query("INSERT INTO registered-users (username, password, full-name, age, address, email, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, password, fullname, age, address, email, usertype, connection],
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

//insert data into second game stats

app.post('/second_game_insert', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const fullname = req.body.fullname;
	const age = req.body.age;
	const address = req.body.address;
	const email = req.body.email;
	const usertype = req.body.usertype;
	const connection = req.body.connection;
	db.query("INSERT INTO registered-users (username, password, full-name, age, address, email, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, password, fullname, age, address, email, usertype, connection],
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

//insert data into third game stats

app.post('/third_game_insert', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const fullname = req.body.fullname;
	const age = req.body.age;
	const address = req.body.address;
	const email = req.body.email;
	const usertype = req.body.usertype;
	const connection = req.body.connection;
	db.query("INSERT INTO registered-users (username, password, full-name, age, address, email, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, password, fullname, age, address, email, usertype, connection],
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

//to do
//yung data shiz para sa profiles
//tapos yung insert data after ng laro
//update din yung galing sa google docs na sinend ni borrega https://docs.google.com/document/d/1O-oW74QqKDr2iQYaNDX9zeNJ0q5eR4Es/edit
