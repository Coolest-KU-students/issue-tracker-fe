import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Switch from '@material-ui/core/Switch';
import NavigationButtons from './NavigationButtons';
import logo from '../../logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeTheme } from '../reducers/actions/ThemeActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    Display: {
        display: 'flex',
    },

    Hide: {
        display: 'none',
    },

    right: {
        alignItems: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
    },

    root: {
        flexGrow: 1,
    },

    menuButton: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(2),

            display: 'box',
        },
    },

    link: {
        color: '#ffffff',
        textDecoration: 'none',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'absolute',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        position: 'fixed',
        display: 'inline-flex',
        width: drawerWidth,
        [theme.breakpoints.down('md')]: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

Navbar.propTypes = {
    PageName: PropTypes.string,
    currentListElement: PropTypes.string,
    children: PropTypes.any,
};

export default function Navbar(props) {
    const theme = useSelector((state) => state.Theme);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    document.body.style = theme.bodyStyle;

    const NavbarHeight = '45px';

    const handleThemeChange = (e) => {
        dispatch(ChangeTheme(e.target.checked ? 'Light' : 'Dark'));
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={open ? classes.appBarShift : classes.appBar} color={theme.navbarColor}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color={theme.navbarPageNameColor}
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={open ? classes.menuButtonHidden : classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <img style={{ height: NavbarHeight }} src={logo} className="App-logo" alt="logo" />
                    <Typography
                        component="h1"
                        variant="h6"
                        color="black"
                        noWrap
                        className={classes.title}
                        color={theme.navbarPageNameColor}
                    >
                        Issue Tracker {props.PageName ? ':: ' + props.PageName : ''}
                    </Typography>
                    <IconButton color="inherit" style={{ display: 'none' }}>
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Switch
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                        onChange={handleThemeChange}
                    />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: open ? classes.drawerPaper : classes.drawerPaperClose,
                }}
                open={open}
                PaperProps={{ style: theme.navbarDrawerStyle }}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    <NavigationButtons currentElement={props.currentListElement} />
                </List>
                <Divider light={theme.theme == 'Dark'} />
                <List>{props.children}</List>
            </Drawer>
        </div>
    );
}
/*
const HomeButton = () => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary">
      <div to="/" className={classes.link}>
        <span>Home</span>
      </div>
    </Button>
  );
};

const LogOut = () => {
  return (
    <Button variant="contained" color="primary">
      <span>Logout</span>
    </Button>
  );
};
*/
