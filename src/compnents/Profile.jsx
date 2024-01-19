import axios from "axios";
import { useState, useEffect } from "react";

const token = localStorage.getItem("token");

function Profile({ selectedTitle }) {
  const [user, setUser] = useState("");
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `https://unity-backend-475p.onrender.com/users?settings=${selectedTitle}&token=${token}`
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      {user &&
        user?.map((user) => (
          <div className="dash-content-wrapper" key={user._id}>
            <div className="profile">
              <div className="profile-card-cont">
                <div className="card-personal">
                  <h2>{`${user.firstName} ${user.lastName}`}</h2>
                  <h3>{user.headline}</h3>
                  <p>{user.bio}</p>
                </div>
                <div className="card-work">
                  <h3>
                    Working at:
                    <span>{user.employer}</span>
                  </h3>
                  <h3>
                    Working in:
                    <span> {user.companyType}</span>
                  </h3>
                </div>
              </div>
              <div className="profile-summary-cont"></div>
            </div>
          </div>
        ))}
    </>
  );
}
export default Profile;
