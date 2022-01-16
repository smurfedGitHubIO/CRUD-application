const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');
const fs = require('fs');

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
			query = "CREATE TABLE IF NOT EXISTS `registered-users` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `password` VARCHAR(255), `full_name` VARCHAR(255), `age` INT, `address` VARCHAR(255), `email` VARCHAR(255), `usertype` VARCHAR(255), PRIMARY KEY (`id`))";
			db.query(query);
			//players
			query = "CREATE TABLE IF NOT EXISTS `players` (`id` INT AUTO_INCREMENT,`username` VARCHAR(255),`code` VARCHAR(255),PRIMARY KEY (`id`))";
			db.query(query);
			//guardians
			query = "CREATE TABLE IF NOT EXISTS `guardians` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `connections` VARCHAR(255), PRIMARY KEY (`id`))";
			db.query(query);
			//first game stats - emotional game
			query = "CREATE TABLE IF NOT EXISTS `first-game-stats` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date` VARCHAR(255), `level` INT, `time` INT, `mini_game_time` INT, `win_or_lose` INT, `character` VARCHAR(255), `wrong_answers` INT, PRIMARY KEY (`id`))";
			db.query(query);
			//second game stats - communication game
			query = "CREATE TABLE IF NOT EXISTS `second-game-stats`(`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date` VARCHAR(255), `level` INT, `time` INT, `wrong-prompts` INT, `moves` INT, PRIMARY KEY (`id`))";
			db.query(query);
			//third game stats - behavioural game
			query = "CREATE TABLE IF NOT EXISTS `third-game-stats`(`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date` VARCHAR(255), `level` INT, `time` INT, `character` VARCHAR(255), `wrong_clicks` INT, PRIMARY KEY (`id`))";
			db.query(query);
		}
	});
});

//take note, dapat yung date in terms of month-day-year

//sign up function

app.post('/register-new-user', (req, res) => {
	//relevant functions
	function make_code(){
		var code = "";
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for(var i=0; i<26; i++){
			var cur = Math.floor(Math.random()*alphabet.length + 1);
			code += alphabet[cur-1];
		}
		return code;
	}
	//end of relevant functions
	const username = req.body.username;
	const password = req.body.password;
	const full_name = req.body.full_name;
	const age = req.body.age;
	const address = req.body.address;
	const email = req.body.email;
	const usertype = req.body.usertype;
	const connections = req.body.connections;
	db.query("INSERT INTO `registered-users` (username, password, full_name, age, address, email, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, password, full_name, age, address, email, usertype],
		(err, result) => {
			if(err){
				console.log(err);
			}
			else{
				console.log("Values inserted.");
			}
		}
	);
	if(usertype == "Player"){
		db.query("INSERT INTO `players` (username, code) VALUES (?, ?)", [username,make_code()],
			(err, result) => {
				if(err){
					console.log(err);
				}
				else{
					console.log("Values inserted.");
				}
			}
		);
	}
	else{
		var user_connected = "";
		db.query("SELECT * FROM `players` WHERE code = '" + connections + "'", function (err, result) {
				if(err){
					console.log("No user found!");
				}
				else{
					user_connected = result.username;
				}
			}
		);
		db.query("INSERT INTO `guardians` (username, connections) VALUES (?, ?)", [username,connections],
			(err, result) => {
				if(err){
					console.log(err);
				}
				else{
					console.log("Values inserted.");
				}
			}
		);
	}
});

//insert data into first game stats

