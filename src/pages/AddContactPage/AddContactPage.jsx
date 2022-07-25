import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./addContactPage.css";
import { useStateContexts } from "../../providers/ContactsContext";
import { postNewContact } from "../../services/userServices";
import toast from "react-hot-toast";
import { inputDatas } from "../../utils/ElementDatas/ElementDatas";
import navbarActiveRemover from "../../utils/navbarActiveRemover/navbarActiveRemover";
import AddContactForm from "../../components/AddContactForm/AddContactForm";
import { requestTryCatcher } from "../../utils/NetworkFuncs/networkFuncs";

const AddContactPage = (props) => {
  const [inputValues, setInputValues] = useState({
    name: null,
    lastName: null,
    number: null,
    email: null,
    profileImage: null,
    address: null,
  });
  const [imageURL, setImageURL] = useState("");

  const { getAllUserContacts } = useStateContexts();

  useEffect(() => {
    setInputValues({ ...inputValues, profileImage: imageURL });
  }, [imageURL]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imageSelectHandler = async (e) => {
    const [file] = e.target.files;

    const base64Image = await convertToBase64(file);

    setImageURL(base64Image);
  };

  const addContactHandler = () => {
    requestTryCatcher(() => {
      const requestPromise = postNewContact(
        localStorage.getItem("user-token"),
        {
          ...inputValues,
          dateCreated: new Date().toLocaleString(),
        }
      ).then(() => {
        getAllUserContacts();
        setInputValues({});
        props.history.push("/contacts");
      });

      toast.promise(requestPromise, {
        loading: <b>Loading...</b>,
        success: <b>Contact Added</b>,
        error: <b>Fail</b>,
      });
    });
  };

  const groupedNameInputs = [];

  return (
    <div className="add-contact-container">
      <h1 id="add-contact-title">Add contact form</h1>
      <section className="form-section">
        <AddContactForm
          inputDatas={inputDatas}
          inputValuesState={{ inputValues, setInputValues }}
          profileImageState={{ imageURL, setImageURL }}
          addContactHandler={addContactHandler}
          imageSelectHandler={imageSelectHandler}
          groupedNameInputs={groupedNameInputs}
        />
      </section>
    </div>
  );
};

export default navbarActiveRemover(withRouter(AddContactPage), "/add-contact");
