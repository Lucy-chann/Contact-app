import { useEffect, useState } from "react";
import "./addContactPage.css";
import {
  useStateContexts,
  useNavbarListItemIndexContext,
} from "../../providers/ContactsContext";
import { postNewContact } from "../../services/userServices";
import toast from "react-hot-toast";
import { inputDatas } from "../../utils/ElementDatas/ElementDatas";
import AddContactForm from "../../components/AddContactForm/AddContactForm";
import { requestTryCatcher } from "../../utils/NetworkFuncs/networkFuncs";

const initialInputValues = {
  name: null,
  lastName: null,
  number: null,
  email: null,
  profileImage: null,
  address: null,
};

const AddContactPage = ({ pageDimmer }) => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [imageURL, setImageURL] = useState("");

  const { getAllUserContacts } = useStateContexts();

  const { changePage } = useNavbarListItemIndexContext();

  useEffect(() => {
    setInputValues({ ...inputValues, profileImage: imageURL });
  }, [imageURL]);

  const convertToBase64 = (file = "") => {
    return new Promise((resolve, reject) => {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const imageSelectHandler = async (e) => {
    const [file] = e.target.files;

    const base64Image = await convertToBase64(file);

    setImageURL(base64Image);
  };

  const resetImageHandler = () => {
    setImageURL("");
  };

  const dimmerStyle = pageDimmer ?? null;

  const addContactHandler = () => {
    dimmerStyle.style.visibility = "visible";
    dimmerStyle.style.opacity = 1;

    document.body.classList.add("prevent-on-load");

    requestTryCatcher(() => {
      const requestPromise = postNewContact(
        localStorage.getItem("user-token"),
        {
          ...inputValues,
          dateCreated: new Date().toLocaleString(),
        }
      )
        .then(() => {
          getAllUserContacts();
          setInputValues({});
          changePage("/contacts");
        })
        .finally(() => {
          dimmerStyle.style.visibility = "hidden";
          dimmerStyle.style.opacity = 0;
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
      <div className="form-title-container">
        <h1 id="add-contact-title">Add contact form</h1>
      </div>
      <div className="form-wrapper">
        <section className="form-section">
          <AddContactForm
            inputDatas={inputDatas}
            inputValuesState={{ inputValues, setInputValues }}
            profileImage={imageURL}
            resetImage={resetImageHandler}
            addContactHandler={addContactHandler}
            imageSelectHandler={imageSelectHandler}
            groupedNameInputs={groupedNameInputs}
          />
        </section>
      </div>
    </div>
  );
};

export default AddContactPage;
