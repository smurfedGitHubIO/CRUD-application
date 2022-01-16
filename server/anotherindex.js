const express = require('express');
const app = express();
const mysql = require('mysql');
const mysql2 = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

//emotional game
app.post('/get_first_game_data', (req, res) => {
	const houses = ["joyful", "angry", "disgusted", "fear", "sad", "surprised"];
	const characters = [];
	const analysis = {
		"mini_game_playtime" : ["The decreasing time that this player spends in playing the mini-game per game use may mean that he/she is progressively learning about the concept of the six basic emotions. This may also mean that he/she is a fast learner, or that he/she just does not want to do the same thing repeatedly (easy to become bored at something done repeatedly), which may be because he/she does not enjoy it.", "The increasing time that this player spends in playing the mini-game per game use may mean that he/she is struggling to learn about the concept of the six basic emotions such that he/she needs to be familiarized about it repeatedly. This may also mean that he/she is a slow learner, or that he/she just wants to do the same thing repeatedly because he/she enjoys it.", "Since the amount of time that this player spends in playing the mini-game per game use shows neither an increasing nor decreasing pattern, it may mean that the player is struggling to remember or learn about the concepts of the six basic emotions. It may also mean that the player does not seriously play it or the player does something else at some times, which can be both caused by the player being easily distracted.", "Insufficient data."],
		"whole_game_play_time" : ["The decreasing time that this player spends in playing this game per website use may mean that the player is progressively learning how to respond to people when they are feeling certain emotions. This may also mean the he/she is losing interest in playing the game, maybe because he/she has already learned about the lessons of the game, or because he/she is struggling to play the game – these cases may mean that the player is either a fast or slow learner.", "The increasing time that this player spends in playing this game per website use may mean that the player is struggling to learn how to respond to people when they are feeling certain emotions. This may also mean the he/she is gaining interest in playing the game as time goes by, maybe because he/she is still not contented with what he/she has learned about the lessons of the game or because he/she is struggling to play the game and just likes to challenge himself/herself – these cases may mean that the player is either a fast or slow learner, or that he/she likes to challenge himself/herself." "Since the amount of time that this player spends in playing the game shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player is struggling to remember and learn how to respond to people when they are feeling certain emotions.", "Insufficient data."],
		"character_chosen" : ["The uniformity of selections for character n may mean that the player only likes to stick to one option (his/her first choice), perhaps because this is his/her favorite. It may mean that the player is not interested in trying other different things and that he/she likes to follow only one routine. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The selections between the two characters may mean that the player likes a little variation and that the player likes to experience something new from time to time; it may also mean that the player is easy to become bored from something. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The variation of selections may mean that the player is explorative and that he/she is open to try and experience new things. Also, the collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "Insufficient data."],
		"number_of_tries_before_completion_per_house" : ["The decreasing number of attempts that this player does to successfully complete this house may mean that the player is progressively learning how to respond to people when they are feeling joyous (change na lang based sa emotion ng house). This may also mean that the player is a fast learner.", "The increasing number of attempts that this player does to successfully complete this house may mean that the player is struggling to learn how to respond to people when they are feeling joyous (change na lang based sa emotion ng house). This may also mean that the player is a slow learner.", "Since the number of attempts that the player does to successfully complete this house does shows neither an increasing nor decreasing pattern, it may mean that the player is struggling to remember or learn how to respond to people when they are feeling joyous (change na lang based sa emotion ng house). It may also mean that the player plays this house randomly or that he/she does not seriously play it.", "Insufficient data."],
		"average_number_of_wrong_answers_per_house" : ["The decreasing average number of wrong answers per attempt may mean that this player is progressively learning how to properly respond to people when they are feeling joyous (change na lang based sa emotion ng house). This may also mean that the player is a fast learner since he/she can learn or remember the choices that should not be chosen.", "The increasing average number of wrong answers per attempt may mean that this player is struggling to learn how to properly respond to people when they are feeling joyous (change na lang based sa emotion ng house). This may also mean that the player is a slow learner since he/she cannot easily learn or remember the choices that should not be chosen.", "Since the average number of wrong answers per attempt that the player commits to this house shows neither an increasing nor decreasing pattern, it may mean that the player is still struggling to remember or learn how to respond to people when they are feeling joyous (change na lang based sa emotion ng house). It may also mean that the player plays this house randomly or that he/she does not seriously play it.", "Insufficient data."], 
	};
	const name = req.body.name;
	const query = "SELECT * FROM third-game-stats WHERE name = " + name;
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			//relevant functions
			function isIncreasingOrDecreasing(listHere){
				var isIncOrDec = 0;
				if(listHere.length == 1){
					return 3;
				}
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] > listHere[i-1]){
							isIncOrDec = 1;
						}
						else{
							isIncOrDec = 0;
						}
					}
					else{
						if(listHere[i] >= listHere[i-1] && isIncOrDec == 0){
							return 2;
						}
						else if(listHere[i] <= listHere[i-1] && isIncOrDec == 1){
							return 2;
						}
					}
				}
				return isIncOrDec;
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
				var level = result[i].level;
				var time = result[i].time;
				var date = result[i].date;
				var character = result[i].character;
				var wrong_answers = result[i].wrong-answers;
				var minigame_time = result[i].minigame-time;
				var win = result[i].win;
				timer_per_minigame.push(minigame_time);
				time_per_house_win_or_lose[level-1].push(time);
				total_time_for_playing_the_whole_game.push(time);
				if(win == 1){
					time_per_house_win_only[level-1].push(time);
				}
				if(characters_chosen_count[character] == undefined){
					characters_chosen_count = 1;
					characters_count += 1;
				}
				else{
					characters_chosen_count += 1;
				}
				if(i == 0){
					latest_date = date;
					latest_level = level;
					if(win){
						tries_before_completion_per_house[level-1].push(try_counter);
						try_counter = 0;
					}
					else{
						try_counter += 1;
					}
					wrong_answers_counter = wrong_answers;
				}
				else{
					if(date == latest_date && latest_level == level){
						if(win){
							tries_before_completion_per_house[level-1].push(try_counter);
							try_counter = 0;
						}
						else{
							try_counter += 1;
						}
						wrong_answers_counter += wrong_answers;
					}
					else{
						latest_date = date;
						number_of_wrong_answers_per_house[latest_level-1].push(wrong_answers_counter/try_counter);
						latest_level = level;
						if(win){
							tries_before_completion_per_house[level-1].push(try_counter);
							try_counter = 0;
						}
						else{
							try_counter += 1;
						}
						wrong_answers_counter = wrong_answers;
					}
				}
			}
			//analysis
			var result_values = {"mini-game-time" : [timer_per_minigame, analysis["mini_game_playtime"][isIncOrDec(timer_per_minigame)]],
			"house-play-time-house-anger" : [time_per_house_win_or_lose[0], analysis["per_house_total_play_time"][isIncOrDec(time_per_house_win_or_lose[0])]],
			"house-play-time-house-disgust" : [time_per_house_win_or_lose[1], analysis["per_house_total_play_time"][isIncOrDec(time_per_house_win_or_lose[1])]],
			"house-play-time-house-fear" : [time_per_house_win_or_lose[2], analysis["per_house_total_play_time"][isIncOrDec(time_per_house_win_or_lose[2])]],
			"house-play-time-house-joy" : [time_per_house_win_or_lose[3], analysis["per_house_total_play_time"][isIncOrDec(time_per_house_win_or_lose[3])]],
			"house-play-time-house-sadness" : [time_per_house_win_or_lose[4], analysis["per_house_total_play_time"][isIncOrDec(time_per_house_win_or_lose[4])]],
			"house-play-time-house-surprise" : [time_per_house_win_or_lose[5], analysis["per_house_total_play_time"][isIncOrDec(time_per_house_win_or_lose[5])]],
			"house-play-time-win-only-house-anger" : [time_per_house_win_only[0], analysis["winning_games_play_time"][isIncOrDec(time_per_house_win_only[0])]],
			"house-play-time-win-only-house-disgust" : [time_per_house_win_only[1], analysis["winning_games_play_time"][isIncOrDec(time_per_house_win_only[1])]],
			"house-play-time-win-only-house-fear" : [time_per_house_win_only[2], analysis["winning_games_play_time"][isIncOrDec(time_per_house_win_only[2])]],
			"house-play-time-win-only-house-joy" : [time_per_house_win_only[3], analysis["winning_games_play_time"][isIncOrDec(time_per_house_win_only[3])]],
			"house-play-time-win-only-house-sadness" : [time_per_house_win_only[4], analysis["winning_games_play_time"][isIncOrDec(time_per_house_win_only[4])]],
			"house-play-time-win-only-house-surprise" : [time_per_house_win_only[5], analysis["winning_games_play_time"][isIncOrDec(time_per_house_win_only[5])]],
			"game-play-time" : [total_time_for_playing_the_whole_game, analysis["whole_game_play_time"][isIncOrDec(total_time_for_playing_the_whole_game)]],
			"character-chosen" : [characters_count, analysis["character_chosen"][characters_chosen_count-1]],
			"tries-before-succession" : [, analysis[][]],
			"wrong-answers-per-attempt" : [, analysis[][]]};
			//[a,b] = [data, analysis]
			//end of analysis
			//to do: wrong answers + analysis
			// var average_time_per_level = [0,0,0,0,0,0,0];
			// for(var i=0; i<7; i++){
			// 	average_time_per_level[i] = time_per_level[i]/games_per_level[i];
			// 	total_play_time += time_per_level[i];
			// 	total_number_of_games += games_per_level[i];
			// }
			// res_values = {average_time_per_level:average_time_per_level, time_per_level:time_per_level, total_play_time:total_play_time, total_average_play_time: total_play_time/total_number_of_games,characters:characters,wrong_clicks:wrong_clicks};
			// res.send(res_values);
		}
	});
});


