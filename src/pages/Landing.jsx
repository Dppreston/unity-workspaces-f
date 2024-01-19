import Login from "../compnents/Login";
import "../App.css";
import logo from "../assets/unitylogo.png";

function landing() {
  return (
    <>
      <div className="landing-wrapper">
        <div className="login-logo-cont">
          <img src={logo} alt="" className="login-logo" />
        </div>
        <Login />
      </div>
    </>
  );
}
export default landing;
