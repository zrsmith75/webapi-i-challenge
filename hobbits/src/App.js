import React from "react";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import { Welcome } from "./components/Welcome";
import "./App.css";

// Main component
function App() {
  return (
    <div className="App">
      <Navbar />
      <Welcome />
      <UserList />
    </div>
  );
}

export default App;
