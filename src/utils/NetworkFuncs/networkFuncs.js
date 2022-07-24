import { notification } from "../alerts";

const requestTryCatcher = async (reqFunc) => {
  try {
    return await reqFunc();
  } catch (error) {
    console.error(error.message);
    notification({ type: "error", value: error.message });
    return null;
  }
};

export { requestTryCatcher };
