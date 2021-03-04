import axios from "axios";

const GlobalConfiguration = () => {
  axios.defaults.baseURL = "http://localhost:8080/api/";
  axios.defaults.headers.common["Authorization"] = "Bearer " + GetJWTToken();
};

export const StoreJWTToken = (Token) => {
  console.log(Token);
  localStorage.setItem("authToken", Token);
};

export const GetJWTToken = () => {
  return localStorage.getItem("authToken");
};

export default GlobalConfiguration;
