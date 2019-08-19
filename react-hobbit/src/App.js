import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const [hobbits, setHobbits] = useState();

componentWillMount() {
  this.getHobbits();
}

getHobbits = () => {
  axios.get('http://localhost:5000').then((response) => {
    this.setHobbtis({hobbits: response.data})
  }).catch(error => {
    console.log(error)
  });
}

function App() {

  return (
    <div className="App">
      <h3>Hobbits!</h3>
    </div>
  );
}

export default App;
