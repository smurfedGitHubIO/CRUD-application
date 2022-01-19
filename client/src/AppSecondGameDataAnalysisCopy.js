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
		});
	}
	return (
		<div>
		<button onClick = {get_user}>Analyze Data</button>
			<div class="boxes">
				<p id="whole-game-time1"></p>
				<p id="whole-game-time"></p>
			</div>
			<div class="boxes">
				<p id="average-play-time-second-game-level-11"></p>
				<p id="average-play-time-second-game-level-1"></p>
			</div>
			<div class="boxes">
				<p id="average-play-time-second-game-level-21"></p>
				<p id="average-play-time-second-game-level-2"></p>
			</div>
			<div class="boxes">
				<p id="average-play-time-second-game-level-31"></p>
				<p id="average-play-time-second-game-level-3"></p>
			</div>
			<div class="boxes">
				<p id="average-play-time-second-game-level-41"></p>
				<p id="average-play-time-second-game-level-4"></p>
			</div>
			<div class="boxes">
				<p id="average-play-time-second-game-level-51"></p>
				<p id="average-play-time-second-game-level-5"></p>
			</div>
			<div class="boxes">
				<p id="average-play-time-second-game-level-61"></p>
				<p id="average-play-time-second-game-level-6"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-wrong-prompts-level-11"></p>
				<p id="average-number-of-wrong-prompts-level-1"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-wrong-prompts-level-21"></p>
				<p id="average-number-of-wrong-prompts-level-2"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-wrong-prompts-level-31"></p>
				<p id="average-number-of-wrong-prompts-level-3"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-wrong-prompts-level-41"></p>
				<p id="average-number-of-wrong-prompts-level-4"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-wrong-prompts-level-51"></p>
				<p id="average-number-of-wrong-prompts-level-5"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-wrong-prompts-level-61"></p>
				<p id="average-number-of-wrong-prompts-level-6"></p>
			</div>
			<div class="boxes">
				<p id="number-of-attempts-second-game-level-11"></p>
				<p id="number-of-attempts-second-game-level-1"></p>
			</div>
			<div class="boxes">
				<p id="number-of-attempts-second-game-level-21"></p>
				<p id="number-of-attempts-second-game-level-2"></p>
			</div>
			<div class="boxes">
				<p id="number-of-attempts-second-game-level-31"></p>
				<p id="number-of-attempts-second-game-level-3"></p>
			</div>
			<div class="boxes">
				<p id="number-of-attempts-second-game-level-41"></p>
				<p id="number-of-attempts-second-game-level-4"></p>
			</div>
			<div class="boxes">
				<p id="number-of-attempts-second-game-level-51"></p>
				<p id="number-of-attempts-second-game-level-5"></p>
			</div>
			<div class="boxes">
				<p id="number-of-attempts-second-game-level-61"></p>
				<p id="number-of-attempts-second-game-level-6"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-moves-level-11"></p>
				<p id="average-number-of-moves-level-1"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-moves-level-21"></p>
				<p id="average-number-of-moves-level-2"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-moves-level-31"></p>
				<p id="average-number-of-moves-level-3"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-moves-level-41"></p>
				<p id="average-number-of-moves-level-4"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-moves-level-51"></p>
				<p id="average-number-of-moves-level-5"></p>
			</div>
			<div class="boxes">
				<p id="average-number-of-moves-level-61"></p>
				<p id="average-number-of-moves-level-6"></p>
			</div>
		</div>
	);
}

export default App;