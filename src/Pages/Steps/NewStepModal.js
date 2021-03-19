import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CreateNewStep } from '../../DataSources/Steps';

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
        /*backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),*/
    },
}));

export default function NewStepModal({ GetStepData, handleClose }) {
    const styles = useStyles();
    const [savingInProgress, setSavingProgess] = useState(false);
    const [newStepName, setNewStepName] = useState('');

    const errorCallback = () => {
        setSavingProgess(false);
        document.getElementById('field').value = '';
    };

    const handleLoad = () => {
        setSavingProgess(true);
        CreateNewStep(newStepName, GetStepData, setSavingFinished, errorCallback);
    };

    const setSavingFinished = () => {
        setSavingProgess(false);
        handleClose();
    };

    const setName = (e) => {
        let regexCheck = /^\s+.*$/;
        if (regexCheck.test(e.target.value)) {
            e.target.value = '';
        } else {
            setNewStepName(e.target.value);
        }
    };

    return (
        <form className={styles.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    Create new step:
                </Typography>
                <TextField
                    id="field"
                    label="Step name"
                    autoFocus
                    style={{ margin: 8 }}
                    placeholder="Step name"
                    helperText="Short name to identify step"
                    fullWidth
                    disabled={savingInProgress}
                    margin="normal"
                    required
                    variant="outlined"
                    onChange={setName}
                />
                <div style={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.button}
                        startIcon={savingInProgress ? <CircularProgress size="20px" color="secondary" /> : <SaveIcon />}
                        onClick={handleLoad}
                        disabled={!newStepName}
                    >
                        {savingInProgress ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
