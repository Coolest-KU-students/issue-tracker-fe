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
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import { ChangeUserExpiration, LoadPaginatedData } from '../../DataSources/Users';
import UserModal from './UserModal';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return {
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
    };
});

const UsersList = ({ AdjustNavbar }) => {
    const [users, setUsers] = useState();
    const [column, setColumn] = useState({ name: 'login', ascending: true });
    const [paging, setPaging] = useState({ number: 0, size: 5 });
    const [showExpired, setShowExpired] = useState(false);
    const [Total, setTotal] = useState(1);
    const [ModalIsOpen, setModalOpen] = useState(false);
    const [EditIsOpen, setEditIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const theme = useSelector((state) => state.Theme);

    useEffect(() => {
        DataReload();
    }, [column, showExpired, paging]);
    /*Users JSON:
    {   Login,
        FirstName,
        LastName,
        LastActive
    }*/

    const DataReload = () => {
        LoadPaginatedData(DistributeData, {
            showExpired: showExpired,
            page: paging.number,
            size: paging.size,
            orderBy: column.name,
            ascending: column.ascending,
        });
    };

    const DistributeData = (data) => {
        setUsers(data.content);
        setTotal(data.totalElements);
    };

    const SortData = (Column) => {
        if (column.name === Column) setColumn({ name: column.name, ascending: !column.ascending });
        else setColumn({ name: Column, ascending: true });
    };

    const ColumnWidths = [15, 10, 15, 5, 5];

    const SumWidths = ColumnWidths.reduce((a, b) => a + b, 0);

    const styles = useStyles();

    const callbackModal = () => {
        handleClose();
        DataReload();
    };

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setEditIsOpen(true);
    };
    const handleClose = () => {
        setModalOpen(false);
        setEditIsOpen(false);
    };

    const handlePaging = (event, number) => {
        setPaging({ number: number, size: paging.size });
    };

    const handlePageSizing = (event) => {
        setPaging({ number: paging.number, size: event.target.value });
    };

    const ChangeExpiration = (login) => {
        ChangeUserExpiration(login, DataReload);
    };

    useEffect(() => {
        const props = {
            PageName: 'Issue List',
            currentListElement: 'Users',
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
                        <ListItemText primary="Register New User" />
                    </ListItem>
                </div>
            );
        });
    }, [theme]);

    return (
        <React.Fragment>
            <Modal open={ModalIsOpen} onClose={handleClose}>
                <UserModal callback={callbackModal} />
            </Modal>
            <Modal open={EditIsOpen} onClose={handleClose}>
                <UserModal callback={callbackModal} userDetails={currentUser} />
            </Modal>
            {users ? (
                <Container maxWidth="xl" className={styles.content}>
                    <TableContainer
                        component={Paper}
                        style={{ padding: '1rem', paddingBottom: '0px', backgroundColor: theme.tableContainerColor }}
                    >
                        <Table>
                            <TableHead>
                                <TableCell align="right" width="20%">
                                    <Typography>
                                        <Checkbox
                                            onChange={() => {
                                                setShowExpired(!showExpired);
                                            }}
                                        />
                                        Show&nbsp;Expired
                                    </Typography>
                                </TableCell>
                            </TableHead>
                        </Table>
                        <Table>
                            <TableHead className={styles.TableHead}>
                                <TableCell width="5%" />
                                <TableCell align="left" width={(100 * ColumnWidths[0]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('login');
                                        }}
                                    >
                                        <Typography variant="h6">Login</Typography>
                                        {column.name === 'login' &&
                                            (column.ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>

                                <TableCell align="right" width={(100 * ColumnWidths[1]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('lastName');
                                        }}
                                    >
                                        <Typography variant="h6">Name</Typography>
                                        {column.name === 'lastName' &&
                                            (column.ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>

                                <TableCell align="center" width={(100 * ColumnWidths[2]) / SumWidths + '%'}>
                                    <Button
                                        onClick={() => {
                                            SortData('lastActive');
                                        }}
                                    >
                                        <Typography variant="h6">Last Active</Typography>
                                        {column.name === 'lastActive' &&
                                            (column.ascending ? (
                                                <ArrowDownwardIcon className={styles.SortingArrow} />
                                            ) : (
                                                <ArrowUpwardIcon className={styles.SortingArrow} />
                                            ))}
                                    </Button>
                                </TableCell>
                                <TableCell align="center" width={(100 * ColumnWidths[3]) / SumWidths + '%'}>
                                    <Typography variant="h6">{showExpired ? 'RESTORE' : 'EXPIRE'}</Typography>
                                </TableCell>
                                <TableCell align="center" width={(100 * ColumnWidths[4]) / SumWidths + '%'}>
                                    <Typography variant="h6">EDIT</Typography>
                                </TableCell>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.login} className={styles.TableRows}>
                                        <TableCell />
                                        <TableCell
                                            align="left"
                                            className={styles.BodyTableCells}
                                            style={{ paddingLeft: '2rem ' }}
                                        >
                                            {user.login}
                                        </TableCell>

                                        <TableCell align="right" className={styles.BodyTableCells}>
                                            {user.firstName} {user.lastName}
                                        </TableCell>

                                        <TableCell align="center" className={styles.BodyTableCells}>
                                            {user.lastActive ? (
                                                <div>
                                                    {user.lastActive.toString().replace('T', String.fromCharCode(160))}
                                                </div>
                                            ) : (
                                                'No data'
                                            )}
                                        </TableCell>
                                        <TableCell align="center" style={theme.BodyTableCells}>
                                            <Button
                                                className={styles.deleteButton}
                                                onClick={() => {
                                                    ChangeExpiration(user.login);
                                                }}
                                            >
                                                <RemoveCircleOutlineRoundedIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center" style={theme.BodyTableCells}>
                                            <Button
                                                className={styles.deleteButton}
                                                onClick={() => {
                                                    handleEdit(user);
                                                }}
                                            >
                                                <BorderColorOutlinedIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={Total}
                                    rowsPerPage={paging.size}
                                    page={paging.number}
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

export default UsersList;
/*
const LoadPaginatedData = (setData, configuration) => {
    setData(getMockData(configuration));
};

const getMockData = (configuration) => {
    console.log(configuration);
    return {
        content: [
            { Login: 'Lukas', FirstName: 'Lu', LastName: 'Kas', LastActive: '1999/04/26' },
            { Login: 'Vulkas', FirstName: 'Vul', LastName: 'Kas', LastActive: '1999/06/26' },
            { Login: 'Vuldas', FirstName: 'Vul', LastName: 'Das', LastActive: '1999/07/26' },
            { Login: 'Valdas', FirstName: 'Val', LastName: 'Das', LastActive: '1999/09/26' },
        ],
        pageable: {
            sort: { sorted: true, unsorted: false, empty: false },
            offset: 0,
            pageNumber: 0,
            pageSize: 10,
            paged: true,
            unpaged: false,
        },
        last: true,
        totalElements: 4,
        totalPages: 1,
        size: 10,
        sort: { sorted: true, unsorted: false, empty: false },
        first: true,
        numberOfElements: 4,
        number: 0,
        empty: false,
    };
};
*/
