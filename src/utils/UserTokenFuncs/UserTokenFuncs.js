import { postNewUser } from "../../services/userServices";
import { requestTryCatcher } from "../NetworkFuncs/networkFuncs";

const createUserToken = (len) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

const getUserToken = async () => {
  const userTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const userToken = localStorage.getItem("user-token");
      if (userToken) {
        /* --- on developement --- */
      } else {
        const newUserToken = createUserToken(10);
        localStorage.setItem("user-token", newUserToken);
        await requestTryCatcher(() => postNewUser(newUserToken));
      }
      resolve(userToken);
    } catch (err) {
      reject(err);
    }
  });

  const res = await userTokenPromise.then(
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

export { getUserToken, createUserToken };
