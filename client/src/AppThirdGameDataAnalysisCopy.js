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
			axios.get("http://localhost:3002/get_third_game_data", {
				name: resp.data
			}).then((resp2) => {
				console.log(resp2.data);
				document.getElementById('whole-game-time').innerHTML = resp2.data["whole-game-time"][1];
				document.getElementById('average-play-time-level-1').innerHTML = resp2.data["average-play-time-level-1"][1];
				document.getElementById('average-play-time-level-2').innerHTML = resp2.data["average-play-time-level-2"][1];
				document.getElementById('average-play-time-level-3').innerHTML = resp2.data["average-play-time-level-3"][1];
				document.getElementById('average-play-time-level-4').innerHTML = resp2.data["average-play-time-level-4"][1];
				document.getElementById('average-play-time-level-5').innerHTML = resp2.data["average-play-time-level-5"][1];
				document.getElementById('average-play-time-level-6').innerHTML = resp2.data["average-play-time-level-6"][1];
				document.getElementById('character-chosen').innerHTML = resp2.data["character-chosen"][1];
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
		});
	}
	return (
		<div>
		<button onClick = {get_user}>Analyze Data</button>
		<div> Whole Game Time
			<p id="whole-game-time"></p>
		</div>
		<div> Average Play Time (Level 1)
			<p id="average-play-time-level-1"></p>
		</div>
		<div> Average Play Time (Level 2)
			<p id="average-play-time-level-2"></p>
		</div>
		<div> Average Play Time (Level 3)
			<p id="average-play-time-level-3"></p>
		</div>
		<div> Average Play Time (Level 4)
			<p id="average-play-time-level-4"></p>
		</div>
		<div> Average Play Time (Level 5)
			<p id="average-play-time-level-5"></p>
		</div>
		<div> Average Play Time (Level 6)
			<p id="average-play-time-level-6"></p>
		</div>
		<div> Character Chosen
			<p id="character-chosen"></p>
		</div>
		<div> Average Number of Attempts (Level 1)
			<p id="number-of-attempts-level-1"></p>
		</div>
		<div> Average Number of Attempts (Level 2)
			<p id="number-of-attempts-level-2"></p>
		</div>
		<div> Average Number of Attempts (Level 3)
			<p id="number-of-attempts-level-3"></p>
		</div>
		<div> Average Number of Attempts (Level 4)
			<p id="number-of-attempts-level-4"></p>
		</div>
		<div> Average Number of Attempts (Level 5)
			<p id="number-of-attempts-level-5"></p>
		</div>
		<div> Average Number of Attempts (Level 6)
			<p id="number-of-attempts-level-6"></p>
		</div>
		<div> Average Number of Wrong Clicks (Level 1)
			<p id="average-number-of-wrong-clicks-level-1"></p>
		</div>
		<div> Average Number of Wrong Clicks (Level 2)
			<p id="average-number-of-wrong-clicks-level-2"></p>
		</div>
		<div> Average Number of Wrong Clicks (Level 3)
			<p id="average-number-of-wrong-clicks-level-3"></p>
		</div>
		<div> Average Number of Wrong Clicks (Level 4)
			<p id="average-number-of-wrong-clicks-level-4"></p>
		</div>
		<div> Average Number of Wrong Clicks (Level 5)
			<p id="average-number-of-wrong-clicks-level-5"></p>
		</div>
		<div> Average Number of Wrong Clicks (Level 6)
			<p id="average-number-of-wrong-clicks-level-6"></p>
		</div>
		</div>
	);
}

export default App;