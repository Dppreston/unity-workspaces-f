import { useEffect, useState } from "react";
import axios from "axios";
import SubPageNav from "./SubPageNav";
import Personal from "../settings/Personal";
import Account from "../settings/Account";
import Profile from "../settings/Profile";
import Employment from "../settings/Employment";

const subNavContent = [
  {
    id: 1,
    title: "personal",
  },
  {
    id: 2,
    title: "account",
  },
  {
    id: 3,
    title: "profile",
  },
  {
    id: 4,
    title: "employment",
  },
];

const navKeys = ["personal", "account", "profile", "employment"];

function Settings({ selectedTitle }) {
  const [currentAccount, setCurrentAccount] = useState("");
  const [navTitle, setNavTitle] = useState("personal");
  const token = localStorage.getItem("token");

  //recieving selected title from nav

  const childNav = (title) => {
    setNavTitle(title);
  };

  //FETCH user settings

  const fetchUserSettings = async () => {
    try {
      const res = await axios.get(
        `https://unity-backend-475p.onrender.com/users?settings=${selectedTitle}&token=${token}`
      );
      setCurrentAccount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  return (
    <>
      <div className="dash-content-wrapper settings">
        <SubPageNav
          subNavContent={subNavContent}
          childNav={childNav}
          navTitle={navTitle}
        />
        {navTitle === "" && <Personal />}
        {navTitle === navKeys[0] && (
          <Personal
            currentAccount={currentAccount}
            fetchUserSettings={fetchUserSettings}
          />
        )}
        {navTitle === navKeys[1] && (
          <Account
            currentAccount={currentAccount}
            fetchUserSettings={fetchUserSettings}
          />
        )}
        {navTitle === navKeys[2] && (
          <Profile
            currentAccount={currentAccount}
            fetchUserSettings={fetchUserSettings}
          />
        )}
        {navTitle === navKeys[3] && (
          <Employment
            currentAccount={currentAccount}
            fetchUserSettings={fetchUserSettings}
          />
        )}
      </div>
    </>
  );
}
export default Settings;
