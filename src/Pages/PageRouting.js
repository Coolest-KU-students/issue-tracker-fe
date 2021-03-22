import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Login from './Login/Login.js';
import StepList from './Configurations/Steps/StepList.js';
import ImportanceList from './Configurations/Imprortances/ImportanceList.js';
import Authenticate, { CheckJWTIsValid, CleanJWTToken } from './../DataSources/Authentication';
import IssueList from '../Pages/Issues/IssueMainList/IssueList';
import { LoggingIn } from '../GlobalFeatures/reducers/actions/UserActions';

const PageRouting = () => {
    const [IsAuthenticated, setAuthenticated] = useState(null);
    const [IsLoaded, setLoaded] = useState(false);
    useEffect(() => {
        CheckJWTIsValid(SetLoadedAndAuthenticated);
    }, []);

    const SetLoadedAndAuthenticated = (auth) => {
        setAuthenticated(auth);
        setLoaded(true);
    };

    const AuthenticationCallback = (credentials) => {
        setAuthenticated(true);
        useDispatch(LoggingIn(credentials.login));
        console.log(credentials.login);
    };

    const AuthenticateUser = (credentials) => {
        Authenticate(credentials, () => {
            AuthenticationCallback(credentials);
        });
    };

    const LogOut = () => {
        CleanJWTToken();
        setAuthenticated(false);
    };

    if (IsLoaded)
        return (
            <React.Fragment>
                <Router>
                    {IsAuthenticated && (
                        <Switch>
                            <Route exact path="/">
                                <IssueList />
                            </Route>
                            <Route exact path="/steps">
                                <StepList />
                            </Route>
                            <Route exact path="/importances">
                                <ImportanceList />
                            </Route>
                            <Route
                                exact
                                path="/logout"
                                render={() => {
                                    LogOut();
                                    return <Redirect exact to="/" />;
                                }}
                            />
                            <Redirect exact to="/" />
                        </Switch>
                    )}
                    {IsAuthenticated === false && <Login setAuthenticated={AuthenticateUser} />}
                </Router>
            </React.Fragment>
        );
    else return <div />;
};

/* Temporary */

export default PageRouting;
