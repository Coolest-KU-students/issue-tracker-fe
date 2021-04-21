import axios from 'axios';
import Notification from '../GlobalFeatures/Notification';

const LoadData = (setUsers, callback) => {
    axios.get('/users/').then((response) => {
        setUsers(response.data);
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const LoadPaginatedData = (setUsers, configuration, callback) => {
    axios.post('/users/', configuration).then((response) => {
        setUsers(response.data);
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const ChangeUserExpiration = (login, callback) => {
    axios
        .delete('/users/' + login)
        .then(() => {
            if (typeof callback == typeof (() => {})) callback();
        })
        .catch((error) => {
            Notification('Error', error, 'danger', 3000);
        });
};

export const UpdateUser = (User, callback) => {
    axios.put('/users/', User).then(() => {
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const createNewUser = (config, callback) => {
    axios
        .post('/register', {
            login: config.login,
            password: config.password,
            firstName: config.firstName,
            lastName: config.lastName,
            changePasswordOnLogin: config.changePasswordOnLogin,
        })
        .then((response) => {
            Notification('Success', response.data, 'success', 1500);
            if (typeof callback == typeof (() => {})) callback();
        });
};

export default LoadData;
