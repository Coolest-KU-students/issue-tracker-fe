import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
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
import LoadData, { UpdateStepList, CreateNewStep, DeleteStep } from '../../../DataSources/Steps';
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

const StepList = ({ AdjustNavbar }) => {
    const styles = useStyles();
    const [isEditMode, setIsEditMode] = useState(false);
    const [steps, setSteps] = useState([]);
    const [ModalIsOpen, setModalOpen] = useState(false);

    const theme = useSelector((state) => state.Theme);

    useEffect(() => {
        GetStepData();
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

    const GetStepData = () => {
        LoadData(setSteps);
    };

    const CreateAndReload = (newStepName, setSavingFinished, errorCallback) => {
        CreateNewStep(newStepName, GetStepData, setSavingFinished, errorCallback);
    };

    const CardContainer = (props) => {
        {
            const [cards, setCards] = useState(props.data);
            const styles = useStyles();

            const successfulSave = () => {
                LoadData(setSteps, () => {
                    setIsEditMode(false);
                });
            };

            const handleSaveStepList = () => {
                let stepList = cards;
                stepList.forEach((step, index) => {
                    step.sortOrder = index;
                });
                UpdateStepList(stepList, successfulSave);
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

            const DeleteStepById = (id) => {
                DeleteStep(id, GetStepData);
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
                        DeleteObject={DeleteStepById}
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
                            onClick={handleSaveStepList}
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
            PageName: 'Step Configuration',
            currentListElement: 'Steps',
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
                        <ListItemText primary="Create New Step" />
                    </ListItem>
                </div>
            );
        });
    }, [theme]);

    return (
        <React.Fragment>
            <Modal open={ModalIsOpen} onClose={handleClose}>
                <NewStepModal ObjectType="Step" ObjectCreationFunction={CreateAndReload} handleClose={handleClose} />
            </Modal>

            <Container maxWidth="xl" className={styles.content}>
                <Paper>
                    {steps && (
                        <DndProvider backend={HTML5Backend}>
                            <div className={styles.contStyle}>
                                <CardContainer data={steps} />
                            </div>
                        </DndProvider>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default StepList;
