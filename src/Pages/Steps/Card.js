import { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicatorOutlinedIcon from '@material-ui/icons/DragIndicatorOutlined';
import { DeleteStep } from '../../DataSources/Steps';
import Notification from '../../GlobalFeatures/Notification';

const useStyles = makeStyles((theme) => ({
    cardElement: {
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        paddingLeft: 0,
        height: '3.2rem',
    },
    deleteButton: {
        float: 'right',
        color: '#ee0000',
        paddingTop: '0.3rem',
        fontSize: '1.7rem',
        '&:hover': {
            color: '#646464',
            cursor: 'pointer',
        },
    },
}));

export const Card = ({ id, text, index, moveCard, draggable, setStepDeleted }) => {
    const styles = useStyles();
    const ref = useRef(null);
    const [reqError, setReqError] = useState('');

    //TODO: This is ugly:
    useEffect(() => {
        if (reqError !== '') {
            Notification('', reqError.toString(), 'danger', 3000);
            setReqError('');
        }
    }, [reqError]);

    const handleDeleteButtonClick = () => {
        DeleteStep(id, setReqError, setStepDeleted);
    };

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    if (draggable) {
        return (
            <div ref={ref} className={styles.cardElement} style={{ opacity }} data-handler-id={handlerId}>
                <Typography style={{ textAlign: 'Left' }} variant="h6">
                    <DragIndicatorOutlinedIcon style={{ paddingTop: '0.5rem' }} />
                    {text}
                </Typography>
            </div>
        );
    } else {
        return (
            <div
                className={styles.cardElement}
                style={{
                    cursor: 'default',
                }}
                data-handler-id={handlerId}
            >
                <Typography style={{ textAlign: 'Left', paddingLeft: '1.5rem' }} variant="h6">
                    {text}
                    <Button className={styles.deleteButton} onClick={handleDeleteButtonClick}>
                        <DeleteIcon />
                    </Button>
                </Typography>
            </div>
        );
    }
};
