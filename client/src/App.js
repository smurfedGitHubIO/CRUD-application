import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return <div className="App">{listOfPosts.map((value, key) => {
    return <div className="post">
      <div className="title">{value.name}</div>
      <div className="body">{value.age}</div>
    </div>;
  })}</div>;
}

export default App;
