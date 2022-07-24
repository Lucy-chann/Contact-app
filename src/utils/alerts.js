import toast from "react-hot-toast";

function notification({ type, value, ...rest }) {
  toast(value, {
    type: type,
    position: "top-right",
    ariaProps: {
      role: "alert",
    },
    rest,
  });
}

export { notification };
