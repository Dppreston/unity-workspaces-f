import { useState, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

function Employment({ currentAccount, fetchUserSettings }) {
  const [employer, setEmployer] = useState(
    !currentAccount ? "" : currentAccount[0].employer
  );
  const [employerPhone, setEmployerPhone] = useState(
    !currentAccount ? "" : currentAccount[0].employerPhone
  );
  const [employerType, setEmployerType] = useState(
    !currentAccount ? "" : currentAccount[0].companyType
  );
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const saveRef = useRef("");

  //PUT employer settings update

  const updateEmployerSettings = async () => {
    const employmentSettingData = {
      updateEmployer: employer,
      updateEmployerPhone: employerPhone,
      updateEmployerType: employerType,
    };

    try {
      const res = await axios.put(
        `https://unity-backend-475p.onrender.com/users?employerSave=true&employerId=${token}`,
        employmentSettingData
      );
      setSuccess(<p className="success setting-updated">{res.data}</p>);
      fetchUserSettings();
      setEmployer("");
      setEmployerPhone("");
      setEmployerType("");
      setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 1500);
    } catch (err) {
      setErr(
        <p className="error setting-updated">
          Something Went Wrong. Please Try Again
        </p>
      );
    }
  };

  //employer settings save handler

  const handleEmployerSave = (e) => {
    e.preventDefault();
    updateEmployerSettings();
  };

  //save input check
  const inputCheck = () => {
    if (
      employer.length >= 0 ||
      employerPhone.length >= 0 ||
      employerType.length >= 0
    ) {
      saveRef.current.classList.remove("inactive");
    } else {
      saveRef.current.classList.add("inactive");
    }
  };

  return (
    <>
      {success || err}
      {currentAccount?.map((account) => (
        <div className="employment-settings settings-style" key={account._id}>
          <h2>Employment</h2>
          <label htmlFor="employer" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Employer:</p>
              <span>{account.employer}</span>
            </div>
            <label htmlFor="change-employer" className="settings-label-style">
              Change Employer:
              <input
                type="text"
                className="settings-input-style"
                placeholder="Employer"
                value={employer}
                onChange={(e) => {
                  setEmployer(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <label htmlFor="employer-phone" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Phone Number:</p>
              <span>{account.employerPhone}</span>
            </div>
            <label
              htmlFor="change-company-phone"
              className="settings-label-style"
            >
              Change Company Phone:
              <input
                type="tel"
                className="settings-input-style"
                placeholder="(xxx)-xxx-xxxx"
                value={employerPhone}
                onChange={(e) => {
                  setEmployerPhone(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <label htmlFor="company-type" className="settings-label-style">
            <div className="current-setting-wrapper">
              <p>Type Of Company:</p>
              <span>{account.companyType}</span>
            </div>
            <label
              htmlFor="change-company-type"
              className="settings-label-style"
            >
              Change Company Type:
              <input
                type="text"
                className="settings-input-style"
                placeholder="Type of company you work for"
                value={employerType}
                onChange={(e) => {
                  setEmployerType(e.currentTarget.value);
                  inputCheck();
                }}
              />
            </label>
          </label>
          <button
            className="save btn-style inactive"
            ref={saveRef}
            onClick={handleEmployerSave}
          >
            Save
          </button>
        </div>
      ))}
    </>
  );
}
export default Employment;
