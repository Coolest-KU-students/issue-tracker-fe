import { makeStyles } from '@material-ui/core';

export const Dark = {
    theme: 'Dark',
    primary: 'secondary',
    secondary: 'primary',
    navbarColor: 'secondary',
    navbarPageNameColor: 'textPrimary',
    bodyStyle: 'background: darkgrey',
    greyTone: 'darkgrey',
    currenAppBackground: 'darkblue',
    navbarDrawerStyle: { backgroundColor: '#101010', color: 'white' },
    lineColor: 'white',
    navbarIcon: 'secondary',
    classes: makeStyles((theme) => ({
        navbarIcons: {
            color: 'secondary',
        },
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
