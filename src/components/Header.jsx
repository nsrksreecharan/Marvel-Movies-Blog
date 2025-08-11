import { useState, useEffect, useContext, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import { FaMoon, FaArrowRight } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { RiFilterFill } from "react-icons/ri";
import ThemeContext from "../context/ThemeContext";
import { toggleNav, toggleTheme } from "../redux/reducers/userReducers";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";

export const colors = ["yellow", "green", "red", "blue", "orange", "lightBlue"];
export const backgroundColorSelect = Math.floor(Math.random() * 5);

const Header = ({ showNav }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isProfile, setIsProfile] = useState(false);
  const [url, setUrl] = useState(null);
  const [logout, setLogout] = useState(false);
  const [username, setUsername] = useState("");
  
  const user = useSelector((state)=>state.user);
  const dark=useMemo(()=> user?.theme==="dark",[user]);
  const nav=useMemo(()=>user?.nav,[user]);
  // const { changeNavView, nav } = useContext(ThemeContext);

  const changeTheme=(e)=>{
    dispatch(toggleTheme({theme: dark ? "light" : "dark"}));
  }

  const changeNavView=(e)=>{
    dispatch(toggleNav(!nav))
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      localStorage.removeItem("user");
      <Navigate to="/login" replace />
      return;
    };

    const usernameExtracted = user.name;
    const profileUrl = user?.profileImage;
    setUrl(profileUrl);
    setUsername(usernameExtracted);
    setIsProfile(user?.isProfilePic);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("user");
    setLogout(true);
  };

  

  return (
    <div className={`Header ${dark ? "blackBackgroundHeader" : "whiteBackgroundHeader"}`}>
      {logout && navigate("/login", { replace: true })}
      
      <div className="ProfileContainer">
        <div className="ProfileBoxHeader">
          <Popup
            modal
            trigger={
              isProfile ? (
                <img src={url} alt="profilePicture" className="HeaderProfilePicture" />
              ) : (
                <div className={`${colors[backgroundColorSelect]} NameProfile`}>
                  <p className="userLetter">{username !== "" ? username[0].toUpperCase() : ""}</p>
                </div>
              )
            }
          >
            {(close) => (
              <Profile 
                close={close}
                logoutUser={logoutUser}
                url={url}
                dark={dark}
              />
            )}
          </Popup>
        </div>
      </div>

      <div className="LogoContainer">
        <img
          src="https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503521/1672503298367_zl4lus.png"
          alt="logo"
          className="WebsiteLogo"
        />
      </div>

      <div className="NavigationLinks">
        <div className="navItem">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Home</p>
          </Link>
        </div>
        <div className="navItem">
          <Link to="/movies" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Movies</p>
          </Link>
        </div>

        
        <div className="navItem">
          <Link to="/stats" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Stats</p>
          </Link>
        </div>

        <div className="navItem">
          <button type="button" onClick={changeTheme} className="navButton">
            {dark ? <BsFillSunFill className="sun" /> : <FaMoon className="moon" />}
          </button>
        </div>

        {showNav && (
          <div className="navItem">
            <button type="button" onClick={changeNavView} className="navButton">
              {nav ? <FaArrowRight /> : <RiFilterFill />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
