import axios from 'axios';
import { RESPONSE_STATUS } from '../GlobalFeatures/Constants';
import GlobalConfiguration from './GlobalConfiguration';

const LoadData = (setSteps) => {
    GlobalConfiguration();
    axios.get('steps/').then((response) => {
        setSteps(response.data);
    });
};

export const DeleteStep = (id, setReqError, setStepDeleted) => {
    GlobalConfiguration();
    axios
        .delete('steps/' + id)
        .then(() => {
            setStepDeleted(true);
        })
        .catch((error) => {
            if (error.response.status === RESPONSE_STATUS.FORBIDDEN) {
                setReqError('At least 1 step must remain');
            }
        });
};

export const CreateNewStep = (newStepName, setCompleted, setReqError) => {
    GlobalConfiguration();
    axios
        .post('steps/', newStepName)
        .then(() => {
            setCompleted(true);
        })
        .catch((error) => {
            if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
                setReqError('Please enter name of the new step');
            }
        });
};

export default LoadData;
