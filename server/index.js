const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');
const fs = require('fs');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
});

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
			query = "CREATE TABLE IF NOT EXISTS `first-game-stats` (`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date1` VARCHAR(255), `level1` INT, `time1` INT, `mini_game_time` INT, `win_or_lose` INT, `character1` VARCHAR(255), `wrong_answers` INT, PRIMARY KEY (`id`))";
			db.query(query);
			//second game stats - communication game
			query = "CREATE TABLE IF NOT EXISTS `second-game-stats`(`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date1` VARCHAR(255), `level1` INT, `time1` INT, `wrong_prompts` INT, `moves` INT, PRIMARY KEY (`id`))";
			db.query(query);
			//third game stats - behavioural game
			query = "CREATE TABLE IF NOT EXISTS `third-game-stats`(`id` INT AUTO_INCREMENT, `username` VARCHAR(255), `date1` VARCHAR(255), `level1` INT, `time1` INT, `character1` VARCHAR(255), `wrong_clicks` INT, PRIMARY KEY (`id`))";
			db.query(query);
		}
	});
});

//relevant preliminary code

var current_username = "jcfrongoso";
var total_time_emotional = 0;
var total_time_communicational = 0;
var total_time_behavioural = 0;

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
		db.query("SELECT * FROM `players` WHERE code = '" + connections + "'", function (err, result) {
				if(err){
					console.log("No user found!");
				}
				else{
					console.log(result[0].username);
					fs.writeFile('guardian.txt', result[0].username, (err2) => {
						if(err2){
							console.log(err2);
						}
						else{
							console.log("Connection made.");
						}
					});
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
	db.query("INSERT INTO `first-game-stats` (username, date1, level1, time1, mini_game_time, win_or_lose, character1, wrong_answers) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, date, level, time, mini_game_time, win_or_lose, character, wrong_answers],
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
	db.query("INSERT INTO `second-game-stats` (username, date1, level1, time1, wrong_prompts, moves) VALUES (?, ?, ?, ?, ?, ?)", [username, date, level, time, wrong_prompts, moves],
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
	db.query("INSERT INTO `third-game-stats` (username, date1, level1, time1, character1, wrong_clicks) VALUES (?, ?, ?, ?, ?, ?, ?)", [username, date, level, time, character, wrong_clicks],
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
			fs.writeFile('username.txt',username, (err3) => {
				if(err3){
					console.log(err3);
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

//get users list

app.get('/users_list', (req, res) => {
	var query = "SELECT * FROM `registered-users`";
	db.query(query, (err, result) => {
			if(err){
				console.log(err);
			}
			else{
				res.send(result);
			}
		}
	);
});

//get personal data

app.get('/get_personal_data', (req, res) => {
	var query = "SELECT * FROM `registered-users` WHERE username = '" + current_username + "'";
	db.query(query, (err, result) => {
			if(err){
				console.log(err);
			}
			else{
				res.send(result[0]);
			}
		}
	);
});

//get guardian's connection

app.get('/get_guardians_connection', (req, res) => {
	fs.readFile('guardian.txt', (err, data) => {
		if(err){
			throw err;
		}
		else{
			res.send(data.toString());
		}
	});
});

//analysis part

app.get('/get_first_data_sample', (req, res) => {
	const query = "SELECT * FROM `first-game-stats` WHERE username = '" + current_username + "'";
	db.query(query, function(err, result){
		if(err){
			throw(err);
		}
		else{
			res.send(result);
		}
	});
});

app.get('/get_first_game_data', (req, res) => {
	const houses = ["joyful", "angry", "disgusted", "fear", "sad", "surprised"];
	const analysis = {
		"mini_game_playtime" : ["The decreasing time that this player spends in playing the mini-game per game use may mean that he/she is progressively learning about the concept of the six basic emotions. This may also mean that he/she is a fast learner, or that he/she just does not want to do the same thing repeatedly (easy to become bored at something done repeatedly), which may be because he/she does not enjoy it.", "The increasing time that this player spends in playing the mini-game per game use may mean that he/she is struggling to learn about the concept of the six basic emotions such that he/she needs to be familiarized about it repeatedly. This may also mean that he/she is a slow learner, or that he/she just wants to do the same thing repeatedly because he/she enjoys it.", "Since the amount of time that this player spends in playing the mini-game per game use shows neither an increasing nor decreasing pattern, it may mean that the player is struggling to remember or learn about the concepts of the six basic emotions. It may also mean that the player does not seriously play it or the player does something else at some times, which can be both caused by the player being easily distracted.", "Insufficient data."],
		"whole_game_play_time" : ["The decreasing time that this player spends in playing this game per website use may mean that the player is progressively learning how to respond to people when they are feeling certain emotions. This may also mean the he/she is losing interest in playing the game, maybe because he/she has already learned about the lessons of the game, or because he/she is struggling to play the game - these cases may mean that the player is either a fast or slow learner.", "The increasing time that this player spends in playing this game per website use may mean that the player is struggling to learn how to respond to people when they are feeling certain emotions. This may also mean the he/she is gaining interest in playing the game as time goes by, maybe because he/she is still not contented with what he/she has learned about the lessons of the game or because he/she is struggling to play the game and just likes to challenge himself/herself - these cases may mean that the player is either a fast or slow learner, or that he/she likes to challenge himself/herself.", "Since the amount of time that this player spends in playing the game shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player is struggling to remember and learn how to respond to people when they are feeling certain emotions.", "Insufficient data."],
		"character_chosen" : ["The uniformity of selections for character n may mean that the player only likes to stick to one option (his/her first choice), perhaps because this is his/her favorite. It may mean that the player is not interested in trying other different things and that he/she likes to follow only one routine. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The selections between the two characters may mean that the player likes a little variation and that the player likes to experience something new from time to time; it may also mean that the player is easy to become bored from something. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The variation of selections may mean that the player is explorative and that he/she is open to try and experience new things. Also, the collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "Insufficient data."]
	};
	const valuable_username = req.name;
	const query = "SELECT * FROM `first-game-stats` WHERE username = '" + valuable_username + "'";
	db.query(query, function(err, result){
		if(err){
			throw err;
		}
		else{
			//relevant functions
			function isIncOrDec(listHere){
				var isIncreasingOrDecreasing = 0;
				if(listHere.length <= 1){
					return 3;
				}
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] > listHere[i-1]){
							isIncreasingOrDecreasing = 1;
						}
						else{
							isIncreasingOrDecreasing = 0;
						}
					}
					else{
						if(listHere[i] >= listHere[i-1] && isIncreasingOrDecreasing == 0){
							return 2;
						}
						else if(listHere[i] <= listHere[i-1] && isIncreasingOrDecreasing == 1){
							return 2;
						}
					}
				}
				return isIncreasingOrDecreasing;
			}
			function specialAnalysisPerHouseTotalPlayTime(current_index, level){
				var ans;
				if(current_index == 0){
					ans = "The decreasing time that this player spends in playing this house per game use may mean that he/she is getting less interested in playing this particular house, which may be due to the player being bored at doing something repeatedly after some time. It may also mean that the player has progressively learned how to respond to people when they are feeling " + houses[level] + " , thus he/she spends lesser time in playing this house; this may mean that he/she is a fast learner.";
				}
				else if(current_index == 1){
					ans = "The increasing time that this player spends in playing this house per game use may mean that he/she is getting more interested in playing this particular house, which may be due to the player being challenged by this house. On the other hand, it may mean that the player is struggling to learn how to respond to people when they are feeling " + houses[level] + "; this may mean that the player is a slow learner.";
				}
				else if(current_index == 2){
					ans = "Since the amount of time that this player spends in playing this house per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task.";
				}
				else{
					ans = "Insufficient data.";
				}
				return ans;
			}
			function specialAnalysisWinningGamesPlaytime(current_index, level){
				var ans;
				if(current_index == 0){
					ans = "The decreasing time that this player spends in order to successfully complete this house per game use may mean that the player is progressively learning how to respond to people when they are feeling " + houses[level] + ". This may also mean that he/she is a fast learner, at least for the lessons, taught in this house.";
				}
				else if(current_index == 1){
					ans = "The increasing time that this player spends in order to successfully complete this house per game use may mean that the player is struggling to learn how to respond to people when they are feeling " + houses[level] + ". This may also mean that he/she is a slow learner, at least for the lessons taught in this house.";
				}
				else if(current_index == 2){
					ans = "Since the amount of time that this player spends to successfully complete this house per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player is struggling to remember and learn how to respond to people when they are feeling " + houses[level] + ".";
				}
				else{
					ans = "Insufficient data.";
				}
				return ans;
			}
			function specialAnalysisNumberOfTriesBeforeCompletionPerHouse(current_index, level){
				var ans;
				if(current_index == 0){
					ans = "The decreasing number of attempts that this player does to successfully complete this house may mean that the player is progressively learning how to respond to people when they are feeling " + houses[level] + ". This may also mean that the player is a fast learner.";
				}
				else if(current_index == 1){
					ans = "The increasing number of attempts that this player does to successfully complete this house may mean that the player is struggling to learn how to respond to people when they are feeling " + houses[level] + ". This may also mean that the player is a slow learner.";
				}
				else if(current_index == 2){
					ans = "Since the number of attempts that the player does to successfully complete this house does shows neither an increasing nor decreasing pattern, it may mean that the player is struggling to remember or learn how to respond to people when they are feeling " + houses[level] + ". It may also mean that the player plays this house randomly or that he/she does not seriously play it.";
				}
				else{
					ans = "Insufficient data.";
				}
				return ans;
			}
			function specialAnalysisAverageNumberOfWrongAnswersPerHouse(current_index, level){
				var ans;
				if(current_index == 0){
					ans = "The decreasing average number of wrong answers per attempt may mean that this player is progressively learning how to properly respond to people when they are feeling " + houses[level] + ". This may also mean that the player is a slow learner since he/she cannot easily learn or remember the choices that should not be chosen.";
				}
				else if(current_index == 1){
					ans = "The increasing average number of wrong answers per attempt may mean that this player is struggling to learn how to properly respond to people when they are feeling " + houses[level] + ". This may also mean that he/she is a slow learner, at least for the lessons taught in this house.";
				}
				else if(current_index == 2){
					ans = "Since the average number of wrong answers per attempt that the player commits to this house shows neither an increasing nor decreasing pattern, it may mean that the player is still struggling to remember or learn how to respond to people when they are feeling " + houses[level] + ". It may also mean that the player plays this house randomly or that he/she does not seriously play it.";
				}
				else{
					ans = "Insufficient data.";
				}
				return ans;
			}
			//end of relevant functions
			//relevant variables
			var time_per_minigame = [];
			var time_per_house_win_or_lose = [[], [], [], [], [], []];
			var time_per_house_win_only = [[], [], [], [], [], []];
			var total_time_for_playing_the_whole_game = [];
			var characters_chosen_count = {};
			var characters_count = 0;
			var tries_before_completion_per_house = [[], [], [], [], [], []];
			var number_of_wrong_answers_per_house = [[], [], [], [], [], []];
			var number_of_games_per_house = [[], [], [], [], [], []];
			var latest_date;
			var latest_level = -1;
			var try_counter = 0, wrong_answers_counter = 0;
			//end of relevant variables
			//main loop function
			for(var i=0; i<result.length; i++){
				//note: change level to house
				var level1 = result[i].level1;
				var time1 = result[i].time1;
				var date1 = result[i].date1;
				var character1 = result[i].character1;
				var wrong_answers = result[i].wrong_answers;
				var minigame_time = result[i].mini_game_time;
				var win = result[i].win_or_lose;
				total_time_emotional += time1;
				time_per_minigame.push(minigame_time);
				time_per_house_win_or_lose[level1-1].push(time1);
				total_time_for_playing_the_whole_game.push(time1);

				if(win == 1){
					time_per_house_win_only[level1-1].push(time1);
				}
				if(characters_chosen_count[character1] == undefined){
					characters_chosen_count[character1] = 1;
					characters_count += 1;
				}
				else{
					characters_chosen_count[character1] += 1;
				}
				if(i == 0){
					latest_date = date1;
					latest_level = level1;
					if(win){
						tries_before_completion_per_house[level1-1].push(try_counter);
						try_counter = 1;
					}
					else{
						try_counter = 1;
					}
					wrong_answers_counter = wrong_answers;
				}
				else{
					if(date1 == latest_date && latest_level == level1){
						if(win == 1){
							tries_before_completion_per_house[level1-1].push(try_counter);
							try_counter = 1;
						}
						else{
							try_counter += 1;
						}
						wrong_answers_counter += wrong_answers;
					}
					else{
						latest_date = date1;
						number_of_wrong_answers_per_house[latest_level-1].push(wrong_answers_counter/try_counter);
						latest_level = level1;
						if(win == 1){
							tries_before_completion_per_house[level1-1].push(try_counter);
							try_counter = 1;
						}
						else{
							try_counter += 1;
						}
						wrong_answers_counter = wrong_answers;
					}

				}
			}
			//analysis
			var result_values = {"mini-game-time" : [time_per_minigame, analysis["mini_game_playtime"][isIncOrDec(time_per_minigame)]],
			"house-play-time-house-joy" : [time_per_house_win_or_lose[0], specialAnalysisPerHouseTotalPlayTime(isIncOrDec(time_per_house_win_or_lose[0]), 0)],
			"house-play-time-house-anger" : [time_per_house_win_or_lose[1], specialAnalysisPerHouseTotalPlayTime(isIncOrDec(time_per_house_win_or_lose[1]), 1)],
			"house-play-time-house-disgust" : [time_per_house_win_or_lose[2], specialAnalysisPerHouseTotalPlayTime(isIncOrDec(time_per_house_win_or_lose[2]), 2)],
			"house-play-time-house-fear" : [time_per_house_win_or_lose[3], specialAnalysisPerHouseTotalPlayTime(isIncOrDec(time_per_house_win_or_lose[3]), 3)],
			"house-play-time-house-sadness" : [time_per_house_win_or_lose[4], specialAnalysisPerHouseTotalPlayTime(isIncOrDec(time_per_house_win_or_lose[4]), 4)],
			"house-play-time-house-surprise" : [time_per_house_win_or_lose[5], specialAnalysisPerHouseTotalPlayTime(isIncOrDec(time_per_house_win_or_lose[5]), 5)],
			"house-play-time-win-only-house-joy" : [time_per_house_win_only[0], specialAnalysisWinningGamesPlaytime(isIncOrDec(time_per_house_win_only[0]),0)],
			"house-play-time-win-only-house-anger" : [time_per_house_win_only[1], specialAnalysisWinningGamesPlaytime(isIncOrDec(time_per_house_win_only[1]),1)],
			"house-play-time-win-only-house-disgust" : [time_per_house_win_only[2], specialAnalysisWinningGamesPlaytime(isIncOrDec(time_per_house_win_only[2]),2)],
			"house-play-time-win-only-house-fear" : [time_per_house_win_only[3], specialAnalysisWinningGamesPlaytime(isIncOrDec(time_per_house_win_only[3]),3)],
			"house-play-time-win-only-house-sadness" : [time_per_house_win_only[4], specialAnalysisWinningGamesPlaytime(isIncOrDec(time_per_house_win_only[4]),4)],
			"house-play-time-win-only-house-surprise" : [time_per_house_win_only[5], specialAnalysisWinningGamesPlaytime(isIncOrDec(time_per_house_win_only[5]),5)],
			"game-play-time" : [total_time_for_playing_the_whole_game, analysis["whole_game_play_time"][isIncOrDec(total_time_for_playing_the_whole_game)]],
			"character-chosen" : [characters_count, analysis["character_chosen"][characters_chosen_count-1]],
			"tries-before-completion-house-joy" : [tries_before_completion_per_house[0], specialAnalysisNumberOfTriesBeforeCompletionPerHouse(isIncOrDec(tries_before_completion_per_house[0]),0)],
			"tries-before-completion-house-anger" : [tries_before_completion_per_house[0], specialAnalysisNumberOfTriesBeforeCompletionPerHouse(isIncOrDec(tries_before_completion_per_house[1]),1)],
			"tries-before-completion-house-disgust" : [tries_before_completion_per_house[0], specialAnalysisNumberOfTriesBeforeCompletionPerHouse(isIncOrDec(tries_before_completion_per_house[2]),2)],
			"tries-before-completion-house-fear" : [tries_before_completion_per_house[0], specialAnalysisNumberOfTriesBeforeCompletionPerHouse(isIncOrDec(tries_before_completion_per_house[3]),3)],
			"tries-before-completion-house-sadness" : [tries_before_completion_per_house[0], specialAnalysisNumberOfTriesBeforeCompletionPerHouse(isIncOrDec(tries_before_completion_per_house[4]),4)],
			"tries-before-completion-house-surprise" : [tries_before_completion_per_house[0], specialAnalysisNumberOfTriesBeforeCompletionPerHouse(isIncOrDec(tries_before_completion_per_house[5]),5)],
			"wrong-answers-per-attempt-house-joy" : [number_of_wrong_answers_per_house[0], specialAnalysisAverageNumberOfWrongAnswersPerHouse(isIncOrDec(number_of_wrong_answers_per_house[0]),0)],
			"wrong-answers-per-attempt-house-anger" : [number_of_wrong_answers_per_house[1], specialAnalysisAverageNumberOfWrongAnswersPerHouse(isIncOrDec(number_of_wrong_answers_per_house[1]),1)],
			"wrong-answers-per-attempt-house-disgust" : [number_of_wrong_answers_per_house[2], specialAnalysisAverageNumberOfWrongAnswersPerHouse(isIncOrDec(number_of_wrong_answers_per_house[2]),2)],
			"wrong-answers-per-attempt-house-fear" : [number_of_wrong_answers_per_house[3], specialAnalysisAverageNumberOfWrongAnswersPerHouse(isIncOrDec(number_of_wrong_answers_per_house[3]),3)],
			"wrong-answers-per-attempt-house-sadness" : [number_of_wrong_answers_per_house[4], specialAnalysisAverageNumberOfWrongAnswersPerHouse(isIncOrDec(number_of_wrong_answers_per_house[4]),4)],
			"wrong-answers-per-attempt-house-surprise" : [number_of_wrong_answers_per_house[5], specialAnalysisAverageNumberOfWrongAnswersPerHouse(isIncOrDec(number_of_wrong_answers_per_house[5]),5)]};
			res.send(result_values);
			//end of analysis
		}
	});
});

//communication game
app.get('/get_second_game_data', (req, res) => {
	const analysis = {
		"overall_total_play_time" : ["The decreasing time that this player spends in playing this game per website use may mean that the player's ability to communicate and work with other people has improved and that he/she has needed less time to complete the levels. On the other hand, this may also mean that he/she is losing interest in playing the game as time goes by, maybe because he/she finds the game too easy, or because he/she is struggling to complete the game??? these cases may mean that the player is either improving his/her communication skills or he/she is struggling to communicate with others or with a particular person.", "The increasing time that this player spends in playing this game per website use may mean that the player's ability to communicate and work with other people has not yet improved such that he/she has still needs more time to complete the levels. On the other hand, this may also mean that the player is gaining interest in playing the game as time goes by, maybe because he/she finds this game challenging or fun; this may mean that the player likes to challenge himself/herself or he/she is enjoying the game due to its collaborative nature.", "Since the amount of time that the player spends in playing the game shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. The collaborative nature of the game may also be a factor since the player and his/her playmate can be distracted by each other.", "Insufficient data."],
		"average_play_time_per_level" : ["The decreasing average time that this player spends in playing this level per game use may mean that he/she is getting less interested in playing this particular level as time goes by, which may be due to the player being bored at doing something repeatedly after some time, or perhaps due to this level becoming easier for him/her every time he/she attempts it. It may also mean that the player's communication skills are progressively improving and that his/her ability to do tasks with other people has improved. Lastly, it may mean that the player has already learned and memorized the positioning of the puzzle pieces, which may indicate that the player is a fast learner and that he/she has good memorization skills.", "The increasing average time that this player spends in playing this level per game use may mean that he/she is getting more interested in playing this particular level as time goes by, which may be due to the player being challenged by this level; in this case, it may mean that the player likes to challenge himself/herself. On the other hand, it may also mean that the player is struggling to communicate and cooperate with his/her playmate, which may mean that his/her communication skills have not yet improved. This may also mean that he/she is struggling to memorize and learn the positions of the puzzle pieces, which may indicate that the player is a slow learner or that he/she does not have good memorization skills.", "Since the amount of time that this player spends in playing this level per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player and/or his/her playmate does not seriously play this game or that his/her focus is still inconsistent. The collaborative nature of the game may also be a factor since the player and his/her playmate can be distracted by each other.", "Insufficient data."],
		"average_number_of_wrong_prompts_per_level" : ["The decreasing average number of wrong prompts per attempt on this level may mean that the player is progressively learning how to properly communicate and cooperate with other people in doing a task. This may mean that the player's communicative skills are improving. Also, this may mean that the player is progressively memorizing and learning the positions of the puzzle pieces, which may indictate that the player has good memorization skills.", "The increasing average number of wrong prompts per attempt on this level may mean that the player is struggling to learn how to properly communicate and cooperate with other people in doing a task. This may mean that the player's communication skills are not yet improving. Also, this may mean that the player, and perhaps his/her playmate, is struggling to memorize and learn the positions of the puzzle pieces, which may indicate that the player does not have good memorization skills.", "Since the average number of wrong prompts per attempt on this level shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player and/or his/her playmate does not seriously play this game or that his/her focus is still inconsistent. The collaborative nature of the game may also be a factor since the player and his/her playmate can be distracted by each other.", "Insufficient data."],
		"number_of_attempts_per_level" : ["The decreasing number of attempts on this level may mean that this player is losing interest in playing this level, perhaps because he/she is already bored with playing on this level due to its easy difficulty; this may mean that the player's communication and cooperation skills are improving. On the other hand, it may also mean that the player is avoiding this level due to its hard difficulty; in this case, it may mean that the player is avoiding challenges and that he/she avoids tasks that are hard for him to do.", "The increasing number of attempts on this level may mean that this player is gaining interest in playing this level, perhaps because he/she finds this level fun or challenging; this may mean that the player likes to face challenges and that he/she wants to improve himself/herself even more. On the other hand, it may also mean that the player is repeatedly playing this level due to its easy difficulty; in this case, it may mean that the player is avoiding challenges and that he/she prefers to do tasks that are easy for him to do.", "Since the number of attempts on this level shows neither an increasing nor decreasing pattern, it may mean that there are times that the player finds this level easy or fun, while there are also times that he/she does not. In other words, the player's perception on this level is inconsistent.", "Insufficient data."],
		"average_number_of_moves_per_level" : ["The decreasing average number of moves per attempt on this level may mean that the player is progressively learning how to communicate and cooperate with other people to finish a task, which in this game is a puzzle. This may mean that the player's communication and cooperation skills are improving. This may also mean that the player is progressively memorizing and learning the positions of the puzzle pieces, which may indicate that the player has good memorization skills.", "The increasing average number of moves per attempt on this level may mean that the player is struggling to learn how to properly communicate and cooperate with other people in doing a task. This may mean that the player's cooperation and communication skills are not yet improving. Also, this may mean that the player, and perhaps his/her playmate, is struggling to memorize and learn the positions of the puzzle pieces, which may indicate that the player does not have good memorization skills.", "Since the number of moves per attempt on this level shows neither an increasing nor decreasing pattern, it may mean that there are times that the player finds this level easy, while there are also times that he/she does not. It may also mean that the player's abilities to communicate and cooperate with other people are still inconsistent.", "Insufficient data."]
	};
	const valuable_username = req.name;
	const query = "SELECT * FROM `second-game-stats` WHERE username = '" + valuable_username + "'";
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			//relevant functions
			function isIncOrDec(listHere){
				var isIncreasingOrDecreasing = 0;
				if(listHere.length <= 1){
					return 3;
				}
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] > listHere[i-1]){
							isIncreasingOrDecreasing = 1;
						}
						else{
							isIncreasingOrDecreasing = 0;
						}
					}
					else{
						if(listHere[i] >= listHere[i-1] && isIncreasingOrDecreasing == 0){
							return 2;
						}
						else if(listHere[i] <= listHere[i-1] && isIncreasingOrDecreasing == 1){
							return 2;
						}
					}
				}
				return isIncreasingOrDecreasing;
			}
			//end of relevant functions
			//relevant variables
			var overall_total_play_time = [];
			var average_play_time_per_level = [[],[],[],[],[],[],[]];
			var wrong_prompts_per_level = [[],[],[],[],[],[],[]];
			var play_count_per_level = [[],[],[],[],[],[],[]];
			var attempts_per_level = [[],[],[],[],[],[],[]];
			var average_number_of_moves_per_attempt_per_level = [[],[],[],[],[],[],[]];
			var latest_date;
			var latest_level = -1;
			var time_counter_for_current_date = 0, play_counter_for_current_date = 0, wrong_prompt_counter_for_current_date = 0, number_of_moves_counter_for_current_date = 0;
			//end of relevant variables
			//main loop
			for(var i=0; i<result.length; i++){
				var level = result[i].level1;
				var time = result[i].time1;
				var date = result[i].date1;
				var wrong_prompt = result[i].wrong_prompts;
				var number_of_moves = result[i].moves;
				total_time_communicational += time;
				overall_total_play_time.push(time);
				if(i == 0){
					latest_date = date;
					latest_level = level;
					time_counter_for_current_date += time;
					play_counter_for_current_date += 1;
					wrong_prompt_counter_for_current_date += wrong_prompt;
					number_of_moves_counter_for_current_date += number_of_moves;
				}
				else{
					if(date == latest_date && latest_level == level){
						time_counter_for_current_date += time;
						play_counter_for_current_date += 1;
						wrong_prompt_counter_for_current_date += wrong_prompt;
						number_of_moves_counter_for_current_date += number_of_moves;
					}
					else{
						average_play_time_per_level[latest_level-1].push(time_counter_for_current_date/play_counter_for_current_date);
						wrong_prompts_per_level[latest_level-1].push(wrong_prompt/play_counter_for_current_date);
						attempts_per_level[latest_level-1].push(play_counter_for_current_date);
						average_number_of_moves_per_attempt_per_level[latest_level-1].push(number_of_moves_counter_for_current_date/play_counter_for_current_date);
						time_counter_for_current_date = time;
						play_counter_for_current_date = 1;
						latest_level = level;
						wrong_prompt_counter_for_current_date = wrong_prompt;
						number_of_moves_counter_for_current_date = number_of_moves;
					}
				}
			}
			if(play_counter_for_current_date != 0){
				average_play_time_per_level[latest_level-1].push(time_counter_for_current_date/play_counter_for_current_date);
				wrong_prompts_per_level[latest_level-1].push(wrong_prompt/play_counter_for_current_date);
				attempts_per_level[latest_level-1].push(play_counter_for_current_date);
				average_number_of_moves_per_attempt_per_level[latest_level-1].push(number_of_moves_counter_for_current_date/play_counter_for_current_date);
			}
			//end of main loop
			//analysis
			var result_values = {"whole-game-time" : [overall_total_play_time, analysis["overall_total_play_time"][isIncOrDec(overall_total_play_time)]],
			"average-play-time-second-game-level-1" : [average_play_time_per_level[0], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[0])]],
			"average-play-time-second-game-level-2" : [average_play_time_per_level[1], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[1])]],
			"average-play-time-second-game-level-3" : [average_play_time_per_level[2], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[2])]],
			"average-play-time-second-game-level-4" : [average_play_time_per_level[3], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[3])]],
			"average-play-time-second-game-level-5" : [average_play_time_per_level[4], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[4])]],
			"average-play-time-second-game-level-6" : [average_play_time_per_level[5], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[5])]],
			"average-number-of-wrong-prompts-level-1" : [wrong_prompts_per_level[0], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[0])]],
			"average-number-of-wrong-prompts-level-2" : [wrong_prompts_per_level[1], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[1])]],
			"average-number-of-wrong-prompts-level-3" : [wrong_prompts_per_level[2], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[2])]],
			"average-number-of-wrong-prompts-level-4" : [wrong_prompts_per_level[3], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[3])]],
			"average-number-of-wrong-prompts-level-5" : [wrong_prompts_per_level[4], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[4])]],
			"average-number-of-wrong-prompts-level-6" : [wrong_prompts_per_level[5], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[5])]],
			"number-of-attempts-second-game-level-1" : [attempts_per_level[0], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[0])]],
			"number-of-attempts-second-game-level-2" : [attempts_per_level[1], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[1])]],
			"number-of-attempts-second-game-level-3" : [attempts_per_level[2], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[2])]],
			"number-of-attempts-second-game-level-4" : [attempts_per_level[3], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[3])]],
			"number-of-attempts-second-game-level-5" : [attempts_per_level[4], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[4])]],
			"number-of-attempts-second-game-level-6" : [attempts_per_level[5], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[5])]],
			"average-number-of-moves-level-1" : [average_number_of_moves_per_attempt_per_level[0], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[0])]],
			"average-number-of-moves-level-2" : [average_number_of_moves_per_attempt_per_level[1], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[1])]],
			"average-number-of-moves-level-3" : [average_number_of_moves_per_attempt_per_level[2], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[2])]],
			"average-number-of-moves-level-4" : [average_number_of_moves_per_attempt_per_level[3], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[3])]],
			"average-number-of-moves-level-5" : [average_number_of_moves_per_attempt_per_level[4], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[4])]],
			"average-number-of-moves-level-6" : [average_number_of_moves_per_attempt_per_level[5], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[5])]]};
			//end of analysis
			res.send(result_values);
		}
	});
});

