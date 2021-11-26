import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const displayInfo = () => {
    console.log(name + age);
  };

  const addData = () => {
    Axios.post('localhost:3307/create', {name: name, age: age}).then(() => {
      console.log("Success");
    });
  };

  return (
    <div className="App">
      <div className="inputs">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value)
          }}
        />
        <button onClick={addData}>Submit</button>
      </div>
    </div>
  );
}

export default App;
