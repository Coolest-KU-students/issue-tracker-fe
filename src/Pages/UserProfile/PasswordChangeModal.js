import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChangePassword } from '../../DataSources/Authentication';
import Notification from '../../GlobalFeatures/Notification';

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

PasswordChangeModal.propTypes = {
    credentials: PropTypes.string,
};

export default function PasswordChangeModal({ credentials }) {
    const classes = useStyles();
    const [savingInProgress, setSavingProgess] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleLoad = () => {
        console.log(password === confirmation);

        if (password === confirmation) ChangePassword(credentials, password, setSavingFinished);
        else {
            Notification('', 'Passwords do not match', 'danger', 3000);
            setSavingFinished();
        }
    };

    const setSavingFinished = () => {
        setSavingProgess(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmation = (e) => {
        setConfirmation(e.target.value);
    };

    return (
        <form className={classes.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    You need to create a new password:
                </Typography>
                <TextField
                    label="New Password"
                    autoFocus
                    style={{ margin: 8 }}
                    placeholder="Password"
                    fullWidth
                    disabled={savingInProgress}
                    margin="normal"
                    required
                    type="password"
                    variant="outlined"
                    onChange={handlePassword}
                />
                <TextField
                    label="Confirm Password"
                    disabled={savingInProgress}
                    style={{ margin: 8 }}
                    placeholder="Password"
                    fullWidth
                    type="password"
                    margin="normal"
                    required
                    variant="outlined"
                    onChange={handleConfirmation}
                />
                <div style={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        disabled={!password}
                        style={password != confirmation ? { backgroundColor: 'red' } : {}}
                        title={password != confirmation ? 'Passwords Do Not Match' : 'Save new password'}
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
