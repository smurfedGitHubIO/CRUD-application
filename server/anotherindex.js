const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/get_third_game_data', (req, res) => {
	const houses = [];
	const characters = [];
	const analysis = {
		overall_total_play_time : ["The decreasing time that this player spends in playing the mini-game per game use may mean that he/she is progressively learning about the concept of the six basic emotions. This may also mean that he/she is a fast learner, or that he/she just does not want to do the same thing repeatedly (easy to become bored at something done repeatedly), which may be because he/she does not enjoy it.", "The increasing time that this player spends in playing the mini-game per game use may mean that he/she is struggling to learn about the concept of the six basic emotions such that he/she needs to be familiarized about it repeatedly. This may also mean that he/she is a slow learner, or that he/she just wants to do the same thing repeatedly because he/she enjoys it.", "Since the amount of time that this player spends in playing the mini-game per game use shows neither an increasing nor decreasing pattern, it may mean that the player is struggling to remember or learn about the concepts of the six basic emotions. It may also mean that the player does not seriously play it or the player does something else at some times, which can be both caused by the player being easily distracted."],
		per_house_total_play_time : ["The decreasing time that this player spends in playing this house per game use may mean that he/she is getting less interested in playing this particular house, which may be due to the player being bored at doing something repeatedly after some time. It may also mean that the player has progressively learned how to respond to people when they are feeling joyous (change na lang based sa emotion ng house), thus he/she spends lesser time in playing this house; this may mean that he/she is a fast learner.", "The increasing time that this player spends in playing this house per game use may mean that he/she is getting more interested in playing this particular house, which may be due to the player being challenged by this house. On the other hand, it may mean that the player is struggling to learn how to respond to people when they are feeling joyous (change na lang based sa emotion ng house); this may mean that the player is a slow learner.", "Since the amount of time that this player spends in playing this house per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task."],
		character_chosen : ["The uniformity of selections for character n may mean that the player only likes to stick to one option (his/her first choice), perhaps because this is his/her favorite. It may mean that the player is not interested in trying other different things and that he/she likes to follow only one routine. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The selections between the two characters may mean that the player likes a little variation and that the player likes to experience something new from time to time; it may also mean that the player is easy to become bored from something. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The variation of selections may mean that the player is explorative and that he/she is open to try and experience new things. Also, the collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character."]
	};
	const name = req.body.name;
	var res_values; //average per level, total time for each level, total time, average play time, characters chosen, wrong clicks per level, attempts per level
	const query = "SELECT * FROM third-game-stats WHERE name = " + name;
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			function isIncreasingOrDecreasing(listHere){
				var isIncOrDec = 0;
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] listHere[i-1]){
							isIncOrDec = 1;
						}
						else{
							isIncOrDec = 0;
						}
					}
					else{
						if(listHere[i] listHere[i-1] && isIncOrDec == 0){
							return 2;
						}
						else if(listHere[i] listHere[i-1] && isIncOrDec == 1){
							return 2;
						}
					}
				}
				return isIncOrDec;
			}
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