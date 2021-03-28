import React, { useState } from 'react';
import { Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
        // backgroundColor: theme.palette.background.paper,
        /*border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),*/
    },
    buttons: {
        textAlign: 'left',
        paddingTop: '2rem',
    },
}));

export default function DeleteIssue({ id, handleClose }) {
    const [savingInProgress, setSavingProgess] = useState(false);

    const handleLoad = () => {
        setSavingProgess(true);
    };

    const setSavingFinished = () => {
        setSavingProgess(false);
    };

    const styles = useStyles();

    return (
        <form className={styles.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                    Do you really want to delete this issue?
                </Typography>
                <div className={styles.buttons}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={
                            savingInProgress ? <CircularProgress size="20px" color="secondary" /> : <DeleteIcon />
                        }
                        onClick={handleLoad}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ float: 'right' }}
                        onClick={handleClose}
                    >
                        No
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
