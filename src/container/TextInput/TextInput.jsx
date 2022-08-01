import { useState, useEffect } from "react";
import inputStyles from "./textInput.module.css";

const TextInput = (props) => {
  const [value, setValue] = useState("");

  const {
    inputType,
    inputName,
    inputPropertyName,
    inputValues: { inputValues, setInputValues },
    children,
    ...rest
  } = props;

  const inputTypeHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setInputValues({ ...inputValues, [inputPropertyName]: value });
  }, [value]);

  return (
    <label className={inputStyles.inputContainer}>
      <input
        type={inputType}
        className={`${inputStyles.input} ${value && inputStyles.inputFilled}`}
        name={inputName}
        onChange={inputTypeHandler}
        {...rest}
      ></input>
      <span
        className={`${inputStyles.inputPlaceholderText} ${
          value && inputStyles.inputPlaceholderFilled
        }`}
      >
        {children}
      </span>
    </label>
  );
};

export default TextInput;
