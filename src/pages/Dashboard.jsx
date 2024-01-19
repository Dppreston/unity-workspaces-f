import { useEffect, useState } from "react";
import axios from "axios";
import DashAppoint from "../compnents/DashAppoint";
import DashHome from "../compnents/DashHome";
import DashNav from "../compnents/DashNav";
import DashNotes from "../compnents/DashNotes";
import Profile from "../compnents/Profile";
import Settings from "../compnents/Settings";
import Logout from "../compnents/Logout";
import Customers from "../compnents/Customers";

const dashKey = [
  "home",
  "notes",
  "appointments",
  "customers",
  "projections",
  "profile",
  "settings",
  "logout",
];

// GLOBAL login check

const token = localStorage.getItem("token");

const loginCheck = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location = "/";
  } else {
    return;
  }
};

function Dashboard() {
  const [selectedTitle, setSelectedTitle] = useState("");

  const childTitle = (title) => {
    setSelectedTitle(title);
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <>
      <div className="dash-wrapper">
        <DashNav childTitle={childTitle} />
        <div className="dash-content-cont">
          <div className="dash-top-cont">
            <h3 className="dash-content-title">
              {!selectedTitle ? "home" : selectedTitle}
            </h3>
            <div className="spacing-line"></div>
          </div>
          {selectedTitle === "" && <DashHome selectedTitle={"home"} />}
          {selectedTitle === dashKey[0] && (
            <DashHome selectedTitle={selectedTitle} />
          )}
          {selectedTitle === dashKey[1] && (
            <DashNotes selectedTitle={selectedTitle} />
          )}
          {selectedTitle === dashKey[2] && (
            <DashAppoint selectedTitle={selectedTitle} />
          )}
          {selectedTitle === dashKey[3] && (
            <Customers selectedTitle={selectedTitle} />
          )}
          {selectedTitle === dashKey[5] && (
            <Profile selectedTitle={selectedTitle} />
          )}
          {selectedTitle === dashKey[6] && (
            <Settings selectedTitle={selectedTitle} />
          )}
          {selectedTitle === dashKey[7] && <Logout />}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
