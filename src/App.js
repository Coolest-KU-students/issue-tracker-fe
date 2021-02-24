//import logo from "./logo.svg";
import "./App.css";
import React from "react";
//import Login from "./Pages/Login/Login.js";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import IssueList from "./Pages/Issues/IssueMainList/IssueList";

function App() {
  return (
    <React.Fragment>
      <ReactNotification />
      <IssueList />{" "}
    </React.Fragment>
  );
}

export default App;
