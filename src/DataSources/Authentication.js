import axios from "axios";
import GlobalConfiguration, {
  StoreJWTToken,
  GetJWTToken,
} from "./GlobalConfiguration";

const Authenticate = (credentials, setAuthenticated) => {
  GlobalConfiguration();
  axios.post("/login", credentials).then((response) => {
    StoreJWTToken(response.data.token);
    setAuthenticated(true);
  });
};

export const CheckJWTIsValid = () => {
  GlobalConfiguration();
  GetJWTToken() &&
    axios.get("/auth").then((response) => {
      return response.Valid
        ? () => {
            StoreJWTToken(response.data.token);
            return true;
          }
        : false;
    });
};

export default Authenticate;
