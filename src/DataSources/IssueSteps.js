import axios from 'axios';

const LoadIssueStepsData = (id, setIssueSteps, callback) => {
    axios.get('/issuesteps/' + id).then((response) => {
        setIssueSteps(response.data);
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const UpdateIssueStep = (id, stepData, callback) => {
    axios.put('/issuesteps/' + id, stepData).then(() => {
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const CloseIssue = (id, callback) => {
    axios.post('/issuesteps/' + id).then(() => {
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const CreateNewStep = (oldIssueStepId, newStepId, callback) => {
    axios.get('/issuesteps/', { params: { oldIssueStepId, newStepId } }).then(() => {
        if (typeof callback == typeof (() => {})) callback();
    });
};

export default LoadIssueStepsData;
