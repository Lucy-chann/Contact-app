import http from "./httpServices";

const localUserToken = localStorage.getItem("user-token");

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

/* user services */

function httpGetAllUsers() {
  return http.get("/users");
}

function httpGetSpecificUser(url) {
  return http.get(`/users${url}`);
}

function httpPostUser(userData) {
  return http.post("/users", userData);
}

function httpGetUserByToken() {
  return http.get(`/users?userToken=${localUserToken}`);
}

function httpDeleteUser(userIndex) {
  return http.delete(`/users/${userIndex}`);
}

function httpUpdateUser() {}

function getUserApiRequest() {
  const response = httpGetUserByToken();
  return response;
}

function postNewUser(userToken) {
  const res = httpPostUser({
    id: null,
    userToken: userToken,
    profile: {},
    deviceType: getDeviceType(),
  });

  return res;
}

/* contact services */

function httpPostContact(contactData) {
  return http.post("/contacts", contactData);
}

function httpGetContacts() {
  return http.get("/contacts");
}

function httpGetUserContacts(token) {
  return http.get(`/contacts?token=${token}`);
}

function postNewContact(userToken, contactData) {
  const res = httpPostContact({
    id: null,
    token: userToken,
    contactData: contactData,
  });

  return res;
}

function httpUpdateContact() {}

export {
  getUserApiRequest,
  postNewUser,
  httpPostUser,
  httpGetContacts,
  httpGetUserContacts,
  postNewContact,
};
