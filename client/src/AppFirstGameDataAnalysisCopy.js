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

//get users list function

	const get_users_list = () => {
		axios.get("http://localhost:3002/users_list").then((resp) => {
			setFirstgamedata(resp.data);
		});
	};

//get current user function
//a must have when going to profile and games
	const get_user = () => {
		axios.get("http://localhost:3002/current_user").then((resp) => {
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
		});
	}
	return (
		<div>
		<button onClick = {get_user}>Analyze Data</button>
		<div class="boxes">
			<p id="game-play-time11"></p>
			<p id="game-play-time1"></p>
		</div>
		<div class="boxes">
			<p id="mini-game-time1"></p>
			<p id="mini-game-time"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-house-joy1"></p>
			<p id="house-play-time-house-joy"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-house-anger1"></p>
			<p id="house-play-time-house-anger"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-house-disgust1"></p>
			<p id="house-play-time-house-disgust"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-house-fear1"></p>
			<p id="house-play-time-house-fear"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-house-sadness1"></p>
			<p id="house-play-time-house-sadness"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-house-surprise1"></p>
			<p id="house-play-time-house-surprise"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-win-only-house-joy1"></p>
			<p id="house-play-time-win-only-house-joy"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-win-only-house-anger1"></p>
			<p id="house-play-time-win-only-house-anger"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-win-only-house-disgust1"></p>
			<p id="house-play-time-win-only-house-disgust"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-win-only-house-fear1"></p>
			<p id="house-play-time-win-only-house-fear"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-win-only-house-sadness1"></p>
			<p id="house-play-time-win-only-house-sadness"></p>
		</div>
		<div class="boxes">
			<p id="house-play-time-win-only-house-surprise1"></p>
			<p id="house-play-time-win-only-house-surprise"></p>
		</div>
		<div class="boxes">
			<p id="character-chosen1"></p>
			<p id="character-chosen"></p>
		</div>
		<div class="boxes">
			<p id="tries-before-completion-house-joy1"></p>
			<p id="tries-before-completion-house-joy"></p>
		</div>
		<div class="boxes">
			<p id="tries-before-completion-house-anger1"></p>
			<p id="tries-before-completion-house-anger"></p>
		</div>
		<div class="boxes">
			<p id="tries-before-completion-house-disgust1"></p>
			<p id="tries-before-completion-house-disgust"></p>
		</div>
		<div class="boxes">
			<p id="tries-before-completion-house-fear1"></p>
			<p id="tries-before-completion-house-fear"></p>
		</div>
		<div class="boxes">
			<p id="tries-before-completion-house-sadness1"></p>
			<p id="tries-before-completion-house-sadness"></p>
		</div>
		<div class="boxes">
			<p id="tries-before-completion-house-surprise1"></p>
			<p id="tries-before-completion-house-surprise"></p>
		</div>
		<div class="boxes">
			<p id="wrong-answers-per-attempt-house-joy1"></p>
			<p id="wrong-answers-per-attempt-house-joy"></p>
		</div>
		<div class="boxes">
			<p id="wrong-answers-per-attempt-house-anger1"></p>
			<p id="wrong-answers-per-attempt-house-anger"></p>
		</div>
		<div class="boxes">
			<p id="wrong-answers-per-attempt-house-disgust1"></p>
			<p id="wrong-answers-per-attempt-house-disgust"></p>
		</div>
		<div class="boxes">
			<p id="wrong-answers-per-attempt-house-fear1"></p>
			<p id="wrong-answers-per-attempt-house-fear"></p>
		</div>
		<div class="boxes">
			<p id="wrong-answers-per-attempt-house-sadness1"></p>
			<p id="wrong-answers-per-attempt-house-sadness"></p>
		</div>
		<div class="boxes">
			<p id="wrong-answers-per-attempt-house-surprise1"></p>
			<p id="wrong-answers-per-attempt-house-surprise"></p>
		</div>
		</div>
	);
}

export default App;

/*
<label>Username:</label>
		<input type="text" onChange={(event) => {
		  setUsername(event.target.value);
		}} />
		<label>Password:</label>
		<input type="password" onChange={(event) => {
		  setPassword(event.target.value);
		}} />
		<label>Full Name:</label>
		<input type="text" onChange={(event) => {
		  setFullname(event.target.value);
		}} />
		<label>Age:</label>
		<input type="number" onChange={(event) => {
		  setAge(event.target.value);
		}} />
		<label>Address:</label>
		<input type="text" onChange={(event) => {
		  setAddress(event.target.value);
		}} />
		<label>Email:</label>
		<input type="text" onChange={(event) => {
		  setEmail(event.target.value);
		}} />
		<label>Usertype:</label>
		<input type="text" onChange={(event) => {
		  setUsertype(event.target.value);
		}} />
		<label>Connection:</label>
		<input type="text" onChange={(event) => {
		  setConnections(event.target.value);
		}} />
*/