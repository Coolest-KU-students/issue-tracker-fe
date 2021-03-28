import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    makeStyles,
    Modal,
    Paper,
    Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteIssueModal from './DeleteIssueModal';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { LocalDining } from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: '5rem',
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '3rem',
            width: '95%',
        },
        display: 'inline-flex',
        flexDirection: 'column',
    },
    stepList: {
        margin: '1%',
        backgroundColor: 'white',
        width: '56%',
        float: 'left',
    },
    issueInformation: {
        margin: '1%',
        backgroundColor: '#e3e3e3',
        width: '40%',
        float: 'right',
        padding: '1rem',
    },
    stepCard: {
        marginTop: '1rem',
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
        marginTop: '0.3rem',
        marginBottom: '0.7rem',
        marginRight: '0.5rem',
    },
}));

const IssueView = ({ AdjustNavbar, IssueData }) => {
    const { id } = useParams();
    const [Loaded, setLoaded] = useState(true);
    const [DeleteModalIsOpen, setDeleteModalOpen] = useState(false);
    const [AddNewModalIsOpen, setAddNewModalOpen] = useState(false);
    const [Issue, setIssue] = useState();
    const [IssueSteps, setIssueSteps] = useState([]);

    const styles = useStyles();
    const theme = useSelector((state) => state.Theme);

    useEffect(() => {
        getIssueData();
        getIssueStepData();
    }, []);

    const getIssueData = () => {
        setIssue(getIssueMockData);
    };

    const getIssueStepData = () => {
        setIssueSteps(getIssueStepsMockData);
    };

    const addNewHandleOpen = () => {
        setAddNewModalOpen(true);
    };

    const addNewHandleClose = () => {
        setAddNewModalOpen(false);
    };

    const deleteHandleOpen = () => {
        setDeleteModalOpen(true);
    };

    const deleteHandleClose = () => {
        setDeleteModalOpen(false);
    };

    useEffect(() => {
        const props = {
            PageName: 'Issue View',
            currentListElement: 'Issues',
        };
        AdjustNavbar(props, () => {
            return (
                <div>
                    <ListSubheader inset style={{ backgroundColor: 'inherit', color: 'inherit' }}>
                        Tasks
                    </ListSubheader>
                    <ListItem button onClick={addNewHandleOpen}>
                        <ListItemIcon>
                            <CheckBoxIcon color={theme.navbarIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Add New Step" />
                    </ListItem>
                    <ListItem button onClick={deleteHandleOpen}>
                        <ListItemIcon>
                            <IndeterminateCheckBoxIcon color={theme.navbarIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Delete Issue" />
                    </ListItem>
                </div>
            );
        });
    }, [theme]);

    return (
        <React.Fragment>
            <Modal open={DeleteModalIsOpen}>
                <DeleteIssueModal id={id} handleClose={deleteHandleClose} />
            </Modal>

            {Loaded ? (
                <Container maxWidth="xl" className={styles.content}>
                    <Paper>
                        <div className={styles.stepList}>
                            {IssueSteps
                                ? IssueSteps.map((issueStep) => (
                                      <Card key={issueStep.id} className={styles.stepCard}>
                                          <CardContent>
                                              {issueStep.completed ? (
                                                  <div className={styles.titleBox}>
                                                      <Typography variant="h6">{issueStep.stepName}</Typography>
                                                      <Typography variant="h6">
                                                          Completed: {issueStep.completed}
                                                      </Typography>
                                                  </div>
                                              ) : (
                                                  <div className={styles.titleBox}>
                                                      <Typography variant="h6">{issueStep.stepName}</Typography>
                                                  </div>
                                              )}
                                              <Typography variant="h6">Comment: {issueStep.comment}</Typography>
                                              <Typography variant="h6">Responsible: {issueStep.responsible}</Typography>
                                              {issueStep.response ? (
                                                  <Typography variant="h6">Response: {issueStep.response}</Typography>
                                              ) : (
                                                  ''
                                              )}
                                          </CardContent>
                                          {issueStep.completed === null ? (
                                              //   <CardActions>
                                              //       <Button
                                              //           className={styles.buttons}
                                              //           color="primary"
                                              //           variant="contained"
                                              //       >
                                              //           EDIT
                                              //       </Button>
                                              //   </CardActions>
                                              <Button className={styles.buttons} color="primary" variant="contained">
                                                  EDIT
                                              </Button>
                                          ) : (
                                              ''
                                          )}
                                      </Card>
                                  ))
                                : 'Loading...'}
                        </div>
                        <Card className={styles.issueInformation}>
                            {Issue ? (
                                <React.Fragment>
                                    <Typography variant="h6">Issue Name: {Issue.name}</Typography>
                                    <Typography variant="h6">Importance: {Issue.importance}</Typography>
                                    <Typography variant="h6">Description: {Issue.description}</Typography>
                                    <Typography variant="h6">Created by: {Issue.createdBy}</Typography>
                                    {Issue.closed != null ? (
                                        <Typography variant="h6">Closed: {Issue.closed}</Typography>
                                    ) : (
                                        ''
                                    )}
                                </React.Fragment>
                            ) : (
                                'Loading...'
                            )}
                        </Card>
                    </Paper>
                </Container>
            ) : (
                <Container maxWidth="xl" className={styles.content}>
                    Loading...
                </Container>
            )}
        </React.Fragment>
    );
};

export default IssueView;

const getIssueMockData = () => {
    return {
        id: 1,
        closed: null,
        name: 'Test issue',
        description: 'Test issue description',
        importance: 'Critical',
        currentStep: '2',
        currentResponsible: 'Test 1',
        createdBy: 'VP',
    };
};

const getIssueStepsMockData = () => {
    return [
        {
            id: 1,
            issue: 1,
            responsible: 'Test user 1',
            stepName: 'Registration',
            comment: 'Example issue has been registered',
            completed: '2020-03-25',
            response: null,
        },
        {
            id: 2,
            issue: 1,
            responsible: 'VP',
            stepName: 'Planning',
            comment: 'Search for example issue possible dangers and plan action plan',
            completed: '2020-03-26',
            response: null,
        },
        {
            id: 3,
            issue: 1,
            responsible: 'Test user 1',
            stepName: 'Solution',
            comment: 'Solve example issue',
            completed: null,
            response: null,
        },
    ];
};
