import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    Button,
    Container,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    makeStyles,
    Modal,
    Paper,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Card } from '../Card';
import NewStepModal from '../NewStepModal';
import Notification from '../../../GlobalFeatures/Notification';
import LoadData, { UpdateImportanceList, CreateNewImportance, DeleteImportance } from '../../../DataSources/Importance';
import { useSelector } from 'react-redux';

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
    cardStyle: {
        width: 'auto',
        align: 'center',
    },
    contStyle: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '2rem',
        paddingBottom: '1rem',
    },
    buttons: {
        float: 'right',
        marginLeft: '0.5rem',
        marginTop: '0.3rem',
        marginBottom: '0.7rem',
    },
}));

const ImportanceList = ({ AdjustNavbar }) => {
    const styles = useStyles();
    const [isEditMode, setIsEditMode] = useState(false);
    const [importances, setImportances] = useState([]);
    const [ModalIsOpen, setModalOpen] = useState(false);

    const theme = useSelector((state) => state.Theme);
    useEffect(() => {
        GetImportanceData();
    }, []);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleEditButtonClick = () => {
        isEditMode && Notification('', 'Cancelled', 'info', 1000);
        setIsEditMode(!isEditMode);
    };

    const CreateAndReload = (newImportanceName, setSavingFinished, errorCallback) => {
        CreateNewImportance(newImportanceName, GetImportanceData, setSavingFinished, errorCallback);
    };

    const GetImportanceData = () => {
        LoadData(setImportances);
    };

    const CardContainer = (props) => {
        {
            const [cards, setCards] = useState(props.data);
            const styles = useStyles();

            const successfulSave = () => {
                LoadData(setImportances, () => {
                    setIsEditMode(false);
                });
            };

            const handleSaveImportanceList = () => {
                let stepList = cards;
                stepList.forEach((step, index) => {
                    step.sortOrder = index;
                });
                UpdateImportanceList(stepList, successfulSave);
            };

            const moveCard = useCallback(
                (dragIndex, hoverIndex) => {
                    const dragCard = cards[dragIndex];
                    setCards(
                        update(cards, {
                            $splice: [
                                [dragIndex, 1],
                                [hoverIndex, 0, dragCard],
                            ],
                        })
                    );
                },
                [cards]
            );

            const DeleteImportanceById = (id) => {
                DeleteImportance(id, GetImportanceData);
            };

            const renderCard = (card, index) => {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        text={card.name}
                        moveCard={moveCard}
                        draggable={isEditMode}
                        DeleteObject={DeleteImportanceById}
                    />
                );
            };

            return (
                <>
                    <div className={styles.cardStyle}>{cards.map((card, i) => renderCard(card, i))}</div>
                    {isEditMode && (
                        <Button
                            className={styles.buttons}
                            color="primary"
                            variant="contained"
                            onClick={handleSaveImportanceList}
                        >
                            Save
                        </Button>
                    )}
                    <Button
                        className={styles.buttons}
                        color={isEditMode ? 'secondary' : 'primary'}
                        variant="contained"
                        onClick={handleEditButtonClick}
                    >
                        {isEditMode ? 'CANCEL EDIT' : 'EDIT'}
                    </Button>
                </>
            );
        }
    };

    useEffect(() => {
        const props = {
            PageName: 'Importance Configuration',
            currentListElement: 'Importance',
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
                        <ListItemText primary="Create New" />
                    </ListItem>
                </div>
            );
        });
    }, [theme]);

    return (
        <React.Fragment>
            <Modal open={ModalIsOpen} onClose={handleClose}>
                <NewStepModal
                    ObjectType="Importance"
                    ObjectCreationFunction={CreateAndReload}
                    handleClose={handleClose}
                />
            </Modal>

            <Container maxWidth="xl" className={styles.content}>
                <Paper>
                    {importances && (
                        <DndProvider backend={HTML5Backend}>
                            <div className={styles.contStyle}>
                                <CardContainer data={importances} />
                            </div>
                        </DndProvider>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default ImportanceList;
