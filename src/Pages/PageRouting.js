import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
const GetAuthentication = () => {
  return false;
};

const PageRouting = () => {
  const [IsAuthenticated, setAuthenticated] = useState(GetAuthentication());

  return (
    <Router>
      {!IsAuthenticated && (
        <Button
          onClick={() => {
            setAuthenticated(true);
          }}
        >
          <Typography>Click</Typography>
        </Button>
      )}
      {IsAuthenticated && (
        <Switch>
          <Route path="/">
            <div>Congrats, You broke in!</div>
          </Route>
          <Redirect exact to="/" />
        </Switch>
      )}
    </Router>
  );
};

/* Temporary */

export default PageRouting;