//communication game
app.post('/get_second_game_data', (req, res) => {
	const houses = [];
	const characters = [];
	const analysis = {
		"overall_total_play_time" : ["The decreasing time that this player spends in playing this game per website use may mean that the player's ability to communicate and work with other people has improved and that he/she has needed less time to complete the levels. On the other hand, this may also mean that he/she is losing interest in playing the game as time goes by, maybe because he/she finds the game too easy, or because he/she is struggling to complete the game— these cases may mean that the player is either improving his/her communication skills or he/she is struggling to communicate with others or with a particular person.", "The increasing time that this player spends in playing this game per website use may mean that the player's ability to communicate and work with other people has not yet improved such that he/she has still needs more time to complete the levels. On the other hand, this may also mean that the player is gaining interest in playing the game as time goes by, maybe because he/she finds this game challenging or fun; this may mean that the player likes to challenge himself/herself or he/she is enjoying the game due to its collaborative nature.", "Since the amount of time that the player spends in playing the game shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. The collaborative nature of the game may also be a factor since the player and his/her playmate can be distracted by each other.", "Insufficient data."],
		"average_play_time_per_level" : ["The decreasing average time that this player spends in playing this level per game use may mean that he/she is getting less interested in playing this particular level as time goes by, which may be due to the player being bored at doing something repeatedly after some time, or perhaps due to this level becoming easier for him/her every time he/she attempts it. It may also mean that the player's communication skills are progressively improving and that his/her ability to do tasks with other people has improved. Lastly, it may mean that the player has already learned and memorized the positioning of the puzzle pieces, which may indicate that the player is a fast learner and that he/she has good memorization skills.", "The increasing average time that this player spends in playing this level per game use may mean that he/she is getting more interested in playing this particular level as time goes by, which may be due to the player being challenged by this level; in this case, it may mean that the player likes to challenge himself/herself. On the other hand, it may also mean that the player is struggling to communicate and cooperate with his/her playmate, which may mean that his/her communication skills have not yet improved. This may also mean that he/she is struggling to memorize and learn the positions of the puzzle pieces, which may indicate that the player is a slow learner or that he/she does not have good memorization skills.", "Since the amount of time that this player spends in playing this level per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player and/or his/her playmate does not seriously play this game or that his/her focus is still inconsistent. The collaborative nature of the game may also be a factor since the player and his/her playmate can be distracted by each other.", "Insufficient data."],
		"average_number_of_wrong_prompts_per_level" : ["The decreasing average number of wrong prompts per attempt on this level may mean that the player is progressively learning how to properly communicate and cooperate with other people in doing a task. This may mean that the player's communicative skills are improving. Also, this may mean that the player is progressively memorizing and learning the positions of the puzzle pieces, which may indictate that the player has good memorization skills.", "The increasing average number of wrong prompts per attempt on this level may mean that the player is struggling to learn how to properly communicate and cooperate with other people in doing a task. This may mean that the player's communication skills are not yet improving. Also, this may mean that the player, and perhaps his/her playmate, is struggling to memorize and learn the positions of the puzzle pieces, which may indicate that the player does not have good memorization skills.", "Since the average number of wrong prompts per attempt on this level shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player lacks focus and can be easily distracted while doing a task. It may also mean that the player and/or his/her playmate does not seriously play this game or that his/her focus is still inconsistent. The collaborative nature of the game may also be a factor since the player and his/her playmate can be distracted by each other.", "Insufficient data."],
		"number_of_attempts_per_level" : ["The decreasing number of attempts on this level may mean that this player is losing interest in playing this level, perhaps because he/she is already bored with playing on this level due to its easy difficulty; this may mean that the player's communication and cooperation skills are improving. On the other hand, it may also mean that the player is avoiding this level due to its hard difficulty; in this case, it may mean that the player is avoiding challenges and that he/she avoids tasks that are hard for him to do.", "The increasing number of attempts on this level may mean that this player is gaining interest in playing this level, perhaps because he/she finds this level fun or challenging; this may mean that the player likes to face challenges and that he/she wants to improve himself/herself even more. On the other hand, it may also mean that the player is repeatedly playing this level due to its easy difficulty; in this case, it may mean that the player is avoiding challenges and that he/she prefers to do tasks that are easy for him to do.", "Since the number of attempts on this level shows neither an increasing nor decreasing pattern, it may mean that there are times that the player finds this level easy or fun, while there are also times that he/she does not. In other words, the player's perception on this level is inconsistent.", "Insufficient data."],
		"average_number_of_moves_per_level" : ["The decreasing average number of moves per attempt on this level may mean that the player is progressively learning how to communicate and cooperate with other people to finish a task, which in this game is a puzzle. This may mean that the player's communication and cooperation skills are improving. This may also mean that the player is progressively memorizing and learning the positions of the puzzle pieces, which may indicate that the player has good memorization skills.", "The increasing average number of moves per attempt on this level may mean that the player is struggling to learn how to properly communicate and cooperate with other people in doing a task. This may mean that the player's cooperation and communication skills are not yet improving. Also, this may mean that the player, and perhaps his/her playmate, is struggling to memorize and learn the positions of the puzzle pieces, which may indicate that the player does not have good memorization skills.", "Since the number of moves per attempt on this level shows neither an increasing nor decreasing pattern, it may mean that there are times that the player finds this level easy, while there are also times that he/she does not. It may also mean that the player's abilities to communicate and cooperate with other people are still inconsistent.", "Insufficient data."]
	};
	const name = req.body.name;
	var res_values; //average per level, total time for each level, total time, average play time, characters chosen, wrong clicks per level, attempts per level
	const query = "SELECT * FROM third-game-stats WHERE name = " + name;
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			//relevant functions
			function isIncreasingOrDecreasing(listHere){
				var isIncOrDec = 0;
				if(listHere.length == 1){
					return 3;
				}
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] > listHere[i-1]){
							isIncOrDec = 1;
						}
						else{
							isIncOrDec = 0;
						}
					}
					else{
						if(listHere[i] >= listHere[i-1] && isIncOrDec == 0){
							return 2;
						}
						else if(listHere[i] <= listHere[i-1] && isIncOrDec == 1){
							return 2;
						}
					}
				}
				return isIncOrDec;
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
				var level = result[i].level;
				var time = result[i].time;
				var date = result[i].date;
				var wrong_prompt = result[i].wrong-prompt;
				var number_of_moves = result[i].moves;
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
			//end of main loop
			//analysis
			var result_values = {"whole-game-time" : [overall_total_play_time, analysis["overall_total_play_time"][isIncOrDec(overall_total_play_time)]],
			"average-play-time-level-1" : [average_play_time_per_level[0], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[0])]],
			"average-play-time-level-2" : [average_play_time_per_level[1], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[1])]],
			"average-play-time-level-3" : [average_play_time_per_level[2], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[2])]],
			"average-play-time-level-4" : [average_play_time_per_level[3], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[3])]],
			"average-play-time-level-5" : [average_play_time_per_level[4], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[4])]],
			"average-play-time-level-6" : [average_play_time_per_level[5], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[5])]],
			"average-number-of-wrong-prompts-level-1" : [wrong_prompts_per_level[0], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[0])]],
			"average-number-of-wrong-prompts-level-2" : [wrong_prompts_per_level[1], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[1])]],
			"average-number-of-wrong-prompts-level-3" : [wrong_prompts_per_level[2], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[2])]],
			"average-number-of-wrong-prompts-level-4" : [wrong_prompts_per_level[3], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[3])]],
			"average-number-of-wrong-prompts-level-5" : [wrong_prompts_per_level[4], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[4])]],
			"average-number-of-wrong-prompts-level-6" : [wrong_prompts_per_level[5], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[5])]],
			"number-of-attempts-level-1" : [attempts_per_level[0], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[0])]],
			"number-of-attempts-level-2" : [attempts_per_level[1], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[1])]],
			"number-of-attempts-level-3" : [attempts_per_level[2], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[2])]],
			"number-of-attempts-level-4" : [attempts_per_level[3], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[3])]],
			"number-of-attempts-level-5" : [attempts_per_level[4], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[4])]],
			"number-of-attempts-level-6" : [attempts_per_level[5], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[5])]],
			"average-number-of-moves-level-1" : [average_number_of_moves_per_attempt_per_level[0], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[0])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-2" : [average_number_of_moves_per_attempt_per_level[1], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[1])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-3" : [average_number_of_moves_per_attempt_per_level[2], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[2])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-4" : [average_number_of_moves_per_attempt_per_level[3], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[3])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-5" : [average_number_of_moves_per_attempt_per_level[4], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[4])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-6" : [average_number_of_moves_per_attempt_per_level[5], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[5])]]};
			//end of analysis
			// var average_time_per_level = [0,0,0,0,0,0,0];
			// for(var i=0; i<7; i++){
			// 	average_time_per_level[i] = time_per_level[i]/games_per_level[i];
			// 	total_play_time += time_per_level[i];
			// 	total_number_of_games += games_per_level[i];
			// }
			// res_values = {average_time_per_level:average_time_per_level, time_per_level:time_per_level, total_play_time:total_play_time, total_average_play_time: total_play_time/total_number_of_games,characters:characters,wrong_clicks:wrong_clicks};
			// res.send(res_values);
		}
	});
});

