import TextInput from "../../container/TextInput/TextInput";

const InputsSection = (props) => {
  const {
    inputValues: { inputValues, setInputValues },
    inputDatas,
    groupedNameInputs,
  } = props;

  return (
    <section className="inputs-section">
      <fieldset className="name-lastName-container">
        {groupedNameInputs}
      </fieldset>
      {inputDatas.map(
        ({
          id,
          inputPropertyName,
          attributes,
          placeholderText,
          inFullnameGroup,
        }) => {
          if (inFullnameGroup) {
            groupedNameInputs.push(
              <TextInput
                key={id}
                {...attributes}
                autoComplete="off"
                inputPropertyName={inputPropertyName}
                inputValues={{ inputValues, setInputValues }}
              >
                {placeholderText}
              </TextInput>
            );
            return "";
          }
          return (
            <TextInput
              key={id}
              {...attributes}
              autoComplete="off"
              inputPropertyName={inputPropertyName}
              inputValues={{ inputValues, setInputValues }}
            >
              {placeholderText}
            </TextInput>
          );
        }
      )}
    </section>
  );
};

export default InputsSection;
