import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CreateNewStep } from '../../DataSources/Steps';
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
        /*backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),*/
    },
}));

export default function NewStepModal() {
    const styles = useStyles();
    const [savingInProgress, setSavingProgess] = useState(false);
    const [newStepName, setNewStepName] = useState('');
    const [reqError, setReqError] = useState('');

    //TODO: This is ugly:
    useEffect(() => {
        if (reqError !== '') {
            setSavingFinished();
            Notification('', reqError.toString(), 'info', 1000);
            setReqError('');
        }
    }, [reqError]);

    const handleLoad = () => {
        setSavingProgess(true);
        CreateNewStep(newStepName, setSavingFinished, setReqError);
    };

    //TODO: When finished, update the step list
    //TODO: Close modal after new step is created?
    const setSavingFinished = () => {
        setSavingProgess(false);
    };

    //TODO: newStepName is e.target.value as string + : (ex. 'New step name:')
    const setName = (e) => {
        setNewStepName(e.target.value);
    };

    return (
        <form className={styles.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    Create new step:
                </Typography>
                <TextField
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
                    >
                        {savingInProgress ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
