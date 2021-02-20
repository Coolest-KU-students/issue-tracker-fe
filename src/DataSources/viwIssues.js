
import axios from "axios";
import GlobalConfiguration from './GlobalConfiguration';


const LoadData = (configuration, setIssues, setLoaded) => {
    GlobalConfiguration();
    axios.get("/Issues/").then((response) => {
        setIssues({...configuration,
                    Total: response.data.length,
                    Issues:   response.data
                      });
        setLoaded(true);
      });
    };

export default LoadData;
