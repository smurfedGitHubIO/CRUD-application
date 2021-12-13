import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  var data;
  const addToDatabase = () => {
    axios.post("http://localhost:3002/create", {
      name: name,
      age: age
    }).then(() => {
      console.log("success");
    });
  };

  const checkData = () => {
    axios.get("http://localhost:3002/get_data").then((resp) => {
      data = resp;
      console.log(data.data);
    });
  };

  return (
    <div>
    <label>Name:</label>
    <input type="text" onChange={(event) => {
      setName(event.target.value);
    }} />
    <label>Age:</label>
    <input type="number" onChange={(event) => {
      setAge(event.target.value);
    }} />
    <button onClick={addToDatabase}>Add</button>
    <button onClick={checkData}>Check</button>
    </div>
  );
}

export default App;
