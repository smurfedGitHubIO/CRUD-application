import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [full_name, setFullname] = useState("");
	const [age, setAge] = useState(0);
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [usertype, setUsertype] = useState("");
	const [connections, setConnections] = useState("");
	const [first_game_data, setFirstgamedata] = useState([]);
	var current_username;

//register user function

	const register_user = () => {
		axios.post("http://localhost:3002/register-new-user", {
			username: username,
			password: password,
			full_name: full_name,
			age: age,
			address: address,
			email: email,
			usertype: usertype,
			connections: connections
		}).then(() => {
			console.log("User registered.");
		});
	};

//login function

	const login = () => {
		axios.post("http://localhost:3002/login_authentication", {
			username: username,
			password: password
		}).then((resp) => {
			console.log("Login successful.");
		});
	};

//password update function

	const update_password = () => {
		axios.post("http://localhost:3002/update_password", {
			username: username,
			password: password
		}).then((resp) => {
			console.log("Password update successful.");
		});
	};

	const insert_first_game_data = () => {
		axios.post("http://localhost:3002/first_game_insert", {
			username : username,
			date1 : date1,
			level1 : level1,
			time1 : time1,
			mini_game_time : mini_game_time,
			win_or_lose : win_or_lose,
			character1 : character1,
			wrong_answers : wrong_answers
		}).then((resp) => {
			console.log("Data insertion successful.");
		});
	};

	const insert_second_game_data = () => {
		axios.post("http://localhost:3002/second_game_insert", {
			username : username,
			date1 : date1,
			level1 : level1,
			time1 : time1,
			wrong_prompts: wrong_prompts,
			moves: moves
		}).then((resp) => {
			console.log("Data insertion successful.");
		});
	};

	const insert_third_game_data = () => {
		axios.post("http://localhost:3002/third_game_insert", {
			username : username,
			date1 : date1,
			level1 : level1,
			time1 : time1,
			character1 : character1,
			wrong_clicks : wrong_clicks
		}).then((resp) => {
			console.log("Data insertion successful.");
		});
	};

//get users list function

	const get_users_list = () => {
		axios.get("http://localhost:3002/users_list").then((resp) => {
			setFirstgamedata(resp.data);
		});
	};

