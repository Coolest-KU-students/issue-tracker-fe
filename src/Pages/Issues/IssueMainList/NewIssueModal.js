import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import { CreateNewIssue } from '../../../DataSources/viwIssues';
import LoadData from '../../../DataSources/Importance';

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
}));

export default function NewIssueModal() {
    const classes = useStyles();
    const [savingInProgress, setSavingProgess] = useState(false);
    const [newIssueMetaData, setIssueMetaData] = useState({
        name: '',
        description: '',
        importance: 5,
    });
    const [importances, setImportances] = useState();

    const handleLoad = () => {
        setSavingProgess(true);
        CreateNewIssue(newIssueMetaData, setSavingFinished);
    };

    const setSavingFinished = () => {
        setSavingProgess(false);
    };

    const LoadImportance = () => {
        LoadData(setImportances);
    };

    useEffect(() => {
        LoadImportance();
    }, []);

    const setName = (e) => {
        setIssueMetaData({
            name: e.target.value,
            description: newIssueMetaData.description,
            importance: newIssueMetaData.importance,
        });
    };

    const setDescription = (e) => {
        setIssueMetaData({
            name: newIssueMetaData.name,
            description: e.target.value,
            importance: newIssueMetaData.importance,
        });
    };

    const setImportance = (e) => {
        setIssueMetaData({
            name: newIssueMetaData.name,
            description: newIssueMetaData.description,
            importance: e.target.value,
        });
    };

    return (
        <form className={classes.paper}>
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    Register new Issue:
                </Typography>
                <TextField
                    label="Issue name"
                    autoFocus
                    style={{ margin: 8 }}
                    placeholder="Issue Name"
                    helperText="Short name to identify what the issue is about"
                    fullWidth
                    disabled={savingInProgress}
                    margin="normal"
                    required
                    variant="outlined"
                    onChange={setName}
                />
                <TextField
                    label="Description"
                    disabled={savingInProgress}
                    style={{ margin: 8 }}
                    placeholder="Description"
                    helperText="Describe the issue's details"
                    fullWidth
                    margin="normal"
                    multiline
                    required
                    variant="outlined"
                    onChange={setDescription}
                />
                {importances && (
                    <TextField
                        label="Importance"
                        disabled={savingInProgress}
                        select
                        style={{ margin: 8 }}
                        helperText="Short name to identify what the issue is about"
                        fullWidth
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={setImportance}
                    >
                        {importances.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
