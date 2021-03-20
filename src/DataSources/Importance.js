import axios from 'axios';
import Notification from '../GlobalFeatures/Notification';
import { RESPONSE_STATUS } from './GlobalConfiguration';

const LoadData = (setImportances, callback) => {
    axios.get('/importances/').then((response) => {
        setImportances(response.data);
        if (typeof callback == typeof (() => {})) {
            callback();
        }
    });
};

export const DeleteImportance = (id, GetImportanceData) => {
    axios
        .delete('/importances/' + id)
        .then(() => {
            GetImportanceData();
        })
        .catch((error) => {
            if (error.response.status === RESPONSE_STATUS.FORBIDDEN) {
                Notification('', 'At least 1 importance must remain', 'danger', 3000);
            }
        });
};

export const CreateNewImportance = (newImportanceName, GetImportanceData, setCompleted, errorCallback) => {
    axios
        .post('/importances/new', newImportanceName, { headers: { 'Content-Type': 'text/plain' } })
        .then(() => {
            GetImportanceData();
            setCompleted();
        })
        .catch((error) => {
            if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
                Notification('', 'Please enter name of the new importance', 'danger', 3000);
            } else if (error.response.status === RESPONSE_STATUS.INTERNAL_SERVER_ERROR) {
                Notification('Unknown server error', 'Please please contact site administrator', 'danger', 3000);
            }
            errorCallback();
        });
};

export const UpdateImportanceList = (importanceList, callback) => {
    axios.put('/importances/', importanceList).then(() => {
        callback();
    });
};

export default LoadData;
