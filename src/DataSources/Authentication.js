
import axios from "axios";
import Notification, { ClearAllNotifications} from "../GlobalFeatures/Notification";
import GlobalConfiguration, {
  StoreJWTToken,
  GetJWTToken,
} from "./GlobalConfiguration";

const Authenticate = (credentials, setAuthenticated) => {
  GlobalConfiguration();
  axios.post("/login", credentials).then((response) => {
    StoreJWTToken(response.data.token);
    setAuthenticated(true);
    setTimeout(() =>{ClearAllNotifications()}, 300);
  }).catch((error) => {
    if(error.response){
      ClearAllNotifications();
      Notification(error.response.data.error, error.response.data.message, "danger");
    }
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
      setAuthenticated(true);
      return;
    }).catch(() => {
      setAuthenticated(false);})
    ;}
  else setAuthenticated(false);
};

export default Authenticate;
