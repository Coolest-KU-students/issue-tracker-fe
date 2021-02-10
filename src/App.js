//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Login from "./Pages/Login/Login.js";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <React.Fragment>
      <ReactNotification />
      <Login />{" "}
    </React.Fragment>
  );
}

export default App;
