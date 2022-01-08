const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/get_third_game_data', (req, res) => {
	const analysis = {total_play_time : [""]};
	const name = req.body.name;
	var res_values; //average per level, total time for each level, total time, average play time, characters chosen, wrong clicks per level, attempts per level
	const query = "SELECT * FROM third-game-stats WHERE name = " + name;
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			var games_per_level = [0,0,0,0,0,0,0];
			var time_per_level = [0,0,0,0,0,0,0];
			var total_play_time = 0;
			var total_number_of_games = 0;
			var characters = [];
			var wrong_clicks = [0,0,0,0,0,0,0];
			var attempts_per_level = [0,0,0,0,0,0,0];
			var play_time_list = []; //list that contains all time taken, excludes outlier game times (0 second game times)
			for(var i=0; i<result.length; i++){
				var level = result[i].level;
				var time = result[i].time;
				var character = result[i].character;
				var wrong-clicks = result[i].wrong-clicks;
				if(time != 0){
					play_time_list.push(time);
				}
				games_per_level[level-1] += 1;
				time_per_level[level-1] += time;
				var checker = false;
				for(var j=0; j<characters.length; j++){
					if(characters[i] == character){
						checker = true;
					}
				}
				if(!checker){
					characters.push(character);
				}
				wrong_clicks[level-1] += wrong-clicks;
			}
			//check game time if increasing, decreasing or neither
			var isIncOrDec = 0;
			for(var i=0; i<play_time_list.length; i++){

			}
			//end of check
			var average_time_per_level = [0,0,0,0,0,0,0];
			for(var i=0; i<7; i++){
				average_time_per_level[i] = time_per_level[i]/games_per_level[i];
				total_play_time += time_per_level[i];
				total_number_of_games += games_per_level[i];
			}
			res_values = {average_time_per_level:average_time_per_level, time_per_level:time_per_level, total_play_time:total_play_time, total_average_play_time: total_play_time/total_number_of_games,characters:characters,wrong_clicks:wrong_clicks};
			res.send(res_values);
		}
	});
});