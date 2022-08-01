import styles from "./button.module.css";

const Button = ({ children, ...rest }) => {
  return (
    <button id={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