//behavioural game
app.post('/get_third_game_data', (req, res) => {
	const characters = [];
	const analysis = {
		"average_play_time_per_level" : ["The decreasing average time that this player spends in playing this level per game use may mean that he/she is getting less interested in playing this particular level, which may be due to the player being bored at doing something repeatedly after some time. On the other hand, it may also mean that the player has progressively improved his/her focus while completing a task, thus he/she spends lesser time in order to complete this level; this may mean that the player is getting less easy to distract.", "The increasing average time that this player spends in playing this level per game use may mean that he/she is getting more interested in playing this particular level, which may be due to the player being challenged by the difficulty of this level; this may mean that the player likes to challenge himself/herself and that he/she is not afraid to do a task that is hard for him/her. It may also mean that the player is struggling to improve his/her focus while completing a task, thus he/she spends more time in order to complete this level; this may mean that the player is still easy to distract.", "Since the amount of time that this player spends in playing this level per game use shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player still lacks focus and can be easily distracted while doing a task. It may also mean that the player does not seriously play this game or that his/her focus is still inconsistent.", "Insufficient data."],
		"total_play_time" : ["The decreasing time that this player spends in playing this game per website use may mean that the player's focus has improved and that he/she has needed less time to complete the levels. On the other hand, this may also mean that he/she is losing interest in playing the game as time goes by, maybe because he/she finds the game too easy, or because he/she is struggling to complete the game — these cases may mean that the player is either improving his/her focus or he/she is getting easier to be distracted.", "The increasing time that this player spends in playing this game per website use may mean that the player's focus has not yet improved such that he/she still needs more time to complete the levels of the game; in this case, it may mean that the player is still easily distracted from doing a task assigned to him/her. On the other hand, this increase in time spent may also mean that he/she is gaining interest in playing the game, maybe because he/she finds the game challenging and fun; in this case, it may mean that the player likes to challenge himself/herself.", "Since the amount of time that this player spends in playing the game shows neither an increasing nor decreasing pattern, it may mean that the player gets distracted by external factors while playing the game (e.g. he/she does something else while playing the game at some times), which may mean that the player still lacks focus and can still be easily distracted while doing a task.", "Insufficient data."],
		"character_chosen" : ["The uniformity of selections for character n may mean that the player only likes to stick to one option (his/her first choice), perhaps because this is his/her favorite. It may mean that the player is not interested in trying other different things and that he/she likes to follow only one routine. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The selections between the two characters may mean that the player likes a little variation and that the player likes to experience something new from time to time; it may also mean that the player is easy to become bored from something. The collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "The variation of selections may mean that the player is explorative and that he/she is open to try and experience new things. Also, the collected data shows that his/her favorite character is character n, which may be due to the gender of the character or due to the design of the clothes of the character.", "Insufficient data."],
		"average_number_of_clicks" : ["The decreasing average number of wrong clicks per attempt on this level may mean that the player is progressively learning how to properly focus on finding the assigned character. This may mean that the player's focus is improving or that he/she is becoming less easy to distract.", "The increasing average number of wrong clicks per attempt on this level may mean that the player is struggling to learn how to properly focus on finding the assigned character. This may mean that the player's focus is not yet improving or that he/she is still easy to distract.", "Since the average number of wrong clicks per attempt on this level shows neither an increasing nor decreasing pattern, it may mean that this player is still struggling to be consistent in focusing on the assigned task to him/her. This may also mean that the player plays this level randomly or that he/she does not seriously play it. Other external factors can also be a factor of this (e.g. the player is doing something else while playing), which may also be due to the player being easily distracted.", "Insufficient data."],
		"number_of_attempts_per_level" : ["The decreasing number of attempts on this level may mean that the player is losing interest in playing this level, perhaps because he/she is already bored with playing on this level. This may mean that the player's focus is improving or that he/she is becoming less easy to distract. On the other hand, it may also mean that the player is avoiding this level due to the hard difficulty; in this case, it may mean that the player is avoiding challenges and that he/she avoids tasks that are hard for him to do.", "The increasing number of attempts on this level may mean that the player is gaining interest in playing this level, perhaps because he/she finds this level fun or challenging; this may mean that the player likes to face challenges and that he/she wants to improve himself/herself even more. On the other hand, it may also mean that the player is repeatedly playing this level due to the easy difficulty; in this case, it may mean that the player is avoiding challenges and that he/she prefers to do tasks that are easy for him to do.", "Since the number of attempts on this level shows neither an increasing nor decreasing pattern, it may mean that the player's focus is still inconsistent due to him/her having various perceptions on the difficulty of the level. In other words, there are times that the player finds this level as easy or fun, while there are also times that he/she does not.", "Insufficient data."]
	};
	const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	const name = req.body.name;
	var res_values; //average per level, total time for each level, total time, average play time, characters chosen, wrong clicks per level, attempts per level
	const query = "SELECT * FROM second-game-stats WHERE name = " + name;
	db.query(query, function (err, result){
		if(err){
			console.log(err);
		}
		else{
			//relevant functions
			function isIncreasingOrDecreasing(listHere){
				var isIncOrDec = 0;
				if(listHere.length == 1){
					return 3;
				}
				for(var i=1; i<listHere.length; i++){
					if(i == 1){
						if(listHere[i] > listHere[i-1]){
							isIncOrDec = 1;
						}
						else{
							isIncOrDec = 0;
						}
					}
					else{
						if(listHere[i] >= listHere[i-1] && isIncOrDec == 0){
							return 2;
						}
						else if(listHere[i] <= listHere[i-1] && isIncOrDec == 1){
							return 2;
						}
					}
				}
				return isIncOrDec;
			}
			//end of relevant functions
			//relevant variables
			var characters = [];
			var characters_count = {};
			var playtime_list_per_level_average = [[],[],[],[],[],[],[]];
			var playtime_list_per_level_total = [[],[],[],[],[],[],[]];
			var play_count_per_level = [[],[],[],[],[],[]];
			var wrong_clicks_per_level = [[],[],[],[],[],[],[]];
			var attempts_per_level = [[],[],[],[],[],[],[]];
			var latest_date;
			var latest_level = level;
			var play_counter_for_current_date = 0, time_counter_for_current_date = 0, wrong_clicks_counter_for_current_date = 0;
			//end of relevant variables
			//main loop for all values in database
			for(var i=0; i<result.length; i++){
				var level = result[i].level;
				var time = result[i].time;
				var character = result[i].character;
				var wrong_clicks = result[i].wrong-clicks;
				var date = result[i].date;
				if(i == 0){
					latest_date = date;
					play_counter_for_current_date += 1;
					time_counter_for_current_date += time;
					
				}
			}
			//end of main loop for all values in database
			//analysis
			var result_values = {"whole-game-time" : [overall_total_play_time, analysis["overall_total_play_time"][isIncOrDec(overall_total_play_time)]],
			"average-play-time-level-1" : [average_play_time_per_level[0], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[0])]],
			"average-play-time-level-2" : [average_play_time_per_level[1], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[1])]],
			"average-play-time-level-3" : [average_play_time_per_level[2], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[2])]],
			"average-play-time-level-4" : [average_play_time_per_level[3], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[3])]],
			"average-play-time-level-5" : [average_play_time_per_level[4], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[4])]],
			"average-play-time-level-6" : [average_play_time_per_level[5], analysis["average_play_time_per_level"][isIncOrDec(average_play_time_per_level[5])]],
			"average-number-of-wrong-prompts-level-1" : [wrong_prompts_per_level[0], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[0])]],
			"average-number-of-wrong-prompts-level-2" : [wrong_prompts_per_level[1], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[1])]],
			"average-number-of-wrong-prompts-level-3" : [wrong_prompts_per_level[2], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[2])]],
			"average-number-of-wrong-prompts-level-4" : [wrong_prompts_per_level[3], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[3])]],
			"average-number-of-wrong-prompts-level-5" : [wrong_prompts_per_level[4], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[4])]],
			"average-number-of-wrong-prompts-level-6" : [wrong_prompts_per_level[5], analysis["average_number_of_wrong_prompts_per_level"][isIncOrDec(wrong_prompts_per_level[5])]],
			"number-of-attempts-level-1" : [attempts_per_level[0], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[0])]],
			"number-of-attempts-level-2" : [attempts_per_level[1], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[1])]],
			"number-of-attempts-level-3" : [attempts_per_level[2], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[2])]],
			"number-of-attempts-level-4" : [attempts_per_level[3], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[3])]],
			"number-of-attempts-level-5" : [attempts_per_level[4], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[4])]],
			"number-of-attempts-level-6" : [attempts_per_level[5], analysis["number_of_attempts_per_level"][isIncOrDec(attempts_per_level[5])]],
			"average-number-of-moves-level-1" : [average_number_of_moves_per_attempt_per_level[0], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[0])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-2" : [average_number_of_moves_per_attempt_per_level[1], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[1])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-3" : [average_number_of_moves_per_attempt_per_level[2], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[2])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-4" : [average_number_of_moves_per_attempt_per_level[3], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[3])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-5" : [average_number_of_moves_per_attempt_per_level[4], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[4])]],"average_number_of_moves_per_level"
			"average-number-of-moves-level-6" : [average_number_of_moves_per_attempt_per_level[5], analysis["average_number_of_moves_per_level"][isIncOrDec(average_number_of_moves_per_attempt_per_level[5])]]};
			//end of analysis
		}
	});
});