app.post('/first_game_insert', (req, res) => {
	const username = req.body.username;
	const date = req.body.date;
	const level = req.body.level;
	const time = req.body.time;
	const mini_game_time = req.body.mini_game_time;
	const win_or_lose = req.body.win_or_lose;
	const character = req.body.character;
	const wrong_answers = req.body.wrong_answers;
	db.query("INSERT INTO `first-game-stats` (username, date, level, time, mini_game_time, win_or_lose, character, wrong_answers) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, date, level, time, mini_game_time, win_or_lose, character, wrong_answers],
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
	const date = req.body.date;
	const level = req.body.level;
	const time = req.body.time;
	const wrong_prompts = req.body.wrong_prompts;
	const moves = req.body.moves;
	db.query("INSERT INTO `second-game-stats` (username, date, level, time, wrong_prompts, moves) VALUES (?, ?, ?, ?, ?, ?)", [username, date, level, time, wrong_prompts, moves],
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
	const date = req.body.date;
	const level = req.body.level;
	const time = req.body.time;
	const character = req.body.character;
	const wrong_clicks = req.body.wrong_clicks;
	db.query("INSERT INTO `third-game-stats` (username, date, level, time, character, wrong_clicks) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, date, level, time, character, wrong_clicks],
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

//Log in attempt

app.post('/login_authentication', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	var query = "SELECT * FROM `registered-users` WHERE username = '" + username + "' and password = '" + password + "'";
	db.query(query,
		(err, result) => {
			if(err){
				res.send(false);
			}
			else{
				res.send(true);
			}
			fs.writeFile('username.txt',username, (err) => {
				if(err){
					console.log(err);
				}
				else{
					console.log("success");
				}
			});
		}
	);
});

//password update

app.post('/update_password', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	var query = "UPDATE `registered-users` SET password = '" + password + "' WHERE username = '" + username + "'";
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

//current user getter

app.get('/current_user', (req, res) => {
	var username;
	fs.readFile('username.txt', (err, data) => {
		if(err){
			throw(err);
		}
		else{
			res.send(data.toString());
		}
	});
});

//analysis part

//to do next is analysis tas gawa ng tables

// //first-game-stats getter (emotional)

// app.post('/get_first_game_data', (req, res) => {
// 	const name = req.body.name;
// 	var res_values;
// 	const query = "SELECT * FROM first-game-stats WHERE name = " + name;
// 	db.query(query, function(err, result){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			var games_per_level = [0,0,0,0,0,0,0];
// 			var total_time_per_level = [0,0,0,0,0,0,0];
// 			var total_play_time = 0;
// 			var total_game_attempts = 0;
// 			var wrong_prompts_per_level = [0,0,0,0,0,0,0];
// 			var attempts_per_level = [0,0,0,0,0,0,0];
// 			for(var i=0; i<result.length; i++){
// 				var level = result.level;
// 				var time = result.time;
// 				var wrong_prompts = result.wrong-prompts;
// 				games_per_level[level-1] += 1;
// 				total_time_per_level[level-1] += time;
// 				total_play_time += time;
// 				total_game_attempts += 1;
// 				attempts_per_level[level-1] += 1;
// 				wrong_prompts_per_level[level-1] += wrong_prompts;
// 			}
// 			res_values = {};
// 			res.send(res_values);
// 		}
// 	});
// });

// //second-game-stats getter (communication)

// app.post('/get_second_game_data', (req, res) => {
// 	const name = req.body.name;
// 	var res_values; //average per level, total time for each level, total time, average play time, characters chosen, wrong clicks per level, attempts per level
// 	const query = "SELECT * FROM second-game-stats WHERE name = " + name;
// 	db.query(query, function(err, result){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			var games_per_level = [0,0,0,0,0,0,0];
// 			var total_time_per_level = [0,0,0,0,0,0,0];
// 			var total_play_time = 0;
// 			var total_game_attempts = 0;
// 			var wrong_prompts_per_level = [0,0,0,0,0,0,0];
// 			var attempts_per_level = [0,0,0,0,0,0,0];
// 			for(var i=0; i<result.length; i++){
// 				var level = result.level;
// 				var time = result.time;
// 				var wrong_prompts = result.wrong-prompts;
// 				games_per_level[level-1] += 1;
// 				total_time_per_level[level-1] += time;
// 				total_play_time += time;
// 				total_game_attempts += 1;
// 				attempts_per_level[level-1] += 1;
// 				wrong_prompts_per_level[level-1] += wrong_prompts;
// 			}
// 			var average_time_per_level = [0,0,0,0,0,0,0];
// 			for(var i=0; i<7; i++){
// 				average_time_per_level[i] = total_time_per_level[i]/attempts_per_level[i];
// 			}
// 			res_values = {total_play_time: total_play_time, total_average_play_time: total_play_time/total_game_attempts, average_time_per_level: average_time_per_level, total_time_per_level: total_time_per_level, wrong_prompts_per_level: wrong_prompts_per_level, attempts_per_level: attempts_per_level};
// 			res.send(res_values);
// 		}
// 	});
// });
// //hatiin pa yung wrong prompts

// //third-game-stats getter (behavioural)

// app.post('/get_third_game_data', (req, res) => {
// 	const name = req.body.name;
// 	var res_values; //average per level, total time for each level, total time, average play time, characters chosen, wrong clicks per level, attempts per level
// 	const query = "SELECT * FROM third-game-stats WHERE name = " + name;
// 	db.query(query, function (err, result){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			var games_per_level = [0,0,0,0,0,0,0];
// 			var time_per_level = [0,0,0,0,0,0,0];
// 			var total_play_time = 0;
// 			var total_number_of_games = 0;
// 			var characters = [];
// 			var wrong_clicks = [0,0,0,0,0,0,0];
// 			var attempts_per_level = [0,0,0,0,0,0,0];
// 			res.send(result);
// 			for(var i=0; i<result.length; i++){
// 				var level = result[i].level;
// 				var time = result[i].time;
// 				var character = result[i].character;
// 				var wrong_clicks = result[i].wrong-clicks;
// 				games_per_level[level-1] += 1;
// 				time_per_level[level-1] += time;
// 				var checker = false;
// 				for(var j=0; j<characters.length; j++){
// 					if(characters[i] == character){
// 						checker = true;
// 					}
// 				}
// 				if(!checker){
// 					characters.push(character);
// 				}
// 				wrong_clicks[level-1] += wrong-clicks;
// 			}
// 			var average_time_per_level = [0,0,0,0,0,0,0];
// 			for(var i=0; i<7; i++){
// 				average_time_per_level[i] = time_per_level[i]/games_per_level[i];
// 				total_play_time += time_per_level[i];
// 				total_number_of_games += games_per_level[i];
// 			}
// 			res_values = {average_time_per_level:average_time_per_level, time_per_level:time_per_level, total_play_time:total_play_time, total_average_play_time: total_play_time/total_number_of_games,characters:characters,wrong_clicks:wrong_clicks};
// 			res.send(res_values);
// 		}
// 	});
// });
//di ko gets Number of attempts per level (kasi pwede balikan ang completed na) – average per game use and total since account creation

app.listen(3002, () => {
	console.log("Server running on port 3002.");
});

//to do
//yung data shiz para sa profiles
//tapos yung insert data after ng laro
//update din yung galing sa google docs na sinend ni borrega https://docs.google.com/document/d/1O-oW74QqKDr2iQYaNDX9zeNJ0q5eR4Es/edit