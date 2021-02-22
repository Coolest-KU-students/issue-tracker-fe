import axios from "axios";
import GlobalConfiguration from "./GlobalConfiguration";

const LoadData = (configuration, setIssues, setLoaded) => {
  GlobalConfiguration();
  axios.get("/Issues/").then((response) => {
    setIssues({
      ...configuration,
      Total: response.data.length,
      Issues: response.data,
    });
    setLoaded(true);
  });
};

export const LoadPaginatedData = (
  configuration,
  setIssues,
  setLoaded,
  filtering
) => {
  GlobalConfiguration();

  axios
    .get("/Issues/data", {
      params: {
        orderBy: configuration.Column,
        ascending: configuration.Ascending,
        page: configuration.PageNumber,
        size: configuration.PageSize,
        hideClosed: !filtering.hideClosed,
        showCreatedByUser: filtering.showCreatedByUser,
        showIssuesWhereUserIsResponsible:
          filtering.showIssuesWhereUserIsResponsible,
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
  GlobalConfiguration();
  axios.post("/Issues/", newIssueData).then(() => {
    setCompleted(true);
  });
};

export default LoadData;