//get current user function
//get analyzed data
	const get_user = () => {
		axios.get("http://localhost:3002/get_guardians_connection").then((resp) => {
			axios.get("http://localhost:3002/get_first_game_data", {
				name: resp.data
			}).then((resp2) => {
				setFirstgamedata(resp2.data);
				document.getElementById('game-play-time11').innerHTML = "Overall Play Time";
				document.getElementById('mini-game-time1').innerHTML = "Mini game time";
				document.getElementById('house-play-time-house-joy1').innerHTML = "House Play Time (Joy)";
				document.getElementById('house-play-time-house-anger1').innerHTML = "House Play Time (Anger)";
				document.getElementById('house-play-time-house-disgust1').innerHTML = "House Play Time (Disgust)";
				document.getElementById('house-play-time-house-fear1').innerHTML = "House Play Time (Fear)";
				document.getElementById('house-play-time-house-sadness1').innerHTML = "House Play Time (Sadness)";
				document.getElementById('house-play-time-house-surprise1').innerHTML = "House Play Time (Surprise)";
				document.getElementById('house-play-time-win-only-house-joy1').innerHTML = "House Play Time (Joy, Win Only)";
				document.getElementById('house-play-time-win-only-house-anger1').innerHTML = "House Play Time (Anger, Win Only)";
				document.getElementById('house-play-time-win-only-house-disgust1').innerHTML = "House Play Time (Disgust, Win Only)";
				document.getElementById('house-play-time-win-only-house-fear1').innerHTML = "House Play Time (Fear, Win Only)";
				document.getElementById('house-play-time-win-only-house-sadness1').innerHTML = "House Play Time (Sadness, Win Only)";
				document.getElementById('house-play-time-win-only-house-surprise1').innerHTML = "House Play Time (Surprise, Win Only)";
				document.getElementById('character-chosen1').innerHTML = "Character Chosen";
				document.getElementById('tries-before-completion-house-joy1').innerHTML = "Tries Before Completion (Joy)";
				document.getElementById('tries-before-completion-house-anger1').innerHTML = "Tries Before Completion (Anger)";
				document.getElementById('tries-before-completion-house-disgust1').innerHTML = "Tries Before Completion (Disgust)";
				document.getElementById('tries-before-completion-house-fear1').innerHTML = "Tries Before Completion (Fear)";
				document.getElementById('tries-before-completion-house-sadness1').innerHTML = "Tries Before Completion (Sadness)";
				document.getElementById('tries-before-completion-house-surprise1').innerHTML = "Tries Before Completion (Surprise)";
				document.getElementById('wrong-answers-per-attempt-house-joy1').innerHTML = "Wrong Answers Per Attempt (Joy)";
				document.getElementById('wrong-answers-per-attempt-house-anger1').innerHTML = "Wrong Answers Per Attempt (Anger)";
				document.getElementById('wrong-answers-per-attempt-house-disgust1').innerHTML = "Wrong Answers Per Attempt (Disgust)";
				document.getElementById('wrong-answers-per-attempt-house-fear1').innerHTML = "Wrong Answers Per Attempt (Fear)";
				document.getElementById('wrong-answers-per-attempt-house-sadness1').innerHTML = "Wrong Answers Per Attempt (Sadness)";
				document.getElementById('wrong-answers-per-attempt-house-surprise1').innerHTML = "Wrong Answers Per Attempt (Surprise)";
				document.getElementById('game-play-time1').innerHTML = resp2.data["game-play-time"][1];
				document.getElementById('mini-game-time').innerHTML = resp2.data["mini-game-time"][1];
				document.getElementById('house-play-time-house-joy').innerHTML = resp2.data["house-play-time-house-joy"][1];
				document.getElementById('house-play-time-house-anger').innerHTML = resp2.data["house-play-time-house-anger"][1];
				document.getElementById('house-play-time-house-disgust').innerHTML = resp2.data["house-play-time-house-disgust"][1];
				document.getElementById('house-play-time-house-fear').innerHTML = resp2.data["house-play-time-house-fear"][1];
				document.getElementById('house-play-time-house-sadness').innerHTML = resp2.data["house-play-time-house-sadness"][1];
				document.getElementById('house-play-time-house-surprise').innerHTML = resp2.data["house-play-time-house-surprise"][1];
				document.getElementById('house-play-time-win-only-house-joy').innerHTML = resp2.data["house-play-time-win-only-house-joy"][1];
				document.getElementById('house-play-time-win-only-house-anger').innerHTML = resp2.data["house-play-time-win-only-house-anger"][1];
				document.getElementById('house-play-time-win-only-house-disgust').innerHTML = resp2.data["house-play-time-win-only-house-disgust"][1];
				document.getElementById('house-play-time-win-only-house-fear').innerHTML = resp2.data["house-play-time-win-only-house-fear"][1];
				document.getElementById('house-play-time-win-only-house-sadness').innerHTML = resp2.data["house-play-time-win-only-house-sadness"][1];
				document.getElementById('house-play-time-win-only-house-surprise').innerHTML = resp2.data["house-play-time-win-only-house-surprise"][1];
				document.getElementById('character-chosen').innerHTML = resp2.data["character-chosen"][1];
				document.getElementById('tries-before-completion-house-joy').innerHTML = resp2.data["tries-before-completion-house-joy"][1];
				document.getElementById('tries-before-completion-house-anger').innerHTML = resp2.data["tries-before-completion-house-anger"][1];
				document.getElementById('tries-before-completion-house-disgust').innerHTML = resp2.data["tries-before-completion-house-disgust"][1];
				document.getElementById('tries-before-completion-house-fear').innerHTML = resp2.data["tries-before-completion-house-fear"][1];
				document.getElementById('tries-before-completion-house-sadness').innerHTML = resp2.data["tries-before-completion-house-sadness"][1];
				document.getElementById('tries-before-completion-house-surprise').innerHTML = resp2.data["tries-before-completion-house-surprise"][1];
				document.getElementById('wrong-answers-per-attempt-house-joy').innerHTML = resp2.data["wrong-answers-per-attempt-house-joy"][1];
				document.getElementById('wrong-answers-per-attempt-house-anger').innerHTML = resp2.data["wrong-answers-per-attempt-house-anger"][1];
				document.getElementById('wrong-answers-per-attempt-house-disgust').innerHTML = resp2.data["wrong-answers-per-attempt-house-disgust"][1];
				document.getElementById('wrong-answers-per-attempt-house-fear').innerHTML = resp2.data["wrong-answers-per-attempt-house-fear"][1];
				document.getElementById('wrong-answers-per-attempt-house-sadness').innerHTML = resp2.data["wrong-answers-per-attempt-house-sadness"][1];
				document.getElementById('wrong-answers-per-attempt-house-surprise').innerHTML = resp2.data["wrong-answers-per-attempt-house-surprise"][1];
			});
			axios.get("http://localhost:3002/get_second_game_data", {
				name: resp.data
			}).then((resp2) => {
				console.log(resp2.data);
				document.getElementById('whole-game-time-second-game1').innerHTML = "Whole Game Time";
				document.getElementById('average-play-time-second-game-level-11').innerHTML = "Average Play Time (Level 1)";
				document.getElementById('average-play-time-second-game-level-21').innerHTML = "Average Play Time (Level 2)";
				document.getElementById('average-play-time-second-game-level-31').innerHTML = "Average Play Time (Level 3)";
				document.getElementById('average-play-time-second-game-level-41').innerHTML = "Average Play Time (Level 4)";
				document.getElementById('average-play-time-second-game-level-51').innerHTML = "Average Play Time (Level 5)";
				document.getElementById('average-play-time-second-game-level-61').innerHTML = "Average Play Time (Level 6)";
				document.getElementById('average-number-of-wrong-prompts-level-11').innerHTML = "Average Number of Wrong Prompts (Level 1)";
				document.getElementById('average-number-of-wrong-prompts-level-21').innerHTML = "Average Number of Wrong Prompts (Level 2)";
				document.getElementById('average-number-of-wrong-prompts-level-31').innerHTML = "Average Number of Wrong Prompts (Level 3)";
				document.getElementById('average-number-of-wrong-prompts-level-41').innerHTML = "Average Number of Wrong Prompts (Level 4)";
				document.getElementById('average-number-of-wrong-prompts-level-51').innerHTML = "Average Number of Wrong Prompts (Level 5)";
				document.getElementById('average-number-of-wrong-prompts-level-61').innerHTML = "Average Number of Wrong Prompts (Level 6)";
				document.getElementById('number-of-attempts-second-game-level-11').innerHTML = "Average Number of Attempts (Level 1)";
				document.getElementById('number-of-attempts-second-game-level-21').innerHTML = "Average Number of Attempts (Level 2)";
				document.getElementById('number-of-attempts-second-game-level-31').innerHTML = "Average Number of Attempts (Level 3)";
				document.getElementById('number-of-attempts-second-game-level-41').innerHTML = "Average Number of Attempts (Level 4)";
				document.getElementById('number-of-attempts-second-game-level-51').innerHTML = "Average Number of Attempts (Level 5)";
				document.getElementById('number-of-attempts-second-game-level-61').innerHTML = "Average Number of Attempts (Level 6)";
				document.getElementById('average-number-of-moves-level-11').innerHTML = "Average Number of Moves (Level 1)";
				document.getElementById('average-number-of-moves-level-21').innerHTML = "Average Number of Moves (Level 2)";
				document.getElementById('average-number-of-moves-level-31').innerHTML = "Average Number of Moves (Level 3)";
				document.getElementById('average-number-of-moves-level-41').innerHTML = "Average Number of Moves (Level 4)";
				document.getElementById('average-number-of-moves-level-51').innerHTML = "Average Number of Moves (Level 5)";
				document.getElementById('average-number-of-moves-level-61').innerHTML = "Average Number of Moves (Level 6)";
				document.getElementById('whole-game-time-second-game').innerHTML = resp2.data["whole-game-time"][1];
				document.getElementById('average-play-time-second-game-level-1').innerHTML = resp2.data["average-play-time-second-game-level-1"][1];
				document.getElementById('average-play-time-second-game-level-2').innerHTML = resp2.data["average-play-time-second-game-level-2"][1];
				document.getElementById('average-play-time-second-game-level-3').innerHTML = resp2.data["average-play-time-second-game-level-3"][1];
				document.getElementById('average-play-time-second-game-level-4').innerHTML = resp2.data["average-play-time-second-game-level-4"][1];
				document.getElementById('average-play-time-second-game-level-5').innerHTML = resp2.data["average-play-time-second-game-level-5"][1];
				document.getElementById('average-play-time-second-game-level-6').innerHTML = resp2.data["average-play-time-second-game-level-6"][1];
				document.getElementById('average-number-of-wrong-prompts-level-1').innerHTML = resp2.data["average-number-of-wrong-prompts-level-1"][1];
				document.getElementById('average-number-of-wrong-prompts-level-2').innerHTML = resp2.data["average-number-of-wrong-prompts-level-2"][1];
				document.getElementById('average-number-of-wrong-prompts-level-3').innerHTML = resp2.data["average-number-of-wrong-prompts-level-3"][1];
				document.getElementById('average-number-of-wrong-prompts-level-4').innerHTML = resp2.data["average-number-of-wrong-prompts-level-4"][1];
				document.getElementById('average-number-of-wrong-prompts-level-5').innerHTML = resp2.data["average-number-of-wrong-prompts-level-5"][1];
				document.getElementById('average-number-of-wrong-prompts-level-6').innerHTML = resp2.data["average-number-of-wrong-prompts-level-6"][1];
				document.getElementById('number-of-attempts-second-game-level-1').innerHTML = resp2.data["number-of-attempts-second-game-level-1"][1];
				document.getElementById('number-of-attempts-second-game-level-2').innerHTML = resp2.data["number-of-attempts-second-game-level-2"][1];
				document.getElementById('number-of-attempts-second-game-level-3').innerHTML = resp2.data["number-of-attempts-second-game-level-3"][1];
				document.getElementById('number-of-attempts-second-game-level-4').innerHTML = resp2.data["number-of-attempts-second-game-level-4"][1];
				document.getElementById('number-of-attempts-second-game-level-5').innerHTML = resp2.data["number-of-attempts-second-game-level-5"][1];
				document.getElementById('number-of-attempts-second-game-level-6').innerHTML = resp2.data["number-of-attempts-second-game-level-6"][1];
				document.getElementById('average-number-of-moves-level-1').innerHTML = resp2.data["average-number-of-moves-level-1"][1];
				document.getElementById('average-number-of-moves-level-2').innerHTML = resp2.data["average-number-of-moves-level-2"][1];
				document.getElementById('average-number-of-moves-level-3').innerHTML = resp2.data["average-number-of-moves-level-3"][1];
				document.getElementById('average-number-of-moves-level-4').innerHTML = resp2.data["average-number-of-moves-level-4"][1];
				document.getElementById('average-number-of-moves-level-5').innerHTML = resp2.data["average-number-of-moves-level-5"][1];
				document.getElementById('average-number-of-moves-level-6').innerHTML = resp2.data["average-number-of-moves-level-6"][1];
			});
			axios.get("http://localhost:3002/get_third_game_data", {
				name: resp.data
			}).then((resp2) => {
				console.log(resp2.data);
				document.getElementById('whole-game-time1').innerHTML = "Whole Game Time";
				document.getElementById('average-play-time-level-11').innerHTML = "Average Play Time (Level 1)";
				document.getElementById('average-play-time-level-21').innerHTML = "Average Play Time (Level 2)";
				document.getElementById('average-play-time-level-31').innerHTML = "Average Play Time (Level 3)";
				document.getElementById('average-play-time-level-41').innerHTML = "Average Play Time (Level 4)";
				document.getElementById('average-play-time-level-51').innerHTML = "Average Play Time (Level 5)";
				document.getElementById('average-play-time-level-61').innerHTML = "Average Play Time (Level 6)";
				document.getElementById('character-chosen-third-game1').innerHTML = "Character Chosen";
				document.getElementById('number-of-attempts-level-11').innerHTML = "Average Number of Attempts (Level 1)";
				document.getElementById('number-of-attempts-level-21').innerHTML = "Average Number of Attempts (Level 2)";
				document.getElementById('number-of-attempts-level-31').innerHTML = "Average Number of Attempts (Level 3)";
				document.getElementById('number-of-attempts-level-41').innerHTML = "Average Number of Attempts (Level 4)";
				document.getElementById('number-of-attempts-level-51').innerHTML = "Average Number of Attempts (Level 5)";
				document.getElementById('number-of-attempts-level-61').innerHTML = "Average Number of Attempts (Level 6)";
				document.getElementById('average-number-of-wrong-clicks-level-11').innerHTML = "Average Number of Wrong Clicks (Level 1)" ;
				document.getElementById('average-number-of-wrong-clicks-level-21').innerHTML = "Average Number of Wrong Clicks (Level 2)" ;
				document.getElementById('average-number-of-wrong-clicks-level-31').innerHTML = "Average Number of Wrong Clicks (Level 3)" ;
				document.getElementById('average-number-of-wrong-clicks-level-41').innerHTML = "Average Number of Wrong Clicks (Level 4)" ;
				document.getElementById('average-number-of-wrong-clicks-level-51').innerHTML = "Average Number of Wrong Clicks (Level 5)" ;
				document.getElementById('average-number-of-wrong-clicks-level-61').innerHTML = "Average Number of Wrong Clicks (Level 6)" ;
				document.getElementById('whole-game-time').innerHTML = resp2.data["whole-game-time"][1];
				document.getElementById('average-play-time-level-1').innerHTML = resp2.data["average-play-time-level-1"][1];
				document.getElementById('average-play-time-level-2').innerHTML = resp2.data["average-play-time-level-2"][1];
				document.getElementById('average-play-time-level-3').innerHTML = resp2.data["average-play-time-level-3"][1];
				document.getElementById('average-play-time-level-4').innerHTML = resp2.data["average-play-time-level-4"][1];
				document.getElementById('average-play-time-level-5').innerHTML = resp2.data["average-play-time-level-5"][1];
				document.getElementById('average-play-time-level-6').innerHTML = resp2.data["average-play-time-level-6"][1];
				document.getElementById('character-chosen-third-game').innerHTML = resp2.data["character-chosen"][1];
				document.getElementById('number-of-attempts-level-1').innerHTML = resp2.data["number-of-attempts-level-1"][1];
				document.getElementById('number-of-attempts-level-2').innerHTML = resp2.data["number-of-attempts-level-2"][1];
				document.getElementById('number-of-attempts-level-3').innerHTML = resp2.data["number-of-attempts-level-3"][1];
				document.getElementById('number-of-attempts-level-4').innerHTML = resp2.data["number-of-attempts-level-4"][1];
				document.getElementById('number-of-attempts-level-5').innerHTML = resp2.data["number-of-attempts-level-5"][1];
				document.getElementById('number-of-attempts-level-6').innerHTML = resp2.data["number-of-attempts-level-6"][1];
				document.getElementById('average-number-of-wrong-clicks-level-1').innerHTML = resp2.data["average-number-of-wrong-clicks-level-1"][1];
				document.getElementById('average-number-of-wrong-clicks-level-2').innerHTML = resp2.data["average-number-of-wrong-clicks-level-2"][1];
				document.getElementById('average-number-of-wrong-clicks-level-3').innerHTML = resp2.data["average-number-of-wrong-clicks-level-3"][1];
				document.getElementById('average-number-of-wrong-clicks-level-4').innerHTML = resp2.data["average-number-of-wrong-clicks-level-4"][1];
				document.getElementById('average-number-of-wrong-clicks-level-5').innerHTML = resp2.data["average-number-of-wrong-clicks-level-5"][1];
				document.getElementById('average-number-of-wrong-clicks-level-6').innerHTML = resp2.data["average-number-of-wrong-clicks-level-6"][1];
			});
			axios.get("http://localhost:3002/game_conclusions", {
				name: resp.data
			}).then((resp2) => {
				console.log(resp2.data);
				document.getElementById('overall_conclusion_title').innerHTML = "Overall Conclusion";
				document.getElementById('overall_conclusion').innerHTML = resp2.data;
			});
		});
	}
	return (
		<div>
		<button onClick = {get_user}>Analyze Data</button>
		<div>
			<div className={styles.boxes}>
				<p id="game-play-time11"></p>
				<p id="game-play-time1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="mini-game-time1"></p>
				<p id="mini-game-time"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-house-joy1"></p>
				<p id="house-play-time-house-joy"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-house-anger1"></p>
				<p id="house-play-time-house-anger"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-house-disgust1"></p>
				<p id="house-play-time-house-disgust"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-house-fear1"></p>
				<p id="house-play-time-house-fear"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-house-sadness1"></p>
				<p id="house-play-time-house-sadness"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-house-surprise1"></p>
				<p id="house-play-time-house-surprise"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-win-only-house-joy1"></p>
				<p id="house-play-time-win-only-house-joy"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-win-only-house-anger1"></p>
				<p id="house-play-time-win-only-house-anger"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-win-only-house-disgust1"></p>
				<p id="house-play-time-win-only-house-disgust"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-win-only-house-fear1"></p>
				<p id="house-play-time-win-only-house-fear"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-win-only-house-sadness1"></p>
				<p id="house-play-time-win-only-house-sadness"></p>
			</div>
			<div className={styles.boxes}>
				<p id="house-play-time-win-only-house-surprise1"></p>
				<p id="house-play-time-win-only-house-surprise"></p>
			</div>
			<div className={styles.boxes}>
				<p id="character-chosen-first-game1"></p>
				<p id="character-chosen-first-game"></p>
			</div>
			<div className={styles.boxes}>
				<p id="tries-before-completion-house-joy1"></p>
				<p id="tries-before-completion-house-joy"></p>
			</div>
			<div className={styles.boxes}>
				<p id="tries-before-completion-house-anger1"></p>
				<p id="tries-before-completion-house-anger"></p>
			</div>
			<div className={styles.boxes}>
				<p id="tries-before-completion-house-disgust1"></p>
				<p id="tries-before-completion-house-disgust"></p>
			</div>
			<div className={styles.boxes}>
				<p id="tries-before-completion-house-fear1"></p>
				<p id="tries-before-completion-house-fear"></p>
			</div>
			<div className={styles.boxes}>
				<p id="tries-before-completion-house-sadness1"></p>
				<p id="tries-before-completion-house-sadness"></p>
			</div>
			<div className={styles.boxes}>
				<p id="tries-before-completion-house-surprise1"></p>
				<p id="tries-before-completion-house-surprise"></p>
			</div>
			<div className={styles.boxes}>
				<p id="wrong-answers-per-attempt-house-joy1"></p>
				<p id="wrong-answers-per-attempt-house-joy"></p>
			</div>
			<div className={styles.boxes}>
				<p id="wrong-answers-per-attempt-house-anger1"></p>
				<p id="wrong-answers-per-attempt-house-anger"></p>
			</div>
			<div className={styles.boxes}>
				<p id="wrong-answers-per-attempt-house-disgust1"></p>
				<p id="wrong-answers-per-attempt-house-disgust"></p>
			</div>
			<div className={styles.boxes}>
				<p id="wrong-answers-per-attempt-house-fear1"></p>
				<p id="wrong-answers-per-attempt-house-fear"></p>
			</div>
			<div className={styles.boxes}>
				<p id="wrong-answers-per-attempt-house-sadness1"></p>
				<p id="wrong-answers-per-attempt-house-sadness"></p>
			</div>
			<div className={styles.boxes}>
				<p id="wrong-answers-per-attempt-house-surprise1"></p>
				<p id="wrong-answers-per-attempt-house-surprise"></p>
			</div>
		</div>
		<div>
			<div className={styles.boxes}>
				<p id="whole-game-time-second-game1"></p>
				<p id="whole-game-time-second-game"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-second-game-level-11"></p>
				<p id="average-play-time-second-game-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-second-game-level-21"></p>
				<p id="average-play-time-second-game-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-second-game-level-31"></p>
				<p id="average-play-time-second-game-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-second-game-level-41"></p>
				<p id="average-play-time-second-game-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-second-game-level-51"></p>
				<p id="average-play-time-second-game-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-second-game-level-61"></p>
				<p id="average-play-time-second-game-level-6"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-prompts-level-11"></p>
				<p id="average-number-of-wrong-prompts-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-prompts-level-21"></p>
				<p id="average-number-of-wrong-prompts-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-prompts-level-31"></p>
				<p id="average-number-of-wrong-prompts-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-prompts-level-41"></p>
				<p id="average-number-of-wrong-prompts-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-prompts-level-51"></p>
				<p id="average-number-of-wrong-prompts-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-prompts-level-61"></p>
				<p id="average-number-of-wrong-prompts-level-6"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-second-game-level-11"></p>
				<p id="number-of-attempts-second-game-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-second-game-level-21"></p>
				<p id="number-of-attempts-second-game-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-second-game-level-31"></p>
				<p id="number-of-attempts-second-game-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-second-game-level-41"></p>
				<p id="number-of-attempts-second-game-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-second-game-level-51"></p>
				<p id="number-of-attempts-second-game-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-second-game-level-61"></p>
				<p id="number-of-attempts-second-game-level-6"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-moves-level-11"></p>
				<p id="average-number-of-moves-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-moves-level-21"></p>
				<p id="average-number-of-moves-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-moves-level-31"></p>
				<p id="average-number-of-moves-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-moves-level-41"></p>
				<p id="average-number-of-moves-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-moves-level-51"></p>
				<p id="average-number-of-moves-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-moves-level-61"></p>
				<p id="average-number-of-moves-level-6"></p>
			</div>
		</div>
		<div>
			<div className={styles.boxes}>
				<p id="whole-game-time1"></p>
				<p id="whole-game-time"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-level-11"></p>
				<p id="average-play-time-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-level-21"></p>
				<p id="average-play-time-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-level-31"></p>
				<p id="average-play-time-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-level-41"></p>
				<p id="average-play-time-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-level-51"></p>
				<p id="average-play-time-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-play-time-level-61"></p>
				<p id="average-play-time-level-6"></p>
			</div>
			<div className={styles.boxes}>
				<p id="character-chosen-third-game1"></p>
				<p id="character-chosen-third-game"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-level-11"></p>
				<p id="number-of-attempts-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-level-21"></p>
				<p id="number-of-attempts-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-level-31"></p>
				<p id="number-of-attempts-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-level-41"></p>
				<p id="number-of-attempts-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-level-51"></p>
				<p id="number-of-attempts-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="number-of-attempts-level-61"></p>
				<p id="number-of-attempts-level-6"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-clicks-level-11"></p>
				<p id="average-number-of-wrong-clicks-level-1"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-clicks-level-21"></p>
				<p id="average-number-of-wrong-clicks-level-2"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-clicks-level-31"></p>
				<p id="average-number-of-wrong-clicks-level-3"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-clicks-level-41"></p>
				<p id="average-number-of-wrong-clicks-level-4"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-clicks-level-51"></p>
				<p id="average-number-of-wrong-clicks-level-5"></p>
			</div>
			<div className={styles.boxes}>
				<p id="average-number-of-wrong-clicks-level-61"></p>
				<p id="average-number-of-wrong-clicks-level-6"></p>
			</div>
		</div>
		<div>
			<div className={styles.boxes}>
				<p id="overall_conclusion_title"></p>
				<p id="overall_conclusion"></p>
			</div>
		</div>
		</div>
	);
}

export default App;