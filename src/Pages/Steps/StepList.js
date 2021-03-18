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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from '../../GlobalFeatures/Navbar/Navbar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Card } from './Card';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Notification from '../../GlobalFeatures/Notification';
import LoadData from '../../DataSources/Steps';
import NewStepModal from './NewStepModal';

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

const StepList = () => {
    const styles = useStyles();
    const [isEditMode, setIsEditMode] = useState(false);
    const [steps, setSteps] = useState([]);
    const [ModalIsOpen, setModalOpen] = useState(false);
    const [stepDeleted, setStepDeleted] = useState(false);

    //TODO: Update step list after creating new step
    useEffect(() => {
        GetStepData();
        setStepDeleted(false);
    }, [stepDeleted]);

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

    const CardContainer = (props) => {
        {
            const [cards, setCards] = useState(props.data);
            const styles = useStyles();

            const handleSaveStepList = () => {
                console.log(cards);
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

            const renderCard = (card, index) => {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        text={card.name}
                        moveCard={moveCard}
                        draggable={isEditMode}
                        setStepDeleted={setStepDeleted}
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

    return (
        <React.Fragment>
            <Navbar PageName="Issue Tracker">
                <div>
                    <ListSubheader inset>Tasks</ListSubheader>
                    <ListItem button onClick={handleOpen}>
                        <ListItemIcon>
                            <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create New Step" />
                    </ListItem>
                </div>
            </Navbar>
            <Modal open={ModalIsOpen} onClose={handleClose}>
                <NewStepModal />
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
