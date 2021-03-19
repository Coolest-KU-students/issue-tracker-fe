//import logo from "./logo.svg";
import './App.css';
import React from 'react';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import PageRouting from './Pages/PageRouting';
import GlobalConfiguration from './DataSources/GlobalConfiguration';

function App() {
    GlobalConfiguration();
    return (
        <React.Fragment>
            <ReactNotification />
            <PageRouting />{' '}
        </React.Fragment>
    );
}

export default App;
