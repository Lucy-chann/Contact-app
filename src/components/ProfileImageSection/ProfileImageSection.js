import { useRef } from "react";
import { CgProfile } from "react-icons/cg";

const ProfileImageSection = (props) => {
  const { imageURL, imageSelectHandler, resetImage } = props;

  const imageInputRef = useRef();

  const resetImageHandler = () => {
    imageInputRef.current.value = null;
    resetImage();
  };

  return (
    <section className="profile-image-section">
      <div className="pfp-container">
        {imageURL ? (
          <div className="pfp-img-container">
            <img
              src={imageURL}
              alt="contact_profile_picture"
              id="contact-picture"
              draggable="false"
            />
          </div>
        ) : (
          <CgProfile style={{ color: "#111" }} />
        )}
      </div>
      <div className="pfp-buttons-container">
        <button className="change-pfp-btn">
          <input
            type="file"
            id="profile-picture-input"
            onChange={imageSelectHandler}
            name="profile-picture"
            accept=".jpg,.png"
            ref={imageInputRef}
          />
        </button>
        <button
          type="button"
          onClick={resetImageHandler}
          className="btn-reset-pfp"
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default ProfileImageSection;
