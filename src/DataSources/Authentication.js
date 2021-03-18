import axios from 'axios';
import { RESPONSE_STATUS } from '../GlobalFeatures/Constants';
import Notification, { ClearAllNotifications } from '../GlobalFeatures/Notification';
import GlobalConfiguration, { StoreJWTToken, GetJWTToken } from './GlobalConfiguration';

const Authenticate = (credentials, setAuthenticated) => {
    GlobalConfiguration();
    axios
        .post('/login', credentials)
        .then((response) => {
            StoreJWTToken(response.data.token);
            setAuthenticated(true);
            setTimeout(() => {
                ClearAllNotifications();
                Notification('', 'Welcome back, ' + credentials.login, 'success', 3000);
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
    GlobalConfiguration();

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
                if (err.request.status === RESPONSE_STATUS.UNAUTHORIZED) {
                    Notification('Login session has expired', 'Please log in to create new session', 'info', 3000);
                }
            });
    } else setAuthenticated(false);
};

export default Authenticate;
