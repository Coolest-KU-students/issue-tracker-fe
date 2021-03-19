import axios from 'axios';
import Notification from '../GlobalFeatures/Notification';
import { RESPONSE_STATUS } from './GlobalConfiguration';

const LoadData = (setSteps, callback) => {
    axios.get('/steps/').then((response) => {
        setSteps(response.data);
        if (typeof callback == typeof (() => {})) {
            callback();
        }
    });
};

export const DeleteStep = (id, GetStepData) => {
    axios
        .delete('/steps/' + id)
        .then(() => {
            GetStepData();
        })
        .catch((error) => {
            if (error.response.status === RESPONSE_STATUS.FORBIDDEN) {
                Notification('', 'At least 1 step must remain', 'danger', 3000);
            }
        });
};

export const CreateNewStep = (newStepName, GetStepData, setCompleted, errorCallback) => {
    axios
        .post('/steps/', newStepName, { headers: { 'Content-Type': 'text/plain' } })
        .then(() => {
            GetStepData();
            setCompleted();
        })
        .catch((error) => {
            if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
                Notification('', 'Please enter name of the new step', 'danger', 3000);
            } else if (error.response.status === RESPONSE_STATUS.INTERNAL_SERVER_ERROR) {
                Notification('Unknown server error', 'Please please contact site administrator', 'danger', 3000);
            }
            errorCallback();
        });
};

export const UpdateStepList = (stepList, callback) => {
    axios.put('/steps/', stepList).then(() => {
        callback();
    });
};

export default LoadData;
