import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login/Login.js";
import Authenticate, { CheckJWTIsValid } from "./../DataSources/Authentication";
import IssueList from "../Pages/Issues/IssueMainList/IssueList"

//import IssueList from "./Pages/Issues/IssueMainList/IssueList";
const GetAuthentication = () => {
  return CheckJWTIsValid();
};

const PageRouting = () => {
  const [IsAuthenticated, setAuthenticated] = useState(GetAuthentication());

  const AuthenticateUser = (credentials) => {
    Authenticate(credentials, setAuthenticated);
  };

  return (
    <Router>
      {!IsAuthenticated && <Login setAuthenticated={AuthenticateUser} />}
      {IsAuthenticated && (
        <Switch>
          <Route path="/">
            <IssueList/>
          </Route>
          <Redirect exact to="/" />
        </Switch>
      )}
    </Router>
  );
};

/* Temporary */

export default PageRouting;
