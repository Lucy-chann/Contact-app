import styles from "./contact.module.css";
import { CgProfile } from "react-icons/cg";
import { notification } from "../../utils/alerts";

const Contact = ({ contactData }) => {
  const {
    contactData: { name, lastName, number, profileImage, status },
  } = contactData;

  const copyToClipboard = (...values) => {
    const givenValues = values.filter((val) => val);

    const text = givenValues.join(" ");

    navigator.clipboard.writeText(text || "Empty");

    notification({ type: "success", value: "Text Copied" });
  };

  return (
    <div id={styles.contactContainer}>
      <div
        style={
          profileImage
            ? {
                background: "linear-gradient(160deg, dodgerblue, violet)",
              }
            : {}
        }
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="contact profile picrure"
            className={styles.profileImage}
            draggable="false"
            loading="lazy"
          />
        ) : (
          <CgProfile className={styles.profileIcon} />
        )}
      </div>
      <div onClick={() => copyToClipboard(name, lastName)}>
        {name || lastName ? (
          <p className={`${styles.contactInfoText}`}>{`${name ?? ""} ${
            lastName ?? ""
          }`}</p>
        ) : (
          <p className={styles.contactInfoText}>Empty</p>
        )}
        <span className={styles.columnTitle}>Fullname</span>
      </div>
      <div onClick={() => copyToClipboard(number)}>
        {number ? (
          <p className={`${styles.number} ${styles.contactInfoText}`}>
            {number}
          </p>
        ) : (
          <p className={styles.contactInfoText}>Empty</p>
        )}
        <span className={styles.columnTitle}>Phone Number</span>
      </div>
    </div>
  );
};

export default Contact;