//behavioural game
app.get('/get_third_game_data', (req, res) => {
	const analysis = {
		"average_play_time_per_level" : ["The decreasing average time that this player spends in playing this level per game use may mean that he/she is getting less interested in playing this particular level, which may be due to the player being bored at doing something repeatedly after some time. On the other hand, it may also mean that the player has progressively improved his/her focus while completing a task, thus he/she spends lesser time in order to complete this level; this may mean that the player is getting less easy to distract.", "The increasing average time that this player spends in playing this level per game use may mean that he/she is getting more interested in playing this particular level, which may be due to the player being challenged by the difficulty of this level; this may mean that the player likes to challenge himself/herself and that he/she is not afraid to do a task that is hard for him/her. It may also mean that the player is struggling to improve his/her focus while completing a task, thus he/she spends more time in order to complete this level; this may mean that the player is still easy to distract.", "Since the amount of time that this player spends in playing this level per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player still lacks focus and can be easily distracted while doing a task. It may also mean that the player does not seriously play this game or that his/her focus is still inconsistent.", "Insufficient data."],
		"total_play_time" : ["The decreasing time that this player spends in playing this game per website use may mean that the player's focus has improved and that he/she has needed less time to complete the levels. On the other hand, this may also mean that he/she is losing interest in playing the game as time goes by, maybe because he/she finds the game too easy, or because he/she is struggling to complete the game ??? these cases may mean that the player is either improving his/her focus or he/she is getting easier to be distracted.", "The increasing time that this player spends in playing this game per website use may mean that the player's focus has not yet improved such that he/she still needs more time to complete the levels of the game; in this case, it may mean that the player is still easily distracted from doing a task assigned to him/her. On the other hand, this increase in time spent may also mean that he/she is gaining interest in playing the game, maybe because he/she finds the game challenging and fun; in this case, it may mean that the player likes to challenge himself/herself.", "Since the amount of time that this player spends in playing the game shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player still lacks focus and can still be easily distracted while doing a task.", "Insufficient data."],
		"character_chosen" : ["The uniformity of selections for a character may mean that the player only likes to stick to one option, perhaps because this is his/her favorite. It may mean that the player is not interested in trying other different things and that he/she likes to follow only one routine. His/Her favouritism on a character may be due to the gender of the character or due to the design of the clothes of the character.", "The selections between the two characters may mean that the player likes a little variation and that the player likes to experience something new from time to time; it may also mean that the player is easy to become bored from something. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The variation of selections may mean that the player is explorative and that he/she is open to try and experience new things. His/Her favouritism on a character may be due to the gender of the character or due to the design of the clothes of the character.", "Insufficient data."],
		"average_number_of_clicks_per_level" : ["The decreasing average number of wrong clicks per attempt on this level may mean that the player is progressively learning how to properly focus on finding the assigned character. This may mean that the player's focus is improving or that he/she is becoming less easy to distract.", "The increasing average number of wrong clicks per attempt on this level may mean that the player is struggling to learn how to properly focus on finding the assigned character. This may mean that the player's focus is not yet improving or that he/she is still easy to distract.", "Since the average number of wrong clicks per attempt on this level shows neither an increasing nor decreasing pattern, it may mean that this player is still struggling to be consistent in focusing on the assigned task to him/her. This may also mean that the player plays this level randomly or that he/she does not seriously play it. Other external factors can also be a factor of this (e.g. the player is doing something else while playing), which may also be due to the player being easily distracted.", "Insufficient data."],
		"number_of_attempts_per_level" : ["The decreasing number of attempts on this level may mean that the player is losing interest in playing this level, perhaps because he/she is already bored with playing on this level. This may mean that the player's focus is improving or that he/she is becoming less easy to distract. On the other hand, it may also mean that the player is avoiding this level due to the hard difficulty; in this case, it may mean that the player is avoiding challenges and that he/she avoids tasks that are hard for him to do.", "The increasing number of attempts on this level may mean that the player is gaining interest in playing this level, perhaps because he/she finds this level fun or challenging; this may mean that the player likes to face challenges and that he/she wants to improve himself/herself even more. On the other hand, it may also mean that the player is repeatedly playing this level due to the easy difficulty; in this case, it may mean that the player is avoiding challenges and that he/she prefers to do tasks that are easy for him to do.", "Since the number of attempts on this level shows neither an increasing nor decreasing pattern, it may mean that the player's focus is still inconsistent due to him/her having various perceptions on the difficulty of the level. In other words, there are times that the player finds this level as easy or fun, while there are also times that he/she does not.", "Insufficient data."]
	};
	const valuable_username = req.name;
	const query = "SELECT * FROM `third-game-stats` WHERE username = '" + valuable_username + "'";
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			//relevant functions
			function isIncOrDec(listHere){
				var isIncreasingOrDecreasing = 0;
				if(listHere.length <= 1){
					return 3;
				}
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] > listHere[i-1]){
							isIncreasingOrDecreasing = 1;
						}
						else{
							isIncreasingOrDecreasing = 0;
						}
					}
					else{
						if(listHere[i] >= listHere[i-1] && isIncreasingOrDecreasing == 0){
							return 2;
						}
						else if(listHere[i] <= listHere[i-1] && isIncreasingOrDecreasing == 1){
							return 2;
						}
					}
				}
				return isIncreasingOrDecreasing;
			}
			//end of relevant functions
			//relevant variables
			var characters_count = 0;
			var characters_chosen_count = {};
			var playtime_list_per_level_average = [[],[],[],[],[],[],[]];
			var overall_playtime_list_per_level = [[],[],[],[],[],[],[]];
			var play_count_per_level = [[],[],[],[],[],[]];
			var wrong_clicks_per_level = [[],[],[],[],[],[],[]];
			var attempts_per_level = [[],[],[],[],[],[],[]];
			var latest_date;
			var latest_level;
			var play_counter_for_current_date = 0, time_counter_for_current_date = 0, wrong_clicks_counter_for_current_date = 0;
			//end of relevant variables
			//main loop for all values in database
			for(var i=0; i<result.length; i++){
				var level = result[i].level1;
				var time = result[i].time1;
				var character = result[i].character1;
				var wrong_clicks = result[i].wrong_clicks;
				var date = result[i].date1;
				total_time_behavioural += time;
				overall_playtime_list_per_level[level-1].push(time);
				if(characters_chosen_count[character] == undefined){
					characters_chosen_count[character] = 1;
					characters_count += 1;
				}
				else{
					characters_chosen_count[character] += 1;
				}
				if(i == 0){
					latest_date = date;
					latest_level = level;
					play_counter_for_current_date = 1;
					time_counter_for_current_date = time;
					wrong_clicks_counter_for_current_date = wrong_clicks;
				}
				else{
					if(latest_date == data && latest_level == level){
						latest_date = date;
						latest_level = level;
						play_counter_for_current_date += 1;
						time_counter_for_current_date += time;
						wrong_clicks_counter_for_current_date += wrong_clicks;
					}
					else{
						if(play_counter_for_current_date != 0){
							playtime_list_per_level_average[latest_level-1].push(time_counter_for_current_date/play_counter_for_current_date);
							attempts_per_level[latest_level-1].push(play_counter_for_current_date);
							wrong_clicks_per_level[latest_level-1].push(wrong_clicks_counter_for_current_date/play_counter_for_current_date);
						}
						latest_date = date;
						latest_level = level;
						play_counter_for_current_date = 1;
						time_counter_for_current_date = time;
						wrong_clicks_counter_for_current_date = wrong_clicks;
					}
				}
			}
			if(play_counter_for_current_date != 0){
				playtime_list_per_level_average[latest_level-1].push(time_counter_for_current_date/play_counter_for_current_date);
				attempts_per_level[latest_level-1].push(play_counter_for_current_date);
				wrong_clicks_per_level[latest_level-1].push(wrong_clicks_counter_for_current_date/play_counter_for_current_date);
			}
			//end of main loop for all values in database
			//analysis
			var result_values = {"whole-game-time" : [overall_playtime_list_per_level, analysis["total_play_time"][isIncOrDec(overall_playtime_list_per_level)]],
			"average-play-time-level-1" : [playtime_list_per_level_average[0], analysis["average_play_time_per_level"][isIncOrDec(playtime_list_per_level_average[0])]],
			"average-play-time-level-2" : [playtime_list_per_level_average[1], analysis["average_play_time_per_level"][isIncOrDec(playtime_list_per_level_average[1])]],
			"average-play-time-level-3" : [playtime_list_per_level_average[2], analysis["average_play_time_per_level"][isIncOrDec(playtime_list_per_level_average[2])]],
			"average-play-time-level-4" : [playtime_list_per_level_average[3], analysis["average_play_time_per_level"][isIncOrDec(playtime_list_per_level_average[3])]],
			"average-play-time-level-5" : [playtime_list_per_level_average[4], analysis["average_play_time_per_level"][isIncOrDec(playtime_list_per_level_average[4])]],
			"average-play-time-level-6" : [playtime_list_per_level_average[5], analysis["average_play_time_per_level"][isIncOrDec(playtime_list_per_level_average[5])]],
			"character-chosen" : [characters_count, analysis["character_chosen"][characters_count]],
			"number-of-attempts-level-1" : [attempts_per_level[0], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[0])]],
			"number-of-attempts-level-2" : [attempts_per_level[1], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[1])]],
			"number-of-attempts-level-3" : [attempts_per_level[2], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[2])]],
			"number-of-attempts-level-4" : [attempts_per_level[3], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[3])]],
			"number-of-attempts-level-5" : [attempts_per_level[4], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[4])]],
			"number-of-attempts-level-6" : [attempts_per_level[5], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[5])]],
			"average-number-of-wrong-clicks-level-1" : [wrong_clicks_per_level[0], analysis["average_number_of_clicks_per_level"][isIncOrDec(wrong_clicks_per_level[0])]],
			"average-number-of-wrong-clicks-level-2" : [wrong_clicks_per_level[1], analysis["average_number_of_clicks_per_level"][isIncOrDec(wrong_clicks_per_level[1])]],
			"average-number-of-wrong-clicks-level-3" : [wrong_clicks_per_level[2], analysis["average_number_of_clicks_per_level"][isIncOrDec(wrong_clicks_per_level[2])]],
			"average-number-of-wrong-clicks-level-4" : [wrong_clicks_per_level[3], analysis["average_number_of_clicks_per_level"][isIncOrDec(wrong_clicks_per_level[3])]],
			"average-number-of-wrong-clicks-level-5" : [wrong_clicks_per_level[4], analysis["average_number_of_clicks_per_level"][isIncOrDec(wrong_clicks_per_level[4])]],
			"average-number-of-wrong-clicks-level-6" : [wrong_clicks_per_level[5], analysis["average_number_of_clicks_per_level"][isIncOrDec(wrong_clicks_per_level[5])]]};
			res.send(result_values);
			//end of analysis
		}
	});
});


