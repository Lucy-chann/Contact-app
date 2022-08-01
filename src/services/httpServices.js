import axios from "axios";

axios.defaults.baseURL = "https://contact-app-hosting.herokuapp.com";

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};

export default http;
