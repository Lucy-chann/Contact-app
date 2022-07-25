import toast from "react-hot-toast";

function notification({ type, value, ...rest }) {
  toast(<b>{value}</b>, {
    type: type,
    ariaProps: {
      role: "alert",
    },
    rest,
  });
}

export { notification };