//overall time conclusion for all three games
app.get('/game_conclusions', (req, res) => {
	var first_paragraph = "", first_conclusion = "", second_paragraph = "", second_conclusion = "";
	if(total_time_emotional > total_time_behavioural && total_time_emotional > total_time_communicational){
		first_paragraph = "This player spent the most time playing the emotion game among others, with a total of " + total_time_emotional + " minutes.";
		first_conclusion = "This may mean that the player is most interested in the concept of this game among others, which may mean that he/she likes to learn how to respond to people when they are feeling certain emotions. On the other hand, this may also mean that the player is struggling to learn about the lessons of this game, thus he/she spends more time in completing the houses.";
	}
	else if(total_time_behavioural > total_time_emotional  && total_time_behavioural > total_time_communicational){
		first_paragraph = "This player spent the most time playing the behaviour game among others, with a total of " + total_time_behavioural + " minutes.";
		first_conclusion = "This may mean that the player is most interested in the concept of this game among others, which may mean that he/she likes to learn how to focus on the task given to him and how to not get distracted from the things around him/her. On the other hand, this may also mean that the player is struggling to finish the tasks of this game and that his/her focus has not yet improved, thus he/she spends more time in completing the levels.";
	}
	else{
		first_paragraph = "This player spent the most time playing the communication game among others, with a total of " + total_time_communicational + " minutes.";
		first_conclusion = "This may mean that the player is most interested in the concept of this game among others, which may mean that he/she likes to learn how to collaborate with others to finish a certain task, which in this game is a puzzle. On the other hand, this may also mean that the player is struggling to finish the tasks of this game or that he/she is struggling to cooperate with another person, thus he/she spends more time in completing the levels.";
	}
	if(total_time_emotional < total_time_behavioural && total_time_emotional < total_time_communicational){
		second_paragraph = "Meanwhile, this player spent the least time playing the emotion game among others, with a total time of " + total_time_emotional + " minutes.";
		second_conclusion = "This may mean that the player is least interested in the concept of this game among others, which may mean that he/she is least interested in learning how to respond to people when they are feeling different emotions. On the other hand, this may also mean that the player is struggling to learn about the lessons of this game. Lastly, it may mean that the player finishes the tasks of this game easily, thus he/she only spends a little time to finish them; in this case, it may mean that the player has learned how to respond to people when they are feeling certain emotions.";
	}
	else if(total_time_behavioural < total_time_emotional && total_time_behavioural < total_time_communicational){
		second_paragraph = "Meanwhile, this player spent the least time playing the behaviour game among others, with a total time of " + total_time_behavioural + " minutes.";
		second_conclusion = "This may mean that the player is least interested in the concept of this game among others, which may mean that he/she is least interested in learning how to focus on a task given to him and how to not get distracted from the things around him/her. On the other hand, this may also mean that the player is struggling to learn about the lessons of this game. Lastly, it may mean that the player finishes the tasks of this game easily, thus he/she only spends a little time to finish them; in this case, it may mean that the player has improved his/her focus and that he/she became less easy to distract.";
	}
	else{
		second_paragraph = "Meanwhile, this player spent the least time playing the communication game among others, with a total time of " + total_time_communicational + " minutes.";
		second_conclusion = "This may mean that the player is least interested in the concept of this game among others, which may mean that he/she is least interested in learning how to collaborate with others to finish a certain task, which in this game is a puzzle. On the other hand, this may also mean that the player is struggling to learn about the lessons of this game or is struggling to finish the tasks of the game. Lastly, it may mean that the player finishes the tasks of this game easily, thus he/she only spends a little time to finish them; in this case, it may mean that the player???s ability to communicate and cooperate with other people has improved.";
	}
	res.send(first_paragraph + " " + first_conclusion + " " + second_paragraph + " " + second_conclusion);
});

app.get('/profile_page_first_game_data', (req, res) => {
	const query = "SELECT * FROM `first-game-stats` where username = '" + current_username + "'";
	db.query(query, function (err, result) {
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
});

app.get('/profile_page_second_game_data', (req, res) => {
	const query = "SELECT * FROM `second-game-stats` where username = '" + current_username + "'";
	db.query(query, function (err, result) {
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
});

app.get('/profile_page_third_game_data', (req, res) => {
	const query = "SELECT * FROM `third-game-stats` where username = '" + current_username + "'";
	db.query(query, function (err, result) {
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
});

app.listen(3002, () => {
	console.log("Server running on port 3002.");
});