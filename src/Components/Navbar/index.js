import navbarLogo from "../../assets/images/navBarLogo.svg";
import profile from "../../assets/images/profile.png";
import downArrow from "../../assets/images/downArrow.svg";

import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navBarDesign">
      <div className="navbarSection">
        <div className="navbarLogo">
          <img src={navbarLogo} alt="blogLogo" />
        </div>

        <div className="navBarProfile">
          <div>
            <img src={profile} alt="profilePic" />
          </div>

          <div className="profileName">
            <div>
              <p>Vignesh</p>
            </div>
            <div>
              <img src={downArrow} alt="arrowMark" />
            </div>
          </div>
        </div>
        <div className="proifleLogo">
          <p>V</p>
        </div>
      </div>
     
    </nav>
  );
};

export default NavBar;
