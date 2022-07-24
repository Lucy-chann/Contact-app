import InputsSection from "../InputsSection/InputsSection";
import ProfileImageSection from "../../components/ProfileImageSection/ProfileImageSection";

const AddContactForm = (props) => {
  const {
    inputDatas,
    inputValuesState: { inputValues, setInputValues },
    profileImageState: { imageURL, setImageURL },
    addContactHandler,
    imageSelectHandler,
    groupedNameInputs,
  } = props;

  return (
    <form id="add-contact-form">
      <fieldset className="form-inputs-container">
        <InputsSection
          inputValues={{ inputValues, setInputValues }}
          inputDatas={inputDatas}
          groupedNameInputs={groupedNameInputs}
        />
        <ProfileImageSection
          imageURLState={{ imageURL, setImageURL }}
          imageSelectHandler={imageSelectHandler}
        />
      </fieldset>
      <input
        type="submit"
        id="submit-btn"
        name="submit-contact"
        value="Add Contact"
        onClick={(e) => {
          e.preventDefault();
          addContactHandler();
        }}
      />
    </form>
  );
};

export default AddContactForm;
