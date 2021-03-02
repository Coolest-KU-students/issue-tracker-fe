import React, {  useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login/Login.js";
import Authenticate, { CheckJWTIsValid, CleanJWTToken } from "./../DataSources/Authentication";
import IssueList from "../Pages/Issues/IssueMainList/IssueList"

//import IssueList from "./Pages/Issues/IssueMainList/IssueList";


const PageRouting = () => {
  
  const [IsAuthenticated, setAuthenticated] = useState(null);
  const [IsLoaded, setLoaded] = useState(null);
  useEffect(() =>{
      CheckJWTIsValid(SetLoadedandAuthenticated);
  }, [])


  const SetLoadedandAuthenticated = (auth) =>{
    setAuthenticated(auth);
    setLoaded(true);
  }

  const AuthenticateUser = (credentials) => {
    Authenticate(credentials, setAuthenticated);
    SetWhiteBackground();
  };

  const SetWhiteBackground=()=>{
    document.body.style =  "background: white"
  }

  const LogOut = () =>{
    console.log('test');
    CleanJWTToken();
    setAuthenticated(false);
  }
  
  return (<React.Fragment>
    {IsLoaded && <Router>
      {!IsAuthenticated && <Login setAuthenticated={AuthenticateUser} />}
      {IsAuthenticated &&  (
        
        <Switch>
          <Route exact path="/">
            <IssueList/>
          </Route>
          <Route exact path="/logout" render={() => {LogOut(); return (<Redirect exact to="/" />);}} />
          <Redirect exact to="/" />
        </Switch>
      )}
    </Router> }
    </React.Fragment>
  );
};

/* Temporary */

export default PageRouting;
