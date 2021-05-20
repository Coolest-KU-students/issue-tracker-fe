import React, { useState } from 'react';
import { Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { UpdateIssueStep } from '../../../DataSources/IssueSteps';
import { CloseIssue } from '../../../DataSources/IssueSteps';

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
    buttons: {
        textAlign: 'left',
        paddingTop: '2rem',
    },
}));

export default function CloseIssueModal({ stepId, handleClose, closeCallback, id, responsible, comment }) {
    const [savingInProgress, setSavingProgess] = useState(false);

    const handleLoad = () => {
        setSavingProgess(true);
        UpdateIssueStep(
            stepId,
            {
                responsible: responsible,
                comment: comment,
            },
            closeIssue
        );
    };

    const closeIssue = () => {
        CloseIssue(stepId, closeIssueCallback);
    };

    const closeIssueCallback = () => {
        handleClose();
        closeCallback();
    };

    const styles = useStyles();

    return (
        <form className={styles.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                    Do you really want to close this issue?
                </Typography>
                <div className={styles.buttons}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={savingInProgress ? <CircularProgress size="20px" color="primary" /> : ''}
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
