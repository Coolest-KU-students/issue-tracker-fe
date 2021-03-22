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
import { useSelector } from 'react-redux';

export default function NavigationButtons(props) {
    const [open, setOpen] = useState(false);

    const theme = useSelector((state) => state.Theme);

    const handleClick = () => {
        setOpen(!open);
    };

    const styleBasedOnType = (elementType) => {
        if (elementType === props.currentElement)
            return {
                backgroundColor: theme.currenAppBackground,
            };
        else return { backgroundColor: 'inherit' };
    };

    return (
        <div>
            <ListSubheader inset style={{ backgroundColor: 'inherit', color: 'inherit' }}>
                Navigation
            </ListSubheader>
            <ListItem button style={styleBasedOnType('Home')}>
                <ListItemIcon>
                    <HomeWorkIcon color={theme.navbarIcon} />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/" button style={styleBasedOnType('Issues')}>
                <ListItemIcon>
                    <ListAltRoundedIcon color={theme.navbarIcon} />
                </ListItemIcon>
                <ListItemText primary="Issue List" />
            </ListItem>
            <ListItem button style={styleBasedOnType('Users')}>
                <ListItemIcon>
                    <PeopleIcon color={theme.navbarIcon} />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
            <ListItem
                button
                onClick={handleClick}
                style={open ? { backgroundColor: theme.greyTone } : { backgroundColor: 'inherit' }}
            >
                <ListItemIcon>
                    <SettingsApplicationsIcon color={theme.navbarIcon} />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
                {open ? <ExpandLess color={theme.navbarIcon} /> : <ExpandMore color={theme.navbarIcon} />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit style={{ paddingLeft: '0.5rem' }}>
                <ListItem component={Link} to="/steps" button style={styleBasedOnType('Steps')}>
                    <ListItemIcon>
                        <LibraryAddCheckIcon color={theme.navbarIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Step" />
                </ListItem>
                <ListItem component={Link} to="/importances" button style={styleBasedOnType('Importance')}>
                    <ListItemIcon>
                        <PriorityHighIcon color={theme.navbarIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Importance" />
                </ListItem>
            </Collapse>

            <ListItem component={Link} to="/logout" button>
                <ListItemIcon>
                    <ExitToAppIcon color={theme.navbarIcon} />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItem>
        </div>
    );
}
