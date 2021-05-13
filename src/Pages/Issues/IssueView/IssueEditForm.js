import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UpdateIssue } from '../../../DataSources/Issue';
import LoadData from '../../../DataSources/Importance';
import MenuItem from '@material-ui/core/MenuItem';

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
        float: 'right',
        marginLeft: '0.5rem',
        marginTop: '0.3rem',
        marginBottom: '0.3rem',
    },
}));

export default function IssueEditForm({ issueData }) {
    const classes = useStyles();
    const [savingInProgress, setSavingProgess] = useState(false);
    const [importances, setImportances] = useState();

    const [name, setName] = useState(issueData.name);
    const [description, setDescription] = useState(issueData.description);
    const [importance, setImportance] = useState(issueData.importance.id);

    const LoadImportance = () => {
        LoadData(setImportances);
    };

    useEffect(() => {
        LoadImportance();
    }, []);

    const handleSave = () => {
        updateCurrent();
        setSavingProgess(true);
    };

    const updateCurrent = () => {
        UpdateIssue(
            issueData.id,
            {
                name: name,
                description: description,
                importance: importance,
            },
            Callback
        );
    };

    const Callback = () => {
        setSavingProgess(false);
    };

    const handleSetName = (e) => {
        setName(e.target.value);
    };

    const handleSetDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSetImportance = (e) => {
        setImportance(e.target.value);
    };

    return (
        <React.Fragment>
            <TextField
                label="Name"
                value={name}
                style={{ margin: 8 }}
                fullWidth
                disabled={savingInProgress}
                margin="normal"
                required
                variant="outlined"
                onChange={handleSetName}
            />
            <TextField
                label="Description"
                disabled={savingInProgress}
                value={description}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                multiline
                required
                variant="outlined"
                onChange={handleSetDescription}
            />

            {importances && (
                <TextField
                    label="Importance"
                    disabled={savingInProgress}
                    select
                    value={importance}
                    style={{ margin: 8 }}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    onChange={handleSetImportance}
                >
                    {importances.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            <Typography style={{ marginLeft: '0.5rem', marginTop: '0.2rem' }}>
                Created by: {issueData.createdBy}
            </Typography>
            <div style={{ textAlign: 'right' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.buttons}
                    startIcon={savingInProgress ? <CircularProgress size="20px" color="secondary" /> : ''}
                    onClick={handleSave}
                >
                    {savingInProgress ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </React.Fragment>
    );
}
