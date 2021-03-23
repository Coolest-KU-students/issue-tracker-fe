import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './Login/Login.js';
import UserList from './Users/UserList.js';
import StepList from './Configurations/Steps/StepList.js';
import ImportanceList from './Configurations/Importances/ImportanceList.js';
import Authenticate, { CheckJWTIsValid, CleanJWTToken } from './../DataSources/Authentication';
import IssueList from '../Pages/Issues/IssueMainList/IssueList';
import { LoggingIn } from '../GlobalFeatures/reducers/actions/UserActions';
import Navbar from '../GlobalFeatures/Navbar/Navbar.js';

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

    /***********
      Navbar Control section
    ***********/
    const [navbarConfig, setNavbarConfig] = useState({
        props: '',
        children: () => {},
    });

    const AdjustNavbar = (currentPageProps, currentNavbarChildren) => {
        setNavbarConfig({
            props: currentPageProps,
            children: currentNavbarChildren,
        });
    };

    /*************/

    if (IsLoaded)
        return (
            <React.Fragment>
                <Router>
                    {IsAuthenticated && (
                        <>
                            <Navbar {...navbarConfig.props}>{navbarConfig.children()}</Navbar>
                            <Switch>
                                <Route exact path="/">
                                    <IssueList AdjustNavbar={AdjustNavbar} />
                                </Route>
                                <Route exact path="/steps">
                                    <StepList AdjustNavbar={AdjustNavbar} />
                                </Route>
                                <Route exact path="/users">
                                    <UserList AdjustNavbar={AdjustNavbar} />
                                </Route>
                                <Route exact path="/importances">
                                    <ImportanceList AdjustNavbar={AdjustNavbar} />
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
                        </>
                    )}
                    {IsAuthenticated === false && <Login setAuthenticated={AuthenticateUser} />}
                </Router>
            </React.Fragment>
        );
    else return <div />;
};

/* Temporary */

export default PageRouting;
