import ReactSwitch from "react-switch";
import Logo from "/static/images/logo.svg";
import "./navbar.css";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const Navbar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <header>
      <div className="container header__container">
        <div className="logo-container">
          <img src={Logo} alt="A book logo" />
        </div>
        <div className="right">
          <button
            className={`theme-btn ${
              theme === "light" ? "lightmode" : "darkmode"
            }`}
            onClick={toggleTheme}
          >
            {theme === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
