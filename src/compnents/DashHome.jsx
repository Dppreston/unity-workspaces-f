import { useEffect, useState } from "react";
import axios from "axios";
import Dashboardtile from "./Dashboardtile";
import WelcomeDashboardTile from "./WelcomeDashboardTile";

const token = localStorage.getItem("token");

function DashHome({ selectedTitle, welcomeUsername }) {
  const [userData, setUserData] = useState("");

  //Fetch User

  const fetchUserDashboard = async () => {
    try {
      const res = await axios.get(
        `https://unity-backend-475p.onrender.com/users?home=${selectedTitle}&token=${token}`
      );
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDashboard();
  }, []);

  return (
    <>
      <div className="dash-content-wrapper">
        <div className="home-top-cont">
          <h1>
            Welcome, <span>{userData && userData[0].firstName}</span>
          </h1>
        </div>
        <div className="summary-cont">
          <div className="summary-cont-upper">
            <WelcomeDashboardTile />
          </div>
          <div className="summary-cont-lower">
            <Dashboardtile
              tileTitle={userData && `Upcoming ${Object.keys(userData[0])[11]}`}
              tileData={userData && userData[0].appointments}
            />
            <Dashboardtile
              tileTitle={userData && Object.keys(userData[0])[10]}
              tileData={userData && userData[0].notes}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default DashHome;
