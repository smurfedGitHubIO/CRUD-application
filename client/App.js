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
	const [users_list, setUserslist] = useState([]);
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
			setUserslist(resp.data);
		});
	};

//get current user function
//a must have when going to profile and games
	axios.get("http://localhost:3002/current_user").then((resp) => {
		current_username = resp.data;
	});
	axios.get("http://localhost:3002/users_list").then((resp) => {
		setUserslist(resp.data);
	});
	return (
		<div>
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
		<button onClick = {register_user}>Sign Up</button>
		{users_list.map((val, key) => {
			return (
				<div class="sample">
				<h3> {val.username} </h3>
				<h3> {val.password} </h3>
				<h3> {val.full_name} </h3>
				<h3> {val.age} </h3>
				</div>
			);
		})}
		</div>
	);
}

export default App;