import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { colors, Modal } from '@material-ui/core';
import PasswordChangeModal from '../UserProfile/PasswordChangeModal';
import Notification from '../../GlobalFeatures/Notification';
import { ClearAllNotifications } from '../../GlobalFeatures/Notification';
//TODO: Get The Logo
function Image() {
    return <AssignmentIcon fontSize="" />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        transform: 'scale(1.6)',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    },
    form: {
        marginTop: theme.spacing(12),
        paddingTop: '0rem',
        backgroundColor: colors.lightBlue[50],
        padding: '1rem',
        boxShadow: '0px 0rem 1rem 2rem rgba(225,245,254, 1)',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LogIn(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //TODO: Enhance Modal popup when correct auth error measures are taken
    const [passwordModal, setPasswordModal] = useState(false);
    const setAuthenticated = props.setAuthenticated;
    document.body.style = 'background: linear-gradient(to right, #f64f29, #FEA880, #a0e5bc, #59F3E5, #01e2e9);';

    const handleSubmit = (e) => {
        ClearAllNotifications();
        e.preventDefault();

        var credentialsExist = !!email && !!document.getElementById('password').value;
        credentialsExist ? LoggingInSuccessfully() : Notification('', 'Please Fill In Credentials', 'danger');
    };

    const LoggingInSuccessfully = () => {
        Notification('Logging In', 'Please wait while our system processes the request', 'warning', 2000);
        setAuthenticated({
            login: email,
            password: document.getElementById('password').value,
        });
    };

    return (
        <div className={classes.page}>
            <Modal open={passwordModal}>
                <PasswordChangeModal credentials={(email, password)} />
            </Modal>
            <Container component="main" maxWidth="sm">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Image />
                    </Avatar>

                    <Typography component="div" variant="h2">
                        Issue Register
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Username"
                            label="Username"
                            name="Username"
                            autoComplete="Username"
                            autoFocus
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/*TODO: Forgotten Password
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      openAlert(true);
                    }}
                  >
                    Forgot password?
                </Link>*/}
                            </Grid>
                            <Grid item>
                                {/*TODO: Registering*/}
                                {/* <Link href="#" variant="body2">
                    Apply For Registration
                </Link>*/}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}

LogIn.propTypes = {
    setAuthenticated: PropTypes.func,
};
