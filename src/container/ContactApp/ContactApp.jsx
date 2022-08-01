import { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import ContactsContextComp from "../../providers/ContactsContext";
import "./contactApp.css";
import ContactAppContents from "./ContactAppContents/ContactAppContents";

import { Toaster } from "react-hot-toast";

function ContactApp() {
  const pageDimmer = useRef();

  return (
    <BrowserRouter>
      <ContactsContextComp>
        <ContactAppContents pageDimmer={pageDimmer} />
        <div className="dimmer" ref={pageDimmer}></div>
        <Toaster position="top-right" />
      </ContactsContextComp>
    </BrowserRouter>
  );
}

export default ContactApp;
