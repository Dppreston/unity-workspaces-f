import { useState, useEffect, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

function Personal({ currentAccount, fetchUserSettings }) {
  const [firstName, setFirstName] = useState(
    !currentAccount ? "" : currentAccount[0].firstName
  );
  const [lastName, setLastName] = useState(
    !currentAccount ? "" : currentAccount[0].lastName
  );
  const [birthdate, setBirthdate] = useState(
    !currentAccount ? "" : currentAccount[0].birthday
  );
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const saveRef = useRef(null);

  //PUT update personal settings

  const postUpdatePersonal = async () => {
    const personalUpdate = {
      updateFirstName: firstName,
      updateLastName: lastName,
      updateBirthday: birthdate,
    };

    try {
      const res = await axios.put(
        `https://unity-backend-475p.onrender.com/users?personalSave=true&personalId=${token}`,
        personalUpdate
      );
      setSuccess(<p className="success setting-updated">{res.data}</p>);

      setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 1500);
      fetchUserSettings();
      setFirstName("");
      setBirthdate("");
      setLastName("");
      saveRef.current.classList.add("inactive");
    } catch (err) {
      setErr(<p className="error">Something Went Wrong. Please Try Again.</p>);
      console.log(err);
    }
  };

  //Change save setting handler

  const handlePersonalSave = (e) => {
    e.preventDefault();
    postUpdatePersonal();
  };

  //Change Input Check

  const inputCheck = () => {
    if (
      firstName.length >= 0 ||
      lastName.length >= 0 ||
      birthdate.length >= 0
    ) {
      saveRef.current.classList.remove("inactive");
    } else {
      saveRef.current.classList.add("inactive");
    }
  };

  return (
    <>
      {success || err}
      {currentAccount &&
        currentAccount?.map((account) => (
          <div className="personal-settings settings-style" key={account._id}>
            <h2>Personal</h2>
            <label htmlFor="first-name" className="settings-label-style">
              <div className="current-setting-wrapper">
                <p>First Name:</p>
                <span> {account.firstName}</span>
              </div>
              <label htmlFor="enter-name" className="settings-label-style">
                Enter First Name:
                <input
                  type="text"
                  className="settings-input-style"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.currentTarget.value);
                    inputCheck();
                  }}
                />
              </label>
            </label>
            <label htmlFor="last-name" className="settings-label-style">
              <div className="current-setting-wrapper">
                <p>Last Name:</p>
                <span>{account.lastName}</span>
              </div>
              <label htmlFor="enter-last-name" className="settings-label-style">
                Enter Last Name:
                <input
                  type="text"
                  className="settings-input-style"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.currentTarget.value);
                    inputCheck();
                  }}
                />
              </label>
            </label>
            <label htmlFor="dob" className="settings-label-style">
              <div className="current-setting-wrapper">
                <p>Birthdate:</p>
                <span>{`${account.birthday[5]}${account.birthday[6]} / ${account.birthday[8]}${account.birthday[9]} / ${account.birthday[0]}${account.birthday[1]}${account.birthday[2]}${account.birthday[3]}`}</span>
              </div>
              <label htmlFor="enter-last-name" className="settings-label-style">
                Enter Birthdate:
                <input
                  type="date"
                  className="settings-input-style"
                  value={birthdate}
                  onChange={(e) => {
                    setBirthdate(e.currentTarget.value);
                    inputCheck();
                  }}
                />
              </label>
            </label>
            <button
              className="save btn-style inactive"
              onClick={handlePersonalSave}
              ref={saveRef}
            >
              Save
            </button>
          </div>
        ))}
    </>
  );
}
export default Personal;
