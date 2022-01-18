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
		<div>Total play time
			<p id="game-play-time1"></p>
		</div>
		<div>Mini game time
			<p id="mini-game-time"></p>
		</div>
		<div>House Play Time (Joy)
			<p id="house-play-time-house-joy"></p>
		</div>
		<div>House Play Time (Anger)
			<p id="house-play-time-house-anger"></p>
		</div>
		<div>House Play Time (Disgust)
			<p id="house-play-time-house-disgust"></p>
		</div>
		<div>House Play Time (Fear)
			<p id="house-play-time-house-fear"></p>
		</div>
		<div>House Play Time (Sadness)
			<p id="house-play-time-house-sadness"></p>
		</div>
		<div>House Play Time (Surprise)
			<p id="house-play-time-house-surprise"></p>
		</div>
		<div>House Play Time (Joy, Win Only)
			<p id="house-play-time-win-only-house-joy"></p>
		</div>
		<div>House Play Time (Anger, Win Only)
			<p id="house-play-time-win-only-house-anger"></p>
		</div>
		<div>House Play Time (Disgust, Win Only)
			<p id="house-play-time-win-only-house-disgust"></p>
		</div>
		<div>House Play Time (Fear, Win Only)
			<p id="house-play-time-win-only-house-fear"></p>
		</div>
		<div>House Play Time (Sadness, Win Only)
			<p id="house-play-time-win-only-house-sadness"></p>
		</div>
		<div>House Play Time (Surprise, Win Only)
			<p id="house-play-time-win-only-house-surprise"></p>
		</div>
		<div>Character Chosen
			<p id="character-chosen"></p>
		</div>
		<div>Tries Before Completion (Joy)
			<p id="tries-before-completion-house-joy"></p>
		</div>
		<div>Tries Before Completion (Anger)
			<p id="tries-before-completion-house-anger"></p>
		</div>
		<div>Tries Before Completion (Disgust)
			<p id="tries-before-completion-house-disgust"></p>
		</div>
		<div>Tries Before Completion (Fear)
			<p id="tries-before-completion-house-fear"></p>
		</div>
		<div>Tries Before Completion (Sadness)
			<p id="tries-before-completion-house-sadness"></p>
		</div>
		<div>Tries Before Completion (Surprise)
			<p id="tries-before-completion-house-surprise"></p>
		</div>
		<div>Wrong Answers Per Attempt (Joy)
			<p id="wrong-answers-per-attempt-house-joy"></p>
		</div>
		<div>Wrong Answers Per Attempt (Anger)
			<p id="wrong-answers-per-attempt-house-anger"></p>
		</div>
		<div>Wrong Answers Per Attempt (Disgust)
			<p id="wrong-answers-per-attempt-house-disgust"></p>
		</div>
		<div>Wrong Answers Per Attempt (Fear)
			<p id="wrong-answers-per-attempt-house-fear"></p>
		</div>
		<div>Wrong Answers Per Attempt (Sadness)
			<p id="wrong-answers-per-attempt-house-sadness"></p>
		</div>
		<div>Wrong Answers Per Attempt (Surprise)
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