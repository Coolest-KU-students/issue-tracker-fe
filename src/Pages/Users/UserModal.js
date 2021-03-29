import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, Paper, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../../GlobalFeatures/Notification';
import { createNewUser, UpdateUser } from '../../DataSources/Users';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '33%',
        marginLeft: '34%',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            marginLeft: '2.5%',
        },

        marginTop: '10%',
    },
}));

export default function UserModal({ callback, userDetails }) {
    const createUser = userDetails ? false : true;
    userDetails = userDetails
        ? userDetails
        : { firstName: '', lastName: '', login: '', password: '', requirePasswordChange: '' };

    const classes = useStyles();
    const [savingInProgress, setSavingProgess] = useState(false);
    const [fullName, setFullName] = useState({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
    });
    const [login, setLogin] = useState(userDetails.login);
    const [password, setPassword] = useState(userDetails.password);
    const [requirePasswordChange, setRequirePasswordChange] = useState(false);

    const handleLoad = () => {
        setSavingProgess(true);
        if (createUser) {
            if (fullName.firstName != '' && fullName.lastName != '' && login != '' && password != '') {
                createNew();
                return;
            }
        } else {
            if (fullName.firstName != '' && fullName.lastName != '') {
                updateCurrent();
                return;
            }
        }

        Notification('', 'Please fill in all fields', 'warning', 2000);
        setSavingProgess(false);
    };

    const createNew = () => {
        createNewUser(
            {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
                login: login,
                password: password,
                changePasswordOnLogin: requirePasswordChange,
            },
            Callback
        );
    };

    const updateCurrent = () => {
        UpdateUser(
            {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
                login: login,
            },
            Callback
        );
    };

    const Callback = () => {
        setSavingProgess(false);
        callback();
    };

    const setFirstName = (e) => {
        setFullName({
            firstName: e.target.value,
            lastName: fullName.lastName,
        });
    };

    const setLastName = (e) => {
        setFullName({
            firstName: fullName.firstName,
            lastName: e.target.value,
        });
    };

    return (
        <form className={classes.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    Register new Issue:
                </Typography>
                <TextField
                    label="First Name"
                    autoFocus
                    value={fullName.firstName}
                    style={{ margin: 8 }}
                    placeholder="First Name"
                    fullWidth
                    disabled={savingInProgress}
                    margin="normal"
                    required
                    variant="outlined"
                    onChange={setFirstName}
                />
                <TextField
                    label="Last Name"
                    disabled={savingInProgress}
                    value={fullName.lastName}
                    style={{ margin: 8 }}
                    placeholder="Last Name"
                    fullWidth
                    margin="normal"
                    multiline
                    required
                    variant="outlined"
                    onChange={setLastName}
                />
                <TextField
                    label="Login"
                    disabled={savingInProgress && userDetails}
                    style={{ margin: 8 }}
                    fullWidth
                    required
                    value={login}
                    margin="normal"
                    variant="outlined"
                    disabled={!createUser}
                    onChange={(e) => {
                        setLogin(e.target.value);
                    }}
                />
                {createUser && (
                    <>
                        <TextField
                            label="Password"
                            disabled={savingInProgress && userDetails}
                            style={{ margin: 8 }}
                            helperText=""
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Typography>
                            <Checkbox
                                onChange={() => {
                                    setRequirePasswordChange(!requirePasswordChange);
                                }}
                            />
                            Require a password change
                        </Typography>
                    </>
                )}
                <div style={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={savingInProgress ? <CircularProgress size="20px" color="secondary" /> : <SaveIcon />}
                        onClick={handleLoad}
                    >
                        {savingInProgress ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
