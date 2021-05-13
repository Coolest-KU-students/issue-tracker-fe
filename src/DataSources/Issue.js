import axios from 'axios';

const LoadIssueData = (id, setIssue, callback) => {
    axios.get('/issues/' + id).then((response) => {
        setIssue(response.data);
        if (typeof callback == typeof (() => {})) callback();
    });
};

export const UpdateIssue = (id, issueData, callback) => {
    axios.put('/issues/' + id, issueData).then((response) => {
        if (typeof callback == typeof (() => {})) callback();
    });
};

export default LoadIssueData;
