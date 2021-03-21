import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleIcon from '@material-ui/icons/People';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Collapse from '@material-ui/core/Collapse';
import { useState } from 'react';

export default function NavigationButtons(props) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const styleBasedOnType = (elementType) => {
        if (elementType === props.currentElement)
            return {
                backgroundColor: 'lightgreen',
            };
        else return { backgroundColor: 'inherit' };
    };

    return (
        <div>
            <ListSubheader inset>Navigation</ListSubheader>
            <ListItem button style={styleBasedOnType('Home')}>
                <ListItemIcon>
                    <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/" button style={styleBasedOnType('Issues')}>
                <ListItemIcon>
                    <ListAltRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Issue List" />
            </ListItem>
            <ListItem button style={styleBasedOnType('Users')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
            <ListItem
                button
                onClick={handleClick}
                style={open ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'inherit' }}
            >
                <ListItemIcon>
                    <SettingsApplicationsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit style={{ paddingLeft: '0.5rem' }}>
                <ListItem component={Link} to="/steps" button style={styleBasedOnType('Steps')}>
                    <ListItemIcon>
                        <LibraryAddCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Step" />
                </ListItem>
                <ListItem component={Link} to="/importances" button style={styleBasedOnType('Importance')}>
                    <ListItemIcon>
                        <PriorityHighIcon />
                    </ListItemIcon>
                    <ListItemText primary="Importance" />
                </ListItem>
            </Collapse>

            <ListItem component={Link} to="/logout" button>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItem>
        </div>
    );
}
