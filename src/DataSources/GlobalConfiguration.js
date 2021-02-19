




import axios from "axios";

 const GlobalConfiguration =() => {
    axios.defaults.baseURL = "http://localhost:8080/api/";
    return{Header: {},
     }
}

export default GlobalConfiguration;