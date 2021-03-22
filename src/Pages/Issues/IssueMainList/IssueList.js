import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, Container, TableFooter, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, Button, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal';
import NewIssueModal from './NewIssueModal';
import { LoadPaginatedData } from '../../../DataSources/viwIssues';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    SortingArrow: {
        marginTop: '0',
    },
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
    TableRows: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#efeffa',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#cadafa',
        },
    },
    TableHead: {
        backgroundColor: '#c5c2c9',
    },
    BodyTableCells: {
        paddingRight: '2rem',
    },
    NewIssueModal: {},
}));

const IssueList = ({ AdjustNavbar }) => {
    //const [Issues, setIssues] = useState(GetIssueData("ID", true, 10, 0));
    const [Issues, setIssues] = useState({});
    const [Loaded, setLoaded] = useState(false);
    const [ModalIsOpen, setModalOpen] = useState(false);

    const theme = useSelector((state) => state.Theme);

    if (!Loaded) {
        LoadPaginatedData(
            {
                Column: 'id',
                Ascending: 1,
                PageSize: 10,
                PageNumber: 0,
            },
            setIssues,
            setLoaded,
            {
                hideClosed: 0,
                showCreatedByUser: 0,
                showIssuesWhereUserIsResponsible: 0,
            }
        );
    }

    const GetFilteringBooleans = () => {
        return {
            hideClosed: document.getElementById('Closed').checked,
            showCreatedByUser: document.getElementById('MyIssues').checked,
            showIssuesWhereUserIsResponsible: document.getElementById('MyResponsobilities').checked,
        };
    };

    const GetIssueData = (Column, Ascending, PageSize, PageNumber) => {
        Column = Column ? Column : Issues.Column;
        Ascending = typeof Ascending != undefined ? Ascending : Issues.Ascending;
        PageSize = PageSize ? PageSize : Issues.PageSize;
        PageNumber = typeof PageNumber != undefined ? PageNumber : 0;

        LoadPaginatedData(
            {
                Column: Column,
                Ascending: Ascending,
                PageSize: PageSize,
                PageNumber: PageNumber,
            },
            setIssues,
            setLoaded,
            GetFilteringBooleans()
        );
    };

    const SortData = (Column) => {
        if (Issues.Column === Column) {
            GetIssueData(Column, !Issues.Ascending, Issues.PageSize, 0);
        } else GetIssueData(Column, true, Issues.PageSize, 0);
    };
    /*Issues JSON:
    {
        Column: //Column that is being sorted By
        Ascending: //Bool to indicate if the order is ASC or DESC
        Total: //The Number of Total Issues based on filter
        PageSize: //How many rows should be returned
        PageNumber: //On what page Are we
        Issues: [{}, {}] //Array of Issues

    }
*/

    //Quick calculations to be able to adjust column widths
    const ColumnWidths = [20, 30, 8, 14, 10];

    const SumWidths = ColumnWidths.reduce((a, b) => a + b, 0);

    const styles = useStyles();

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleCheckbox = () => {
        GetIssueData(Issues.Column, Issues.Ascending, Issues.PageSize, Issues.PageNumber);
    };

    const handlePaging = (event, number) => {
        GetIssueData(Issues.Column, Issues.Ascending, Issues.PageSize, number);
    };

    const handlePageSizing = (event) => {
        GetIssueData(Issues.Column, Issues.Ascending, event.target.value, Issues.PageNumber);
    };

    useEffect(() => {
        const props = {
            PageName: 'Issue List',
            currentListElement: 'Issues',
        };
        AdjustNavbar(props, () => {
            return (
                <div>
                    <ListSubheader inset style={{ backgroundColor: 'inherit', color: 'inherit' }}>
                        Tasks
                    </ListSubheader>
                    <ListItem button onClick={handleOpen}>
                        <ListItemIcon>
                            <AddBoxIcon color={theme.navbarIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Create New Issue" />
                    </ListItem>
                </div>
            );
        });
    }, [theme]);

    return (
        <React.Fragment>
            <Modal open={ModalIsOpen} onClose={handleClose}>
                <NewIssueModal />
            </Modal>

            {Loaded ? (
                <Container maxWidth="xl" className={styles.content}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableCell>
                                    <Typography>Common Filters:</Typography>
                                </TableCell>
                                <TableCell align="right" width="20%">
                                    <Typography>
                                        <Checkbox
                                            comment="This has to be here because otherwise the other checkbox doesn't work"
                                            style={{ display: 'none' }}
                                        />
                                        <Checkbox id="Closed" onChange={handleCheckbox} />
                                        Hide Closed
                                    </Typography>
                                </TableCell>
                                <TableCell align="right" width="20%">
                                    <Typography>
                                        <Checkbox id="MyIssues" onChange={handleCheckbox} />
                                        Show&nbsp;Issues Created&nbsp;By&nbsp;Me
                                    </Typography>
                                </TableCell>
                                <TableCell align="right" width="20%">
                                    <Typography>
                                        <Checkbox id="MyResponsobilities" onChange={handleCheckbox} />
                                        Show&nbsp;Issues with My&nbsp;Responsibility
                                    </Typography>
                                </TableCell>
                            </TableHead>
                        </Table>
                        <Table>
                            <TableHead className={styles.TableHead}>
                                <TableCell width={(100 * ColumnWidths[0]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('name');
                                        }}
                                    >
                                        <Typography variant="h6">Name</Typography>
                                        {Issues.Column === 'name' &&
                                            (Issues.Ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>

                                <TableCell width={(100 * ColumnWidths[1]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('description');
                                        }}
                                    >
                                        <Typography variant="h6">Description</Typography>
                                        {Issues.Column === 'description' &&
                                            (Issues.Ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>

                                <TableCell width={(100 * ColumnWidths[2]) / SumWidths + '%'} align="right">
                                    <Button
                                        onClick={() => {
                                            SortData('importance.sortOrder');
                                        }}
                                    >
                                        <Typography variant="h6" align="right">
                                            Importance
                                        </Typography>
                                        {Issues.Column === 'importance' &&
                                            (Issues.Ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>

                                <TableCell width={(100 * ColumnWidths[3]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('currentStep');
                                        }}
                                    >
                                        <Typography variant="h6">Current Step</Typography>
                                        {Issues.Column === 'currentStep' &&
                                            (Issues.Ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>

                                <TableCell width={(100 * ColumnWidths[4]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('closed');
                                        }}
                                    >
                                        <Typography variant="h6">Progress</Typography>
                                        {Issues.Column === 'closed' &&
                                            (Issues.Ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>
                            </TableHead>
                            <TableBody>
                                {Issues.Issues.map((Issue) => (
                                    <TableRow key={Issue.id} className={styles.TableRows}>
                                        <TableCell className={styles.BodyTableCells}>{Issue.name}</TableCell>

                                        <TableCell className={styles.BodyTableCells}>{Issue.description}</TableCell>

                                        <TableCell align="center" className={styles.BodyTableCells}>
                                            {Issue.importance.name}
                                        </TableCell>

                                        <TableCell align="center" className={styles.BodyTableCells}>
                                            {Issue.currentStep ? Issue.currentStep : 'Completed'}
                                        </TableCell>

                                        <TableCell className={styles.BodyTableCells}>
                                            {Issue.closed ? (
                                                <div>
                                                    Closed On <br />{' '}
                                                    {Issue.closed.toString().replace('T', String.fromCharCode(160))}
                                                </div>
                                            ) : (
                                                'Active'
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={Issues.Total}
                                    rowsPerPage={Issues.PageSize}
                                    page={Issues.PageNumber}
                                    onChangePage={handlePaging}
                                    onChangeRowsPerPage={handlePageSizing}
                                />
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Container>
            ) : (
                <Container>Loading...</Container>
            )}
        </React.Fragment>
    );
};

export default IssueList;
/*
const GetIssueData = (Column, Ascending, PageSize, PageNumber) => {

  viwIssues
  /*
  console.log(Column, Ascending ? "ASC" : "DESC");
  if (document.getElementById("MyResponsobilities"))
    console.log(
      document.getElementById("MyResponsobilities").checked,
      document.getElementById("MyIssues").checked,
      document.getElementById("Closed").checked
    );

  console.log(PageSize, PageNumber);
  return {
    Column: Column,
    Ascending: Ascending,
    Total: 5,
    PageSize: PageSize,
    PageNumber: PageNumber,
    Issues: [
      {
        ID: 1,
        Name: "name1",
        Description: "I am describing this issue",
        Importance: 3,
        CurrentStep: "Evaluate",
        Closed: "2020-12-26",
      },
      {
        ID: 2,
        Name: "name2",
        Description: "I am describing this issue",
        Importance: 2,
        CurrentStep: "Preparation",
        Closed: null,
      },
      {
        ID: 3,
        Name: "name3",
        Description: "I am describing this issue",
        Importance: 4,
        CurrentStep: "Execution",
        Closed: null,
      },
      {
        ID: 4,
        Name: "name4",
        Description: "I am describing this issue",
        Importance: 5,
        CurrentStep: "Approval",
        Closed: "20011-01-20",
      },
      {
        ID: 5,
        Name: "name6",
        Description: "I am describing this issue",
        Importance: 1,
        CurrentStep: "Registration",
        Closed: null,
      },
    ],
  };
};
*/
