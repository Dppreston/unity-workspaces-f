import { useState, useEffect, useRef } from "react";
import axios from "axios";

function login() {
  //states
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [compName, setCompName] = useState("");
  const [compPhone, setCompPhone] = useState("");
  const [compType, setCompType] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [res, setRes] = useState("");

  //refs
  const signupTab = useRef(null);
  const loginTab = useRef(null);
  const loginForm = useRef(null);
  const signupForm = useRef(null);
  const signupP1 = useRef(null);
  const signupP2 = useRef(null);
  const signupP3 = useRef(null);
  const signupNext = useRef(null);
  const signupBtn = useRef(null);

  const loginFormNav = (e) => {
    if (e.currentTarget && loginForm.current?.classList.contains("hidden")) {
      loginForm.current?.classList.remove("hidden");
      signupForm.current?.classList.add("hidden");
      e.currentTarget.classList.remove("left-tab");
      signupTab.current?.classList.add("right-tab");
    }
  };
  const signupFormNav = (e) => {
    if (e.currentTarget && signupForm.current?.classList.contains("hidden")) {
      loginForm.current?.classList.add("hidden");
      signupForm.current?.classList.remove("hidden");
      e.currentTarget.classList.remove("right-tab");
      loginTab.current?.classList.add("left-tab");
    }
  };

  const loginCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location = "/dashboard";
    } else {
      return;
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/users/?loginUsername=${userName}&loginPassword=${password}`
      );
      let token = res.data[0]._id;
      setRes(<p className="error login-res-position"> {res.data}</p>);
      setTimeout(() => {
        setRes("");
      }, 1500);

      if (token) {
        localStorage.setItem("token", token);
        window.location = "/dashboard";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async () => {
    const postUser = {
      userName: userName,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      compName: compName,
      compPhone: compPhone,
      compType: compType,
    };

    try {
      const res = await axios.post("http://localhost:9000/users", postUser);
      setSignupSuccess(<p className="success">{res.data}</p>);
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginBtn = (e) => {
    if (e.currentTarget) {
      handleLogin();
    }
  };
  const handleSignupBtn = (e) => {
    if (e && compName != "" && compPhone != "" && compType != "") {
      handleSignup();
    }
  };

  const handleSignupNext = (e) => {
    if (
      signupP2.current.classList.contains("hidden") &&
      firstName != "" &&
      lastName != "" &&
      birthday != ""
    ) {
      signupP1.current.classList.toggle("hidden");
      signupP2.current.classList.toggle("hidden");
    } else if (
      e &&
      signupP3.current.classList.contains("hidden") &&
      userName != "" &&
      email != "" &&
      password != ""
    ) {
      signupP2.current.classList.toggle("hidden");
      signupP3.current.classList.toggle("hidden");
      signupNext.current.classList.add("hidden");
      signupBtn.current.classList.remove("hidden");
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <>
      <div className="login-signup-container">
        <div className="login-signup-tab-container">
          <button
            className="login-tab tab-style "
            ref={loginTab}
            onClick={loginFormNav}
          >
            Login
          </button>
          <button
            className="signup-tab tab-style right-tab"
            onClick={signupFormNav}
            ref={signupTab}
          >
            Signup
          </button>
        </div>
        <div className="login cont-style" ref={loginForm}>
          {res}
          <label htmlFor="userName" className="label-cont">
            Username
            <input
              className="login-input-style"
              type="text"
              required
              onChange={(e) => {
                setuserName(e.currentTarget.value);
              }}
            ></input>
          </label>
          <label htmlFor="password" className="label-cont">
            Password
            <input
              className="login-input-style"
              type="password"
              required
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            ></input>
          </label>
          <button className="login-btn" onClick={handleLoginBtn}>
            Login
          </button>
        </div>
        <div className="signup cont-style hidden" ref={signupForm}>
          <form className="signup-page-style " id="signup-p-1 " ref={signupP1}>
            <label htmlFor="first-name" className="label-cont">
              First Name
              <input
                className="login-input-style"
                type="text"
                required
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                }}
              ></input>
            </label>
            <label htmlFor="last-name" className="label-cont">
              Last Name
              <input
                className="login-input-style"
                type="text"
                required
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                }}
              ></input>
            </label>
            <label htmlFor="first-name" className="label-cont">
              Birthday
              <input
                className="login-input-style"
                type="date"
                required
                onChange={(e) => {
                  setBirthday(e.currentTarget.value);
                }}
              ></input>
            </label>
          </form>
          <div
            className="signup-page-style hidden"
            id="signup-p-2"
            ref={signupP2}
          >
            <label htmlFor="email" className="label-cont">
              Email
              <input
                className="login-input-style"
                type="email"
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              ></input>
            </label>
            <label htmlFor="name" className="label-cont">
              Username
              <input
                className="login-input-style"
                type="text"
                required
                onChange={(e) => {
                  setuserName(e.currentTarget.value);
                }}
              ></input>
            </label>
            <label htmlFor="password" className="label-cont">
              Password
              <input
                className="login-input-style"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              ></input>
            </label>
          </div>

          <div
            className="signup-page-style hidden"
            id="signup-p-3"
            ref={signupP3}
          >
            <label htmlFor="company-name" className="label-cont">
              Company Name
              <input
                type="text"
                className="login-input-style"
                required
                onChange={(e) => {
                  setCompName(e.currentTarget.value);
                }}
              ></input>
            </label>
            <label htmlFor="company-phone" className="label-cont">
              Company Phone
              <input
                type="tel"
                className="login-input-style"
                required
                onChange={(e) => {
                  setCompPhone(e.currentTarget.value);
                }}
              ></input>
            </label>
            <label htmlFor="company-type" className="label-cont">
              Company Type
              <input
                type="text"
                className="login-input-style"
                required
                onChange={(e) => {
                  setCompType(e.currentTarget.value);
                }}
              ></input>
            </label>
          </div>

          <div className="singup-btn-cont">
            <button
              className="next login-btn"
              onClick={handleSignupNext}
              ref={signupNext}
            >
              Next
            </button>
            <button
              className="login-btn hidden"
              ref={signupBtn}
              onClick={handleSignupBtn}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      {signupSuccess}
    </>
  );
}
export default login;
