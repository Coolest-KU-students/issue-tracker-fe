import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UpdateIssueStep } from '../../../DataSources/IssueSteps';
import LoadData from '../../../DataSources/Users';
import LoadStepData from '../../../DataSources/Steps';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import CloseIssueModal from './CloseIssueModal';
import { CreateNewStep } from '../../../DataSources/IssueSteps';

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
    titleBox: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
    },
    buttons: {
        float: 'right',
        marginLeft: '0.5rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
}));

export default function IssueStepEditForm({ issueStepData, refreshCallback }) {
    const styles = useStyles();
    const [savingInProgress, setSavingProgess] = useState(0);
    const [users, setUsers] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [steps, setSteps] = useState();
    const [ModalIsOpen, setModalOpen] = useState(false);

    const [responsible, setResponsible] = useState(issueStepData.responsible);
    const [name, setName] = useState(issueStepData.name);
    const [comment, setComment] = useState(issueStepData.comment);

    const ITEM_HEIGHT = 48;

    const LoadUsers = () => {
        LoadData(setUsers);
    };

    const LoadSteps = () => {
        LoadStepData(setSteps);
    };

    useEffect(() => {
        LoadUsers();
        LoadSteps();
    }, []);

    const handleCloseIssue = () => {
        setModalOpen(true);
        setSavingProgess(1);
    };

    const handleNextStep = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNextStepClose = (key) => {
        setAnchorEl(null);
        setSavingProgess(2);

        const callback = () => {
            CreateNewStep(issueStepData.id, key, refreshCallback);
        };

        UpdateIssueStep(
            issueStepData.id,
            {
                responsible: responsible,
                comment: comment,
            },
            callback
        );
    };

    const handleNextStepCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSave = () => {
        updateStep();
        setSavingProgess(3);
    };

    const updateStep = () => {
        UpdateIssueStep(
            issueStepData.id,
            {
                responsible: responsible,
                comment: comment,
            },
            Callback
        );
    };

    const Callback = () => {
        setSavingProgess(false);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSavingProgess(0);
    };

    const handleSetComment = (e) => {
        setComment(e.target.value);
    };

    const handleSetResponsible = (e) => {
        setResponsible(e.target.value);
    };

    return (
        <React.Fragment>
            <Modal open={ModalIsOpen} onClose={handleClose}>
                <CloseIssueModal
                    stepId={issueStepData.id}
                    handleClose={handleClose}
                    closeCallback={refreshCallback}
                    responsible={responsible}
                    comment={comment}
                />
            </Modal>

            <Typography className={styles.titleBox} variant="h4">
                {name}
            </Typography>

            {users && (
                <TextField
                    label="Responsible"
                    disabled={savingInProgress}
                    select
                    value={responsible}
                    style={{ margin: 8 }}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    onChange={handleSetResponsible}
                >
                    {users.map((item) => (
                        <MenuItem key={item.login} value={item.login}>
                            {item.firstName} {item.lastName}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            <TextField
                label="Comment"
                disabled={savingInProgress}
                value={comment}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                multiline
                required
                variant="outlined"
                onChange={handleSetComment}
            />

            <div style={{ textAlign: 'right' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={styles.buttons}
                    disabled={savingInProgress != 0}
                    onClick={handleCloseIssue}
                >
                    {savingInProgress == 1 ? 'Closing...' : 'Close Issue'}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={styles.buttons}
                    startIcon={savingInProgress == 2 ? <CircularProgress size="20px" color="secondary" /> : ''}
                    disabled={savingInProgress != 0 && savingInProgress != 2}
                    onClick={handleNextStep}
                >
                    {savingInProgress == 2 ? 'Creating...' : 'Next Step'}
                </Button>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleNextStepCloseMenu}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    {steps
                        ? steps.map((step) => (
                              <MenuItem
                                  key={step.id}
                                  onClick={() => {
                                      handleNextStepClose(step.id);
                                  }}
                              >
                                  {step.name}
                              </MenuItem>
                          ))
                        : ''}
                </Menu>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={styles.buttons}
                    startIcon={savingInProgress == 3 ? <CircularProgress size="20px" color="secondary" /> : ''}
                    disabled={savingInProgress != 0 && savingInProgress != 3}
                    onClick={handleSave}
                >
                    {savingInProgress == 3 ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </React.Fragment>
    );
}
