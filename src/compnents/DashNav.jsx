import logo from "../assets/unitylogo.png";
import NavigationButtons from "./NavigationButtons";
import UserButtons from "./UserButtons";
import { useRef } from "react";

const navMenuContent = [
  {
    id: 1,
    title: "home",
    icon: `fa-solid fa-house`,
  },
  {
    id: 2,
    title: "notes",
    icon: `fa-solid fa-pencil`,
  },
  {
    id: 3,
    title: "appointments",
    icon: "fa-solid fa-calendar-check",
  },
  {
    id: 4,
    title: "customers",
    icon: `fa-solid fa-person`,
  },
  {
    id: 5,
    title: "profile",
    icon: `fa-solid fa-user`,
  },
  {
    id: 6,
    title: "settings",
    icon: `fa-solid fa-gear`,
  },
  {
    id: 7,
    title: "logout",
    icon: "fa-solid fa-arrow-right-from-bracket",
  },
];

function DashNav({ childTitle }) {
  const mobileMenuRef = useRef(null);

  const handleMobileMenu = (e) => {
    e.preventDefault();
    if (e.currentTarget) {
      mobileMenuRef.current.classList.toggle("hidden");
    }
  };

  const handleMenuSubSelection = (e) => {
    e.preventDefault();
    mobileMenuRef.current.classList.add("hidden");
  };
  return (
    <>
      <div className="dashnav-cont">
        <div className="nav-logo-cont">
          <img src={logo} alt="" className="nav-logo" />
          <p className="logo-content">Work Together</p>
        </div>
        <i
          className="fa-solid fa-bars"
          id="mobile-menu-btn"
          onClick={handleMobileMenu}
        ></i>

        <div className="dashnav">
          <NavigationButtons
            navMenuContent={navMenuContent}
            childTitle={childTitle}
          />
        </div>
      </div>
      <div className="mobile-menu hidden" ref={mobileMenuRef}>
        <NavigationButtons
          navMenuContent={navMenuContent}
          childTitle={childTitle}
          handleMenuSubSelection={handleMenuSubSelection}
        />
      </div>
    </>
  );
}
export default DashNav;
