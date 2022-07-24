import { CgProfile } from "react-icons/cg";

const ProfileImageSection = (props) => {
  const {
    imageURLState: { imageURL, setImageURL },
    imageSelectHandler,
  } = props;

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
          />
        </button>
        <button
          type="button"
          onClick={() => setImageURL("")}
          className="btn-reset-pfp"
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default ProfileImageSection;
