import {useState, useContext, useEffect, useMemo} from "react";
import {MagnifyingGlass, ThreeDots} from "react-loader-spinner";
import {BsFillPersonFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import { useLazyGetProfileImageQuery, useLoginMutation } from "../redux/apis/authApi";
import { BASE_URL } from "../redux/apiSlice";
import { useSelector } from "react-redux";
import { addUser } from "../redux/reducers/userReducers";

const colors = ["yellow", "green", "red", "blue", "orange", "lightBlue"];
const backgroundColorSelect = Math.floor(Math.random() * 5);

const Login = () => {
  const navigate=useNavigate();
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [backgroundColor] = useState(colors[backgroundColorSelect]);
  const [noProfileImage, setNoProfileImage] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fullSuccess, setFullSuccess] = useState(false);
  const [logged, setLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Username and Password Required");

  const [loginUser]=useLoginMutation();
  const [getProfileImage]=useLazyGetProfileImageQuery();

  
  const user = useSelector((state)=>state.user);
  const dark=useMemo(()=> user?.theme==="dark",[user]);

  const getData = async () => {
    setIsLoadingLogin(true);
    const userDetails = {username, password};
    
    const response = await loginUser(userDetails);
    
    if (!response.error) {
      setIsLoading(true);
      setIsLoadingLogin(false);
      setLogged(true);
      const data = response.data;
      const accessToken = data.accessToken;
      const profileImage=await getProfileImage(data?.user?.id);
      const profileUrl=profileImage?.data;

      if(profileUrl){
        setUrl(profileUrl);
        setSuccess(true);
      }else{
        setNoProfileImage(true);
        setSuccess(true);
      }
      const user={
        ...response.data.user,
        profileImage:profileUrl,
        accessToken:accessToken,
        isProfilePic:Boolean(profileUrl),
        theme:"dark"
      }
      addUser(user);
      localStorage.setItem("user",JSON.stringify(user));
      setTimeout(() => setFullSuccess(true), 2000);
    } else {
      const errorData = response?.error?.data?.message || "Something went wrong";
      setIsError(true);
      setErrorMsg(errorData);
      setIsLoading(false);
      setIsLoadingLogin(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    if(username === "" || password === ""){
      setIsError(true);
    }else{
      setIsError(false);
      setIsLoading(true);
      getData();
    }
  };


  if (fullSuccess) {
     navigate("/", { replace: true });
     return;
  }

  return (
    <div className={`${dark ? "blackBackground" : "whiteBackground"} LoginPage`}>
      <div className={`${dark ? "blackLogin" : "whiteLogin"} LoginPageBox`}>
        <div className="imageLogoContainer">
          <img
            src={
              dark
                ? "https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503510/1672503437356_lmbm5i.png"
                : "https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503516/1672503379370_hr9p4z.png"
            }
            alt="logo"
            className="LoginLogo"
          />
        </div>
        <form
          onSubmit={submitForm}
          className="RegisterForm"
          autocomplete="off"
        >
          <div className="FormItemsContainer">
            {url === "" ? (
              <div className="ProfilePictureContainerLogin">
                <div
                  className={`${dark ? "blackProfile" : "whiteProfile"} ${
                    username !== "" ? `${backgroundColor} NoProfileBox` : "NormalProfile"
                  }`}
                >
                  {!isLoading ? (
                    username !== "" ? (
                      <h1 className="white">{username[0].toUpperCase()}</h1>
                    ) : (
                      <BsFillPersonFill className="Face" />
                    )
                  ) : (
                    <MagnifyingGlass
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="MagnifyingGlass-loading"
                      wrapperStyle={{}}
                      wrapperClass="MagnifyingGlass-wrapper"
                      glassColor="#c0efff"
                      color="#008cff"
                    />
                  )}
                </div>
                {noProfileImage && <p>No Profile Picture!</p>}
              </div>
            ) : (
              <img src={url} alt="userProfileImage" className="profilePictureLogin" />
            )}

            <div className="InputBoxesContainer">
              <div className="inputBox">
                <label htmlFor="username" className={`${dark ? "white" : ""} label`}>
                  Username
                </label>
                <input
                  id="username"
                  autoComplete="off"
                  className={`${dark ? "darkInput" : ""} input`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                />
              </div>
              <div className="inputBox">
                <label htmlFor="password" className={`${dark ? "white" : ""} label`}>
                  Password
                </label>
                <div className={`${dark ? "darkInput" : ""} input InputBox`}>
                  <input
                    autoComplete="off"
                    value={password}
                    id="password"
                    className={`${dark ? "darkInput" : ""} Input`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {password.length !== 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="Eye"
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="loginButton">
            {isLoadingLogin ? (
              <ThreeDots
                height="50"
                width="50"
                radius="3"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="DotLoader"
              />
            ) : (
              "Login"
            )}
          </button>
          {isError && <p className="error">*{errorMsg}</p>}
          <div className="RegisterLinkBox">
            <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
              <p className="RegisterPageLink">New to here Register Now!</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
