import InputsSection from "../InputsSection/InputsSection";
import ProfileImageSection from "../../components/ProfileImageSection/ProfileImageSection";

const AddContactForm = ({
  inputDatas,
  inputValuesState: { inputValues, setInputValues },
  profileImage: imageURL,
  resetImage,
  addContactHandler,
  imageSelectHandler,
  groupedNameInputs,
}) => {
  return (
    <form id="add-contact-form" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="form-inputs-container">
        <InputsSection
          inputValues={{ inputValues, setInputValues }}
          inputDatas={inputDatas}
          groupedNameInputs={groupedNameInputs}
        />
        <ProfileImageSection
          imageURL={imageURL}
          resetImage={resetImage}
          imageSelectHandler={imageSelectHandler}
        />
      </fieldset>
      <input
        type="submit"
        id="submit-btn"
        name="submit-contact"
        value="Add Contact"
        onClick={addContactHandler}
      />
    </form>
  );
};

export default AddContactForm;
