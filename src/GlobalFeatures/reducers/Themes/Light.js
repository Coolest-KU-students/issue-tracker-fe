import { makeStyles } from '@material-ui/core';

export const Light = {
    theme: 'light',
    primary: 'primary',
    secondary: 'secondary',
    navbarColor: 'primary',
    navbarPageNameColor: 'inherit',
    greyTone: 'lightgrey',
    bodyStyle: 'background: lightgrey',
    currenAppBackground: 'lightgreen',
    navbarDrawerStyle: { backgroundColor: 'white', textColor: 'white' },
    lineColor: 'black',
    classes: makeStyles((theme) => ({
        navbarIcons: {},
        paper: {
            position: 'absolute',
            width: '33%',
            marginLeft: '34%',
            [theme.breakpoints.down('sm')]: {
                width: '95%',
                marginLeft: '2.5%',
            },

            marginTop: '10%',
        },
    })),
};
