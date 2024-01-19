import { useState, useEffect, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

function Account({ currentAccount, fetchUserSettings }) {
  const [username, setUsername] = useState(
    !currentAccount ? "" : currentAccount[0].userName
  );
  const [email, setEmail] = useState(
    !currentAccount ? "" : currentAccount[0].email
  );
  const [password, setPassword] = useState(
    !currentAccount ? "" : currentAccount[0].password
  );
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const saveRef = useRef("null");

  //PUT Account Settings

  const updateAccountSettings = async () => {
    const accountUpdateData = {
      updateUsername: username,
      updateEmail: email,
      updatePassword: password,
    };

    try {
      const res = await axios.put(
        `https://unity-backend-475p.onrender.com/users?accountSave=true&accountId=${token}`,
        accountUpdateData
      );
      setSuccess(<p className="success setting-updated">{res.data}</p>);
      fetchUserSettings();
      setPassword("");
      setEmail("");
      setUsername("");
      setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 1500);
    } catch (err) {
      setErr(<p className="error">There was a problem. Please Try Again.</p>);
    }
  };

  //Save Account Setting Handler

  const handleAccountSave = (e) => {
    e.preventDefault();
    updateAccountSettings();
  };

  //input check

  const inputCheck = () => {
    if (username.length >= 0 || email.length >= 0 || password.length >= 0) {
      saveRef.current.classList.remove("inactive");
    } else {
      saveRef.current.classList.add("inactive");
    }
  };

  return (
    <>
      {success || err}
      {currentAccount?.map((setting) => (
        <div className="acc-settings settings-style" key={setting._id}>
          <h2>Account</h2>
          <label htmlFor="username" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Current Username: </p>
              <span>{setting.userName}</span>
            </div>
            <label htmlFor="change-username" className="settings-label-style">
              Change Username:
              <input
                type="text"
                className="settings-input-style"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <label htmlFor="email" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Current Email:</p> <span>{setting.email}</span>
            </div>
            <label htmlFor="change-email" className="settings-label-style">
              Change Email:
              <input
                type="email"
                className="settings-input-style"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <label htmlFor="password" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Current Password:</p> <span>{setting.password}</span>
            </div>
            <label htmlFor="change-password" className="settings-label-style">
              Change password:
              <input
                type="password"
                className="settings-input-style"
                placeholder="*******"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <button
            className="save btn-style inactive"
            ref={saveRef}
            onClick={handleAccountSave}
          >
            Save
          </button>
        </div>
      ))}
    </>
  );
}
export default Account;
