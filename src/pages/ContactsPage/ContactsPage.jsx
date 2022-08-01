import { useState } from "react";
import {
  useStateContexts,
  useUserContext,
  useNavbarListItemIndexContext,
} from "../../providers/ContactsContext";
import { extraButtonDatas } from "../../utils/ElementDatas/ElementDatas";
import Button from "../../components/button/Button";
import Contact from "../../container/Contact/Contact";
import pageNavActiver from "../../utils/pageNavActiver/pageNavActiver";

const ContactsPage = () => {
  const [btnOpened, setBtnOpened] = useState(false);

  const { windowWidth } = useStateContexts();

  const { contacts } = useUserContext();

  const { changePage } = useNavbarListItemIndexContext();

  const btnOpenHandler = () => {
    setBtnOpened(!btnOpened);
  };

  const extraBtnClassNameHandler = (id) => {
    return `extra-btn-${id}-opened-${
      windowWidth > 510 ? "horizontal" : "vertical"
    } show-extra-btns`;
  };

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
          <div className="extra-options-container">
            {extraButtonDatas.map(({ id, Icon, style, handler }) => (
              <Button
                key={id}
                style={style}
                className={btnOpened ? extraBtnClassNameHandler(id) : ""}
                onClick={() => handler(changePage)}
              >
                <Icon />
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default pageNavActiver(ContactsPage, "/contacts");
