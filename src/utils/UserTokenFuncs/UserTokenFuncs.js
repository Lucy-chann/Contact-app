import { postNewUser } from "../../services/userServices";
import { requestTryCatcher } from "../NetworkFuncs/networkFuncs";

const createUserToken = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

const getUserByToken = async (fetchUserFunc) => {
  const userTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const userToken = localStorage.getItem("user-token");
      if (userToken) {
        fetchUserFunc();
        resolve(userToken);
      } else {
        const newUserToken = createUserToken(10);

        localStorage.setItem("user-token", newUserToken);

        requestTryCatcher(() => postNewUser(newUserToken));

        resolve(newUserToken);
      }
    } catch (err) {
      reject(err);
    }
  });

  const res = userTokenPromise.then(
    (val) => {
      return { done: true, userToken: val };
    },
    (err) => {
      console.error(err);
      return { done: false, error: err };
    }
  );

  return res;
};

export { getUserByToken, createUserToken };
