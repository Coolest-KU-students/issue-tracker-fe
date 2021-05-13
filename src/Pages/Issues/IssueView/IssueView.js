import React, { useEffect, useState } from 'react';
import { Card, CardContent, Container, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import DeleteIssueModal from './DeleteIssueModal';
import LoadIssueData from '../../../DataSources/Issue';
import LoadIssueStepsData from '../../../DataSources/IssueSteps';
import IssueEditForm from './IssueEditForm';
import IssueStepEditForm from './IssueStepEditForm';

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
        paddingBottom: '0.7rem',
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
}));

const IssueView = ({ AdjustNavbar, IssueData }) => {
    const { id } = useParams();
    const [Loaded, setLoaded] = useState(true);
    const [DeleteModalIsOpen, setDeleteModalOpen] = useState(false);
    const [AddNewModalIsOpen, setAddNewModalOpen] = useState(false);
    const [CloseModalIsOpen, closeModalOpen] = useState(false);
    const [Issue, setIssue] = useState();
    const [IssueSteps, setIssueSteps] = useState([]);

    const styles = useStyles();
    const theme = useSelector((state) => state.Theme);

    useEffect(() => {
        getIssueData();
        getIssueStepData();
    }, []);

    const refreshCallback = () => {
        getIssueData();
        getIssueStepData();
    };

    const getIssueData = () => {
        LoadIssueData(id, setIssue);
    };

    const getIssueStepData = () => {
        LoadIssueStepsData(id, setIssueSteps);
    };

    const addNewHandleOpen = () => {
        setAddNewModalOpen(true);
    };

    const addNewHandleClose = () => {
        setAddNewModalOpen(false);
    };

    const closeHandleOpen = () => {
        setDeleteModalOpen(true);
    };

    const closeHandleClose = () => {
        setDeleteModalOpen(false);
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
        AdjustNavbar(props, () => {});
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
                                      <React.Fragment key={issueStep.id}>
                                          {issueStep.completed === null ? (
                                              <Card className={styles.stepCard}>
                                                  <CardContent>
                                                      <IssueStepEditForm
                                                          issueStepData={issueStep}
                                                          refreshCallback={refreshCallback}
                                                      />
                                                  </CardContent>
                                              </Card>
                                          ) : (
                                              <Card className={styles.stepCard}>
                                                  <CardContent>
                                                      <div className={styles.titleBox}>
                                                          <Typography variant="h4">{issueStep.name}</Typography>
                                                          <Typography variant="h6">
                                                              Completed:{' '}
                                                              {issueStep.completed
                                                                  .toString()
                                                                  .replace('T', String.fromCharCode(160))}
                                                          </Typography>
                                                      </div>
                                                      <Typography variant="h6">
                                                          <b>Responsible:</b> {issueStep.responsible}
                                                      </Typography>
                                                      <Typography variant="h6">
                                                          <b>Completed by:</b> {issueStep.updatedBy}
                                                      </Typography>
                                                      <Typography variant="h6">
                                                          <b>Comment:</b> <br /> {issueStep.comment}
                                                      </Typography>
                                                  </CardContent>
                                              </Card>
                                          )}
                                      </React.Fragment>
                                  ))
                                : 'Loading...'}
                        </div>
                        <Card className={styles.issueInformation}>
                            {Issue ? (
                                Issue.closed == null ? (
                                    <IssueEditForm issueData={Issue} />
                                ) : (
                                    <React.Fragment>
                                        <Typography>Issue Name: {Issue.name}</Typography>
                                        <Typography>Importance: {Issue.importance.name}</Typography>
                                        <Typography>Description: {Issue.description}</Typography>
                                        <Typography>Created by: {Issue.createdBy}</Typography>
                                        <Typography>
                                            Closed: {Issue.closed.toString().replace('T', String.fromCharCode(160))}
                                        </Typography>
                                    </React.Fragment>
                                )
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

// const getIssueMockData = () => {
//     return {
//         id: 1,
//         closed: null,
//         name: 'Test issue',
//         description: 'Test issue description',
//         importance: 'Critical',
//         currentStep: '2',
//         currentResponsible: 'Test 1',
//         createdBy: 'VP',
//     };
// };

// const getIssueStepsMockData = () => {
//     return [
//         {
//             id: 1,
//             issue: 1,
//             responsible: 'Test user 1',
//             stepName: 'Registration',
//             comment: 'Example issue has been registered',
//             completed: '2020-03-25',
//         },
//         {
//             id: 2,
//             issue: 1,
//             responsible: 'VP',
//             stepName: 'Planning',
//             comment: 'Search for example issue possible dangers and plan action plan',
//             completed: '2020-03-26',
//         },
//         {
//             id: 3,
//             issue: 1,
//             responsible: 'Test user 1',
//             stepName: 'Solution',
//             comment: 'Solve example issue',
//             completed: null,
//         },
//     ];
// };
