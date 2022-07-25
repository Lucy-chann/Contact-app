import axios from "axios";

axios.defaults.baseURL = "https://contact-app-hosting.herokuapp.com";

/* --- jsonbin header settings --- */

// axios.defaults.headers.common["X-Collection-Name"] = "Contact-app-api";

// axios.defaults.headers.common["X-Master-Key"] =
//   "$2b$10$hK2J/3MhkTqy2VtYmwhUbep0skzfx1yZFm0KRNku4TLbQ1.Ei.5H.";

/* --- using axios instance --- */

// const instance = axios.create({
//   baseURL: "http://127.0.0.1:3000",
//   headers: {
//     "Content-Type": "application/json",
//     "X-Master-Key":
//       "$2b$10$hK2J/3MhkTqy2VtYmwhUbep0skzfx1yZFm0KRNku4TLbQ1.Ei.5H.",
//   },
// });

// instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};

export default http;
