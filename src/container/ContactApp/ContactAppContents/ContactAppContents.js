import { useStateContexts } from "../../../providers/ContactsContext";
import MobileMenu from "../../MobileMenu/MobileMenu";
import Navbar from "../../../components/Navbar/Navbar";
import ViewSection from "../../ViewSection/ViewSection";

const ContactAppContents = ({ pageDimmer }) => {
  const { windowWidth } = useStateContexts();

  return (
    <div id="contact-app">
      {windowWidth < 470 && <MobileMenu />}
      <Navbar />
      <ViewSection pageDimmer={pageDimmer.current} />
    </div>
  );
};

export default ContactAppContents;
