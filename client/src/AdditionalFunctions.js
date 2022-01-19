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

	// const insert_first_game_data = () => {
	// 	axios.post("http://localhost:3002/first_game_insert", {
	// 		username : username,
	// 		date1 : date1,
	// 		level1 : level1,
	// 		time1 : time1,
	// 		mini_game_time : mini_game_time,
	// 		win_or_lose : win_or_lose,
	// 		character1 : character1,
	// 		wrong_answers : wrong_answers
	// 	}).then((resp) => {
	// 		console.log("Data insertion successful.");
	// 	});
	// };

	// const insert_second_game_data = () => {
	// 	axios.post("http://localhost:3002/second_game_insert", {
	// 		username : username,
	// 		date1 : date1,
	// 		level1 : level1,
	// 		time1 : time1,
	// 		wrong_prompts: wrong_prompts,
	// 		moves: moves
	// 	}).then((resp) => {
	// 		console.log("Data insertion successful.");
	// 	});
	// };

	// const insert_third_game_data = () => {
	// 	axios.post("http://localhost:3002/third_game_insert", {
	// 		username : username,
	// 		date1 : date1,
	// 		level1 : level1,
	// 		time1 : time1,
	// 		character1 : character1,
	// 		wrong_clicks : wrong_clicks
	// 	}).then((resp) => {
	// 		console.log("Data insertion successful.");
	// 	});
	// };

//get users list function

	const get_users_list = () => {
		axios.get("http://localhost:3002/users_list").then((resp) => {
			setFirstgamedata(resp.data);
		});
	};

//get current user function
//get analyzed data
	const get_personal_data = () => {
		axios.get("http://localhost:3002/get_personal_data", {
			username: username
		}).then((resp) => {
			console.log(resp.data);
		});
	}
	return (
		<div>
		<label>Username:</label>
		<input type="text" onChange={(event) => {
		  setUsername(event.target.value);
		}} />
		<button onClick = {get_personal_data}>Get Personal Data</button>
		</div>
	);
}

export default App;
//<button onClick = {register_user}>Sign Up</button>