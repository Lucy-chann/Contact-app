import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../providers/ContactsContext";
import { extraButtonDatas } from "../../utils/ElementDatas/ElementDatas";
import Button from "../../components/button/Button";
import Contact from "../../container/Contact/Contact";

const windowWidth = window.innerWidth;

const ContactsPage = (props) => {
  const [btnOpened, setBtnOpened] = useState(false);

  const { contacts } = useUserContext();

  const btnOpenHandler = () => {
    setBtnOpened(!btnOpened);
  };

  const extraBtnsContainer = useRef();

  useEffect(() => {
    if (btnOpened) {
      Object.values(extraBtnsContainer.current.children).forEach(
        (childElement, index) => {
          childElement.className = "show-extra-btns";
          if (windowWidth > 660) {
            childElement.style.right = `${extraButtonDatas[index].position}rem`;
          } else {
            childElement.style.top = `-${
              extraButtonDatas[index].position - 4.4
            }rem`;
          }
        }
      );
    } else {
      Object.values(extraBtnsContainer.current.children).forEach(
        (childElement) => {
          childElement.className = "";
          childElement.style = null;
        }
      );
    }
  }, [btnOpened]);

  return (
    <>
      <main id="main-view">
        {contacts.map((contactData, index) => (
          <Contact key={index} contactData={contactData} />
        ))}
      </main>
      <footer id="view-footer">
        <div className="options-container">
          <Button onClick={btnOpenHandler} className="options-opener-btn">
            <span className={btnOpened ? "btnOpened" : ""}></span>
          </Button>
          <div className="extra-options-container" ref={extraBtnsContainer}>
            {extraButtonDatas.map(({ id, Icon, handler }) => (
              <Button key={id} onClick={() => handler(props.history.push)}>
                <Icon />
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactsPage;
