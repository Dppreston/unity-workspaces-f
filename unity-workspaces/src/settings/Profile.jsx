import { useEffect, useState, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

function Profile({ currentAccount, fetchUserSettings }) {
  const [headline, setHeadline] = useState(
    !currentAccount ? "" : currentAccount[0].headline
  );
  const [bio, setBio] = useState(!currentAccount ? "" : currentAccount[0].bio);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const saveRef = useRef(null);

  //PUT Bio Settings
  const updateBioSettings = async () => {
    const updateBioData = {
      updateHeadline: headline,
      updateBio: bio,
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/users?profileSave=true&profileId=${token}`,
        updateBioData
      );
      setSuccess(<p className="success setting-updated">{res.data}</p>);
      fetchUserSettings();
      setBio("");
      setHeadline("");
      setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 1500);
    } catch (err) {
      setErr(<p className="error">Something Went Wrong. Please Try Again.</p>);
    }
  };
  //Handle Save Bio Settings
  const handleProfileSave = (e) => {
    e.preventDefault();
    updateBioSettings();
  };
  //Input Check
  const inputCheck = () => {
    if (headline.length >= 0 || bio.length >= 0) {
      saveRef.current.classList.remove("inactive");
    } else {
      saveRef.current.classList.add("inactive");
    }
  };

  return (
    <>
      {success || err}

      {currentAccount?.map((account) => (
        <div className="profile-settings settings-style" key={account._id}>
          <h2>Profile</h2>
          <label htmlFor="headline" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Headline:</p>
              <span>{account.headline}</span>
            </div>
            <label htmlFor="change-headline" className="settings-label-style">
              Change Headline:
              <input
                type="text"
                className="settings-input-style"
                placeholder="Headline for your profile"
                value={headline}
                onChange={(e) => {
                  setHeadline(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <label htmlFor="password" className="settings-label-style">
            <div className="current-setting-wrapper-bio">
              <p>Bio:</p>
              <span>{account.bio}</span>
            </div>
            <label htmlFor="change-headline" className="settings-label-style">
              Change Bio:
              <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="10"
                className="settings-input-style"
                placeholder="Tell us a litte about yourself..."
                value={bio}
                onChange={(e) => {
                  setBio(e.currentTarget.value);
                  inputCheck();
                }}
              ></textarea>
            </label>
          </label>
          <button
            className="save btn-style inactive"
            onClick={handleProfileSave}
            ref={saveRef}
          >
            Save
          </button>
        </div>
      ))}
    </>
  );
}
export default Profile;
