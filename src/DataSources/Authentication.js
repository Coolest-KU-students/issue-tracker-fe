import axios from 'axios';
import { StoreJWTToken, GetJWTToken } from './GlobalConfiguration';
import Notification, { ClearAllNotifications } from '../GlobalFeatures/Notification';
import { useDispatch } from 'react-redux';
import { LoggingIn } from '../GlobalFeatures/reducers/actions/UserActions';

const Authenticate = (credentials, callback) => {
    axios
        .post('/login', credentials)
        .then((response) => {
            StoreJWTToken(response.data.token);
            setTimeout(() => {
                if (typeof callback === typeof (() => {})) callback();
                WelcomeNotification(credentials.login);
            }, 200);
            SaveUserName(response.data.name);
        })
        .catch((error) => {
            if (error.response) {
                ClearAllNotifications();
                Notification(error.response.data.error, error.response.data.message, 'danger');
            }
        });
};

const SaveUserName = (name) => {
    useDispatch(LoggingIn(name));
};

export const ChangePassword = (credentials, newPassword, callback) => {
    axios
        .post('/pwChange', { credentials, newPassword })
        .then((response) => {
            StoreJWTToken(response.data.token);
            if (typeof callback === typeof (() => {})) callback();
            setTimeout(() => {
                WelcomeNotification(credentials.login);
            }, 5);
        })
        .catch((error) => {
            if (error.response) {
                ClearAllNotifications();
                Notification(error.response.data.error, error.response.data.message, 'danger');
            }
        });
};

export const CleanJWTToken = () => {
    StoreJWTToken('https://youtu.be/dQw4w9WgXcQ');
};

export const CheckJWTIsValid = (setAuthenticated) => {
    if (GetJWTToken()) {
        axios
            .get('/auth')
            .then((response) => {
                StoreJWTToken(response.data.token);
                setAuthenticated(true);
                return;
            })
            .catch((err) => {
                setAuthenticated(false);
                // if (err.request.status === RESPONSE_STATUS.UNAUTHORIZED) {
                //     Notification('Login session has expired', 'Please log in to create new session', 'info', 3000);
                // }
            });
    } else setAuthenticated(false);
};

export default Authenticate;

const WelcomeNotification = (login) => {
    ClearAllNotifications();
    Notification('', 'Welcome back, ' + login, 'success', 3000);
};
