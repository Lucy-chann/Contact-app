import "./contactApp.css";
import { BrowserRouter } from "react-router-dom";
import ContactsContextComp from "../../providers/ContactsContext";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navbar from "../../components/Navbar/Navbar";
import ViewSection from "../ViewSection/ViewSection";
import { Toaster } from "react-hot-toast";

function ContactApp() {
  return (
    <BrowserRouter>
      <ContactsContextComp>
        <div id="contact-app">
          <MobileMenu />
          <Navbar />
          <ViewSection />
        </div>
        <Toaster position="top-right" />
      </ContactsContextComp>
    </BrowserRouter>
  );
}

export default ContactApp;
