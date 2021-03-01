import axios from "axios";
import GlobalConfiguration, {
  StoreJWTToken,
  GetJWTToken,
} from "./GlobalConfiguration";

const Authenticate = (credentials, setAuthenticated) => {
  GlobalConfiguration();
  axios.post("/auth/", credentials).then((response) => {
    StoreJWTToken(response.jwt);
    setAuthenticated(true);
  });
};

export const CheckJWTIsValid = () => {
  GlobalConfiguration();
  GetJWTToken() &&
    axios.get("/auth/").then((response) => {
      return response.Valid
        ? () => {
            StoreJWTToken(response.jwt);
            return true;
          }
        : false;
    });
};

export default Authenticate;
