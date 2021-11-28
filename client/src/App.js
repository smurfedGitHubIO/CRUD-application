import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("localhost:3002/posts").then((response) => {
      console.log(response);
    });
  }, []);
  return 
    <div className="App"></div>;
}

export default App;
