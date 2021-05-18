import axios from 'axios';

const LoadData = (configuration, setIssues, setLoaded) => {
    axios.get('/issues/').then((response) => {
        setIssues({
            ...configuration,
            Total: response.data.length,
            Issues: response.data,
        });
        setLoaded(true);
    });
};

export const LoadPaginatedData = (configuration, setIssues, setLoaded, filtering) => {
    axios
        .get('/issues/data', {
            params: {
                orderBy: configuration.Column,
                ascending: configuration.Ascending,
                page: configuration.PageNumber,
                size: configuration.PageSize,
                hideClosed: !filtering.hideClosed,
                showCreatedByUser: filtering.showCreatedByUser,
                showIssuesWhereUserIsResponsible: filtering.showIssuesWhereUserIsResponsible,
            },
        })
        .then((response) => {
            setIssues({
                Column: configuration.Column,
                Ascending: configuration.Ascending,
                Total: response.data.totalElements,
                PageSize: configuration.PageSize,
                PageNumber: configuration.PageNumber,
                Issues: response.data.content,
            });
            setLoaded(true);
        });
};

export const CreateNewIssue = (newIssueData, setCompleted) => {
    axios.post('/issues/', newIssueData).then((response) => {
        setCompleted(response.data);
    });
};

export default LoadData;
