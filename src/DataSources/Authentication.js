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

export const CleanJWTToken = () =>{
  StoreJWTToken("RANDOM STRING BLAH BLAH BLAH");
}

export const CheckJWTIsValid = (setAuthenticated) => {
  GlobalConfiguration();

  if(GetJWTToken()) {
    axios.get("/auth").then((response) => {
      StoreJWTToken(response.data.token);
      console.log(response.data.token);
      setAuthenticated(true);
      return;
    });
    setAuthenticated(false);}
  else setAuthenticated(false);
};

export default Authenticate;
